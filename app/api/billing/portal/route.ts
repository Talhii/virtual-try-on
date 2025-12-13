import { createServerClient } from '@/services/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// POST /api/billing/portal - Create a customer portal session
export async function POST() {
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

        const customerId = (profile?.metadata as { stripe_customer_id?: string })?.stripe_customer_id;

        if (!customerId) {
            return NextResponse.json(
                { error: 'No billing account found' },
                { status: 404 }
            );
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Portal error:', error);
        return NextResponse.json(
            { error: 'Failed to open billing portal' },
            { status: 500 }
        );
    }
}
