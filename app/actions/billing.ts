'use server';

import { createServerClient } from '@/services/supabase/server';
import { getCurrentUser } from './auth';
import { addCredits } from './credits';
import type { FormState } from '@/types';
import Stripe from 'stripe';
import { PRICING_TIERS } from '@/services/stripe/pricing';

// ============================================
// STRIPE CLIENT
// ============================================

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// ============================================
// TYPES
// ============================================

// Re-export types for convenience
export type { PricingTier } from '@/services/stripe/pricing';

export interface Subscription {
    id: string;
    status: string;
    plan: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

// ============================================
// CREATE CHECKOUT SESSION
// ============================================


export async function createCheckoutSession(
    tierId: string
): Promise<{ url?: string; error?: string }> {
    const user = await getCurrentUser();

    if (!user) {
        return { error: 'You must be logged in to purchase credits.' };
    }

    if (!stripe) {
        console.error('Stripe not configured');
        return { error: 'Payment service unavailable. Please try again later.' };
    }

    const tier = PRICING_TIERS.find((t) => t.id === tierId);

    if (!tier?.stripePriceId) {
        return { error: 'Invalid pricing tier.' };
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: tier.stripePriceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?payment=cancelled`,
            client_reference_id: user.id,
            metadata: {
                user_id: user.id,
                tier_id: tier.id,
                credits: tier.credits.toString(),
            },
            customer_email: user.email,
        });

        return { url: session.url || undefined };
    } catch (error) {
        console.error('Checkout session error:', error);
        return { error: 'Failed to create checkout session. Please try again.' };
    }
}

// ============================================
// CREATE SUBSCRIPTION CHECKOUT
// ============================================

export async function createSubscriptionCheckout(
    planId: string
): Promise<{ url?: string; error?: string }> {
    const user = await getCurrentUser();

    if (!user) {
        return { error: 'You must be logged in to subscribe.' };
    }

    if (!stripe) {
        return { error: 'Payment service unavailable.' };
    }

    const priceId = process.env[`STRIPE_SUBSCRIPTION_${planId.toUpperCase()}`];

    if (!priceId) {
        return { error: 'Invalid subscription plan.' };
    }

    try {
        // Check if user already has a Stripe customer ID
        const supabase = createServerClient();
        let customerId: string | undefined;

        if (supabase) {
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('metadata')
                .eq('id', user.id)
                .single();

            customerId = (profile?.metadata as { stripe_customer_id?: string })?.stripe_customer_id;
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?subscription=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?subscription=cancelled`,
            client_reference_id: user.id,
            customer: customerId,
            customer_email: customerId ? undefined : user.email,
            metadata: {
                user_id: user.id,
                plan_id: planId,
            },
        });

        return { url: session.url || undefined };
    } catch (error) {
        console.error('Subscription checkout error:', error);
        return { error: 'Failed to create subscription checkout.' };
    }
}

// ============================================
// GET USER SUBSCRIPTION
// ============================================

export async function getSubscription(): Promise<Subscription | null> {
    const user = await getCurrentUser();
    const supabase = createServerClient();

    if (!user || !supabase) {
        return null;
    }

    const { data: profile } = await supabase
        .from('user_profiles')
        .select('plan, metadata')
        .eq('id', user.id)
        .single();

    if (!profile) {
        return null;
    }

    const metadata = profile.metadata as {
        stripe_subscription_id?: string;
        subscription_status?: string;
        current_period_end?: string;
        cancel_at_period_end?: boolean;
    } | null;

    if (!metadata?.stripe_subscription_id) {
        return null;
    }

    return {
        id: metadata.stripe_subscription_id,
        status: metadata.subscription_status || 'active',
        plan: profile.plan,
        currentPeriodEnd: metadata.current_period_end || '',
        cancelAtPeriodEnd: metadata.cancel_at_period_end || false,
    };
}

// ============================================
// CANCEL SUBSCRIPTION
// ============================================

export async function cancelSubscription(): Promise<FormState> {
    const user = await getCurrentUser();
    const supabase = createServerClient();

    if (!user || !supabase || !stripe) {
        return {
            message: 'Service unavailable.',
            success: false,
        };
    }

    const { data: profile } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('id', user.id)
        .single();

    const subscriptionId = (profile?.metadata as { stripe_subscription_id?: string })?.stripe_subscription_id;

    if (!subscriptionId) {
        return {
            message: 'No active subscription found.',
            success: false,
        };
    }

    try {
        await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        });

        // Update profile metadata
        await supabase
            .from('user_profiles')
            .update({
                metadata: {
                    ...(profile?.metadata as object),
                    cancel_at_period_end: true,
                },
            })
            .eq('id', user.id);

        return {
            message: 'Subscription will be cancelled at the end of the billing period.',
            success: true,
        };
    } catch (error) {
        console.error('Cancel subscription error:', error);
        return {
            message: 'Failed to cancel subscription.',
            success: false,
        };
    }
}

