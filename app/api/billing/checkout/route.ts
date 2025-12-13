import { createServerClient } from '@/services/supabase/server';
import { PRICING_TIERS } from '@/services/stripe/pricing';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// POST /api/billing/checkout - Create a checkout session for credit purchase
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { tierId } = body;

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
                { error: 'You must be logged in to purchase credits' },
                { status: 401 }
            );
        }

        const tier = PRICING_TIERS.find((t) => t.id === tierId);

        if (!tier?.stripePriceId) {
            return NextResponse.json(
                { error: 'Invalid pricing tier' },
                { status: 400 }
            );
        }

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

        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
