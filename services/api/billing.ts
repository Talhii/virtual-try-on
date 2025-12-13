/**
 * Billing API Service
 */

import { get, post, del } from './client';

// ============================================
// TYPES
// ============================================

export interface PricingTier {
    id: string;
    name: string;
    credits: number;
    price: number;
    popular: boolean;
}

export interface Subscription {
    id: string;
    status: string;
    plan: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

export interface CheckoutResponse {
    url: string;
    sessionId: string;
}

export interface SubscriptionResponse {
    subscription: Subscription | null;
}

export interface CancelResponse {
    success: boolean;
    message: string;
}

export interface PortalResponse {
    url: string;
}

export interface PricingResponse {
    tiers: PricingTier[];
}

// ============================================
// API METHODS
// ============================================

export const billingApi = {
    /**
     * Get available pricing tiers
     */
    getPricing: (): Promise<PricingResponse> =>
        get('/billing/pricing'),

    /**
     * Create a checkout session for one-time credit purchase
     */
    createCheckout: (tierId: string): Promise<CheckoutResponse> =>
        post('/billing/checkout', { tierId }),

    /**
     * Create a subscription checkout session
     */
    createSubscription: (planId: string): Promise<CheckoutResponse> =>
        post('/billing/subscription', { planId }),

    /**
     * Get the current user's subscription
     */
    getSubscription: (): Promise<SubscriptionResponse> =>
        get('/billing/subscription'),

    /**
     * Cancel the current subscription
     */
    cancelSubscription: (): Promise<CancelResponse> =>
        del('/billing/subscription'),

    /**
     * Open the Stripe customer billing portal
     */
    openPortal: (): Promise<PortalResponse> =>
        post('/billing/portal'),
};