// ============================================
// CREATE CUSTOMER PORTAL SESSION
// ============================================

export async function createCustomerPortalSession(): Promise<{ url?: string; error?: string }> {
    const user = await getCurrentUser();
    const supabase = createServerClient();

    if (!user || !supabase || !stripe) {
        return { error: 'Service unavailable.' };
    }

    const { data: profile } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('id', user.id)
        .single();

    const customerId = (profile?.metadata as { stripe_customer_id?: string })?.stripe_customer_id;

    if (!customerId) {
        return { error: 'No billing account found.' };
    }

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
        });

        return { url: session.url };
    } catch (error) {
        console.error('Customer portal error:', error);
        return { error: 'Failed to open billing portal.' };
    }
}

// ============================================
// WEBHOOK HANDLER HELPERS
// ============================================

type SupabaseClient = NonNullable<ReturnType<typeof createServerClient>>;

async function handleCheckoutCompleted(
    session: Stripe.Checkout.Session,
    supabase: SupabaseClient
): Promise<{ success: boolean; message?: string }> {
    const userId = session.metadata?.user_id || session.client_reference_id;

    if (!userId) {
        return { success: false, message: 'No user ID found' };
    }

    if (session.mode === 'payment') {
        const credits = Number.parseInt(session.metadata?.credits || '0', 10);
        if (credits > 0) {
            await addCredits(userId, credits, `Purchase: ${session.metadata?.tier_id}`);
        }
    }

    if (session.mode === 'subscription') {
        await supabase
            .from('user_profiles')
            .update({
                plan: session.metadata?.plan_id || 'pro',
                metadata: {
                    stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id ?? '',
                    stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id ?? '',
                    subscription_status: 'active',
                },
            })
            .eq('id', userId);
    }

    return { success: true };
}

async function handleSubscriptionUpdated(
    subscription: Stripe.Subscription,
    supabase: SupabaseClient
): Promise<{ success: boolean }> {
    const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id ?? '';

    const { data: profiles } = await supabase
        .from('user_profiles')
        .select('id, metadata')
        .contains('metadata', { stripe_customer_id: customerId });

    if (profiles && profiles.length > 0) {
        const profile = profiles[0];
        const periodEnd = subscription.items?.data?.[0]?.current_period_end;

        await supabase
            .from('user_profiles')
            .update({
                metadata: {
                    ...(profile.metadata as object),
                    subscription_status: subscription.status,
                    current_period_end: periodEnd
                        ? new Date(periodEnd * 1000).toISOString()
                        : new Date().toISOString(),
                    cancel_at_period_end: subscription.cancel_at_period_end,
                },
            })
            .eq('id', profile.id);
    }

    return { success: true };
}

async function handleSubscriptionDeleted(
    subscription: Stripe.Subscription,
    supabase: SupabaseClient
): Promise<{ success: boolean }> {
    const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id ?? '';

    const { data: profiles } = await supabase
        .from('user_profiles')
        .select('id')
        .contains('metadata', { stripe_customer_id: customerId });

    if (profiles && profiles.length > 0) {
        await supabase
            .from('user_profiles')
            .update({
                plan: 'starter',
                metadata: {
                    stripe_customer_id: customerId,
                    subscription_status: 'cancelled',
                },
            })
            .eq('id', profiles[0].id);
    }

    return { success: true };
}

async function handlePaymentFailed(
    invoice: Stripe.Invoice,
    supabase: SupabaseClient
): Promise<{ success: boolean }> {
    const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id ?? '';

    const { data: profiles } = await supabase
        .from('user_profiles')
        .select('id, metadata')
        .contains('metadata', { stripe_customer_id: customerId });

    if (profiles && profiles.length > 0) {
        const profile = profiles[0];

        await supabase
            .from('user_profiles')
            .update({
                metadata: {
                    ...(profile.metadata as object),
                    subscription_status: 'past_due',
                },
            })
            .eq('id', profile.id);
    }

    return { success: true };
}

// ============================================
// HANDLE STRIPE WEBHOOK (Called from API route)
// ============================================

export async function handleStripeWebhook(
    event: Stripe.Event
): Promise<{ success: boolean; message?: string }> {
    const supabase = createServerClient();

    if (!supabase) {
        return { success: false, message: 'Database unavailable' };
    }

    switch (event.type) {
        case 'checkout.session.completed':
            return handleCheckoutCompleted(event.data.object, supabase);

        case 'customer.subscription.updated':
            return handleSubscriptionUpdated(event.data.object, supabase);

        case 'customer.subscription.deleted':
            return handleSubscriptionDeleted(event.data.object, supabase);

        case 'invoice.payment_failed':
            return handlePaymentFailed(event.data.object, supabase);

        default:
            return { success: true, message: `Unhandled event type: ${event.type}` };
    }
}

