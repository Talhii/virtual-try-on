/**
 * Application route constants
 * Centralized route definitions for type-safe navigation
 */

export const ROUTES = {
    // Public routes
    HOME: '/',
    DASHBOARD: '/dashboard',
    IMAGE_TO_VIDEO: '/image-to-video',
    EXPLORE: '/explore',
    PRICING: '/pricing',

    // Auth routes
    LOGIN: '/login',
    SIGNUP: '/signup',
    CALLBACK: '/callback',

    // Protected routes
    HISTORY: '/history',

    // API routes
    API: {
        WEBHOOKS: {
            STRIPE: '/api/webhooks/stripe',
        },
    },

    // Hash links (for single-page navigation)
    HASH: {
        FEATURES: '#features',
        HOW_IT_WORKS: '#how-it-works',
        SHOWCASE: '#showcase',
        PRICING: '#pricing',
        FAQ: '#faq',
        CONTACT: '#contact',
    },
} as const;

/**
 * External links
 */
export const EXTERNAL_LINKS = {
    DOCS: '/docs',
    API_DOCS: '/api-docs',
    TUTORIALS: '/tutorials',
    CHANGELOG: '/changelog',
    SUPPORT: '/support',
    ABOUT: '/about',
    BLOG: '/blog',
    CAREERS: '/careers',
    PRESS: '/press',
    INTEGRATIONS: '/integrations',

    // Legal
    PRIVACY: '/privacy',
    TERMS: '/terms',
    COOKIES: '/cookies',
    GDPR: '/gdpr',
} as const;

/**
 * Type-safe route helper
 */
export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
export type HashRoute = (typeof ROUTES.HASH)[keyof typeof ROUTES.HASH];
