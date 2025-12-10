// Re-export all server actions for convenient imports

// Authentication
export {
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
    updatePassword,
    getCurrentUser,
    getUserProfile,
    updateProfile,
} from './auth';

// Try-on generation
export {
    generateTryOn,
    getTryOnHistory,
    deleteTryOnResult,
} from './tryon';

// Lead capture
export { submitLead } from './leads';

// Credits management
export {
    getCredits,
    getCreditHistory,
    addCredits,
    consumeCredits,
    refundCredits,
    hasEnoughCredits,
} from './credits';

// Billing & payments
export {
    createCheckoutSession,
    createSubscriptionCheckout,
    getSubscription,
    cancelSubscription,
    createCustomerPortalSession,
} from './billing';

// Pricing configuration (non-server)
export { PRICING_TIERS, type PricingTier } from '@/services/stripe/pricing';

// Image uploads
export {
    uploadImage,
    uploadModelImage,
    uploadGarmentImage,
    deleteImage,
    getSignedUploadUrl,
    listUserUploads,
} from './upload';

// Products catalog
export {
    getProducts,
    getProduct,
    getCategories,
    searchProducts,
    getFeaturedProducts,
    getProductsByCategory,
} from './products';

// History management
export {
    getDetailedHistory,
    getHistoryItem,
    deleteHistoryItem,
    clearHistory,
    getHistoryStats,
    createShareableLink,
} from './history';

