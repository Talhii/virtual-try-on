import type { PricingPlan, FAQCategory, Testimonial } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: 'Starter',
        description: 'Perfect for trying out VTO Studio',
        price: { monthly: 0, yearly: 0 },
        credits: '10 free try-ons',
        features: [
            '10 Try-On Credits',
            'Standard Resolution (1080p)',
            'Basic Support',
            'Personal Use Only',
            'Watermarked Results',
        ],
        popular: false,
    },
    {
        name: 'Pro',
        description: 'For creators and small businesses',
        price: { monthly: 49, yearly: 39 },
        credits: '500 credits/month',
        features: [
            '500 Try-On Credits',
            'High Resolution (4K)',
            'Priority Processing',
            'Commercial License',
            'No Watermarks',
            'Advanced Editing Tools',
            'Email Support (24h)',
        ],
        popular: true,
    },
    {
        name: 'Business',
        description: 'For teams and growing brands',
        price: { monthly: 149, yearly: 119 },
        credits: '2,000 credits/month',
        features: [
            '2,000 Try-On Credits',
            'Ultra HD Resolution (8K)',
            'API Access',
            'Batch Processing',
            'Custom Branding',
            'Team Collaboration (5 seats)',
            'Priority Support',
            'Analytics Dashboard',
        ],
        popular: false,
    },
    {
        name: 'Enterprise',
        description: 'For large-scale operations',
        price: { monthly: null, yearly: null },
        credits: 'Unlimited',
        features: [
            'Unlimited Try-On Credits',
            'Dedicated Infrastructure',
            'Custom AI Model Training',
            'White-Label Solution',
            'Unlimited Team Seats',
            'SLA Guarantee (99.9%)',
            'Dedicated Account Manager',
            'On-Premise Deployment Option',
        ],
        popular: false,
    },
];

export const FAQ_DATA: FAQCategory[] = [
    {
        category: 'General',
        questions: [
            {
                question: 'What is VTO Studio?',
                answer:
                    'VTO Studio is an AI-powered virtual try-on platform that allows you to visualize how any clothing item looks on any person. Simply upload a photo of a person and a garment, and our AI will generate a photorealistic image of them wearing that outfit in under a second.',
            },
            {
                question: 'How accurate is the virtual try-on?',
                answer:
                    'Our AI achieves a 98% accuracy rate in fit, fabric drape, and lighting simulation. We use advanced physics engines combined with generative AI to ensure clothing behaves realistically on any body type.',
            },
            {
                question: 'Do I need professional photos?',
                answer:
                    "No! While higher quality inputs yield better results, our AI works great with standard smartphone photos. Just ensure good lighting, a clear view of the subject, and minimal occlusion.",
            },
        ],
    },
    {
        category: 'Technical',
        questions: [
            {
                question: 'Is there an API available?',
                answer:
                    'Yes! We offer a comprehensive REST API for Business and Enterprise customers who want to integrate VTO technology directly into their applications, websites, or workflows.',
            },
            {
                question: 'What file formats are supported?',
                answer:
                    'We support all major image formats including JPEG, PNG, WebP, and HEIC. For output, you can choose between JPEG, PNG, or WebP. Maximum input size is 20MB per image.',
            },
            {
                question: 'How long does processing take?',
                answer:
                    'Most try-ons complete in under 1 second. Complex images with intricate patterns or unusual poses may take up to 3 seconds. Batch processing via API typically processes 100 images per minute.',
            },
        ],
    },
    {
        category: 'Privacy & Security',
        questions: [
            {
                question: 'What happens to my uploaded photos?',
                answer:
                    'We take privacy seriously. Your photos are processed securely using end-to-end encryption and are automatically deleted from our servers within 24 hours unless you choose to save them. We are SOC 2 Type II certified and GDPR compliant.',
            },
            {
                question: 'Are my images used for AI training?',
                answer:
                    'No, absolutely not. Your uploaded images are never used to train our AI models. We have strict data policies that prohibit the use of customer data for model training.',
            },
        ],
    },
    {
        category: 'Billing',
        questions: [
            {
                question: 'Can I cancel my subscription anytime?',
                answer:
                    'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No cancellation fees apply.',
            },
            {
                question: 'What payment methods do you accept?',
                answer:
                    'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.',
            },
        ],
    },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        id: 1,
        user: {
            name: 'Sarah Jenkins',
            role: 'Creative Director @ LUXE Fashion',
            handle: '@sarahstyle',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
            verified: true,
        },
        content:
            'VTO Studio has completely transformed our e-commerce workflow. We cut our photoshoot budget by 80% and the AI-generated results are indistinguishable from real photography. Our returns dropped by 60% in the first quarter!',
        rating: 5,
        metric: { label: 'Return Rate Reduction', value: '60%' },
    },
    {
        id: 2,
        user: {
            name: 'Alex Chen',
            role: 'Founder @ StreetStyle Co',
            handle: '@alexc_design',
            image:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
            verified: true,
        },
        content:
            'Finally, a try-on tool that actually respects fabric physics! The drape and lighting matching is next level. My clients are loving the instant previews and our conversion rates have doubled.',
        rating: 5,
        metric: { label: 'Conversion Increase', value: '2x' },
    },
    {
        id: 3,
        user: {
            name: 'Emma Rodriguez',
            role: 'E-commerce Manager @ Vogue Retail',
            handle: '@emmar_retail',
            image:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
            verified: true,
        },
        content:
            'We integrated the VTO API into our Shopify store last month. The results have been phenomenal - customers spend 40% more time on product pages and our add-to-cart rate increased by 35%.',
        rating: 5,
        metric: { label: 'Time on Page', value: '+40%' },
    },
    {
        id: 4,
        user: {
            name: 'Marcus Thompson',
            role: 'CTO @ FashionTech Inc',
            handle: '@marcus_dev',
            image:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
            verified: false,
        },
        content:
            'The API documentation is excellent and integration took less than a day. The consistency is what sold me - same model, 50 different outfits, zero hallucinations. Production-ready from day one.',
        rating: 5,
        metric: { label: 'Integration Time', value: '<1 day' },
    },
    {
        id: 5,
        user: {
            name: 'Lisa Park',
            role: 'Product Lead @ ModernWear',
            handle: '@lisap_fashion',
            image:
                'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
            verified: true,
        },
        content:
            "We've tried every virtual try-on solution on the market. VTO Studio is in a completely different league - the speed, accuracy, and identity preservation are unmatched. Worth every penny.",
        rating: 5,
        metric: { label: 'Accuracy Rate', value: '98%' },
    },
    {
        id: 6,
        user: {
            name: 'David Kim',
            role: 'Head of Digital @ Seoul Style',
            handle: '@davidk_seoul',
            image:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
            verified: true,
        },
        content:
            'The batch processing feature is a game-changer for our catalog. We processed 500 products in under an hour. The ROI was positive within the first week of implementation.',
        rating: 5,
        metric: { label: 'Products Processed', value: '500/hr' },
    },
];
