// Site configuration
export const siteConfig = {
    name: 'VTO Studio',
    description: 'AI-powered virtual try-on technology for modern fashion brands',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vtostudio.com',
    ogImage: '/og-image.png',
    links: {
        twitter: 'https://twitter.com/vtostudio',
        github: 'https://github.com/vtostudio',
        instagram: 'https://instagram.com/vtostudio',
        linkedin: 'https://linkedin.com/company/vtostudio',
    },
    contact: {
        email: 'hello@vtostudio.com',
        support: 'support@vtostudio.com',
    },
};

// Navigation configuration
export const navConfig = {
    mainNav: [
        { name: 'Features', href: '#features' },
        { name: 'How it Works', href: '#how-it-works' },
        { name: 'Showcase', href: '#showcase' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'FAQ', href: '#faq' },
    ],
    footerNav: {
        Product: [
            { name: 'Features', href: '#features' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'API', href: '/api-docs' },
            { name: 'Integrations', href: '/integrations' },
            { name: 'Changelog', href: '/changelog' },
        ],
        Company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Press', href: '/press' },
            { name: 'Contact', href: '#contact' },
        ],
        Resources: [
            { name: 'Documentation', href: '/docs' },
            { name: 'Tutorials', href: '/tutorials' },
            { name: 'Examples', href: '#showcase' },
            { name: 'FAQ', href: '#faq' },
            { name: 'Support', href: '/support' },
        ],
        Legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'GDPR', href: '/gdpr' },
        ],
    },
};

// Feature flags and settings
export const featureFlags = {
    enableAuth: true, // Authentication is now implemented
    enableRealTryOn: Boolean(process.env.GEMINI_API_KEY), // Auto-enable if Gemini API key present
    enableAnalytics: true,
    maintenanceMode: false,
    enableBilling: Boolean(process.env.STRIPE_SECRET_KEY), // Auto-enable if Stripe configured
};

// API configuration
export const apiConfig = {
    tryOnApiUrl: process.env.NEXT_PUBLIC_TRYON_API_URL || '',
    uploadMaxSize: 20 * 1024 * 1024, // 20MB
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    maxCreditsPerRequest: 1,
};
