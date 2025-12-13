import { PRICING_TIERS } from '@/services/stripe/pricing';
import { NextResponse } from 'next/server';

// GET /api/billing/pricing - Get pricing tiers (public)
export async function GET() {
    // Return pricing info without sensitive data (stripePriceId)
    const tiers = PRICING_TIERS.map((tier) => ({
        id: tier.id,
        name: tier.name,
        credits: tier.credits,
        price: tier.price,
        popular: tier.popular || false,
    }));

    return NextResponse.json({ tiers });
}
