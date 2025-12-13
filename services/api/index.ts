/**
 * API Services - Barrel Export
 * 
 * This module provides typed API clients for all backend endpoints.
 * Each service handles its own request/response types and error handling.
 */

// Base client utilities
export { ApiError } from './client';

// Domain-specific API services
export { authApi } from './auth';
export type { User, AuthSession, SignupResponse, LoginResponse, MeResponse } from './auth';

export { tryonApi } from './tryon';
export type { TryOnSettings, TryOnResult, GenerateRequest, GenerateResponse } from './tryon';

export { uploadApi } from './upload';
export type { ImageBucket, UploadResponse } from './upload';

export { creditsApi } from './credits';
export type { CreditBalance, CreditTransaction } from './credits';

export { billingApi } from './billing';
export type { PricingTier, Subscription, CheckoutResponse } from './billing';

export { productsApi } from './products';
export type { Product, ProductFilters } from './products';

export { leadsApi } from './leads';
export type { LeadSubmission, LeadResponse } from './leads';
