/**
 * Services - Barrel Export
 * 
 * This module provides access to all external service integrations:
 * - API: Frontend API client for backend endpoints
 * - AI: Replicate AI integration for try-on generation
 * - Supabase: Database and auth client
 * - Stripe: Pricing configuration
 */

// API Services (for frontend use)
export * from './api';

// AI Services (for server use)
export * from './ai';

// Supabase Services (for server use)
export * from './supabase';

// Stripe Configuration (explicit exports to avoid conflicts with API billing types)
export { PRICING_TIERS, getPricingTier } from './stripe/pricing';
