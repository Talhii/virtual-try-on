import { createServerClient } from '@/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// POST /api/billing/subscription - Create a subscription checkout
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { planId } = body;

        if (!stripe) {
            return NextResponse.json(
                { error: 'Payment service unavailable' },
                { status: 503 }
            );
        }

        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 503 }
            );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'You must be logged in to subscribe' },
                { status: 401 }
            );
        }

        const priceId = process.env[`STRIPE_SUBSCRIPTION_${planId.toUpperCase()}`];

        if (!priceId) {
            return NextResponse.json(
                { error: 'Invalid subscription plan' },
                { status: 400 }
            );
        }

        // Check if user already has a Stripe customer ID
        const { data: profile } = await supabase
            .from('user_profiles')
            .select('metadata')
            .eq('id', user.id)
            .single();

        const customerId = (profile?.metadata as { stripe_customer_id?: string })?.stripe_customer_id;

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

        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('Subscription checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create subscription checkout' },
            { status: 500 }
        );
    }
}

// GET /api/billing/subscription - Get current subscription
export async function GET() {
    try {
        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 503 }
            );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { data: profile } = await supabase
            .from('user_profiles')
            .select('plan, metadata')
            .eq('id', user.id)
            .single();

        if (!profile) {
            return NextResponse.json({ subscription: null });
        }

        const metadata = profile.metadata as {
            stripe_subscription_id?: string;
            subscription_status?: string;
            current_period_end?: string;
            cancel_at_period_end?: boolean;
        } | null;

        if (!metadata?.stripe_subscription_id) {
            return NextResponse.json({ subscription: null });
        }

        return NextResponse.json({
            subscription: {
                id: metadata.stripe_subscription_id,
                status: metadata.subscription_status || 'active',
                plan: profile.plan,
                currentPeriodEnd: metadata.current_period_end || '',
                cancelAtPeriodEnd: metadata.cancel_at_period_end || false,
            },
        });
    } catch (error) {
        console.error('Get subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/billing/subscription - Cancel subscription
export async function DELETE() {
    try {
        if (!stripe) {
            return NextResponse.json(
                { error: 'Payment service unavailable' },
                { status: 503 }
            );
        }

        const supabase = createServerClient();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Service unavailable' },
                { status: 503 }
            );
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { data: profile } = await supabase
            .from('user_profiles')
            .select('metadata')
            .eq('id', user.id)
            .single();

        const subscriptionId = (profile?.metadata as { stripe_subscription_id?: string })?.stripe_subscription_id;

        if (!subscriptionId) {
            return NextResponse.json(
                { error: 'No active subscription found' },
                { status: 404 }
            );
        }

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

        return NextResponse.json({
            success: true,
            message: 'Subscription will be cancelled at the end of the billing period',
        });
    } catch (error) {
        console.error('Cancel subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to cancel subscription' },
            { status: 500 }
        );
    }
}
