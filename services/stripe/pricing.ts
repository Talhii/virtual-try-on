// Pricing tiers configuration for VTO Studio
// This is a shared constant that can be imported by both client and server

export interface PricingTier {
    id: string;
    name: string;
    credits: number;
    price: number;
    stripePriceId: string;
    popular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
    {
        id: 'starter',
        name: 'Starter',
        credits: 20,
        price: 9,
        stripePriceId: process.env.STRIPE_PRICE_STARTER || '',
    },
    {
        id: 'pro',
        name: 'Pro',
        credits: 100,
        price: 29,
        stripePriceId: process.env.STRIPE_PRICE_PRO || '',
        popular: true,
    },
    {
        id: 'business',
        name: 'Business',
        credits: 500,
        price: 99,
        stripePriceId: process.env.STRIPE_PRICE_BUSINESS || '',
    },
];

export function getPricingTier(tierId: string): PricingTier | undefined {
    return PRICING_TIERS.find((t) => t.id === tierId);
}
