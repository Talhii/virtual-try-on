'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Zap, Building2, ArrowRight } from 'lucide-react';

const PLANS = [
    {
        name: 'Free',
        description: 'Perfect for trying out VTO Studio',
        price: { monthly: 0, yearly: 0 },
        credits: '10 free try-ons',
        icon: Sparkles,
        color: 'bg-gray-500',
        features: [
            '10 Try-On Credits',
            'Standard Resolution',
            'Basic Support',
            'Personal Use Only',
        ],
        cta: 'Start Free',
        popular: false,
    },
    {
        name: 'Pro',
        description: 'For creators and small businesses',
        price: { monthly: 29, yearly: 24 },
        credits: '200 credits/month',
        icon: Zap,
        color: 'bg-blue-500',
        features: [
            '200 Try-On Credits',
            'High Resolution (4K)',
            'Priority Processing',
            'Commercial License',
            'No Watermarks',
            'Email Support',
        ],
        cta: 'Get Pro',
        popular: true,
    },
    {
        name: 'Business',
        description: 'For teams and growing brands',
        price: { monthly: 99, yearly: 79 },
        credits: '1,000 credits/month',
        icon: Building2,
        color: 'bg-purple-500',
        features: [
            '1,000 Try-On Credits',
            'Ultra HD Resolution',
            'API Access',
            'Batch Processing',
            'Team Collaboration',
            'Priority Support',
            'Analytics Dashboard',
        ],
        cta: 'Get Business',
        popular: false,
    },
];

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(true);

    return (
        <section id="pricing" className="py-12 bg-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
                    </p>

                    {/* Animated Billing Toggle */}
                    <div className="inline-flex items-center p-1 bg-gray-100 rounded-full relative">
                        <motion.div
                            className="absolute inset-y-1 rounded-full bg-white shadow-sm"
                            initial={false}
                            animate={{
                                left: isYearly ? '50%' : '4px',
                                right: isYearly ? '4px' : '50%',
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors relative z-10 ${isYearly ? 'text-gray-500 hover:text-gray-700' : 'text-gray-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 relative z-10 ${isYearly ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Yearly{' '}
                            <motion.span
                                className="text-xs py-0.5 bg-green-100 text-green-700 rounded-full font-semibold"
                                animate={{ scale: isYearly ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                -20%
                            </motion.span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            {plan.popular && (
                                <motion.div
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold z-10"
                                    animate={{
                                        boxShadow: [
                                            '0 0 10px rgba(59, 130, 246, 0.3)',
                                            '0 0 20px rgba(59, 130, 246, 0.5)',
                                            '0 0 10px rgba(59, 130, 246, 0.3)',
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Most Popular
                                </motion.div>
                            )}

                            <motion.div
                                className={`bg-white rounded-2xl p-6 h-full flex flex-col border-2 transition-colors ${plan.popular
                                    ? 'border-blue-500 shadow-xl shadow-blue-500/10'
                                    : 'border-gray-200'
                                    }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow: plan.popular
                                        ? '0 25px 50px rgba(59, 130, 246, 0.2)'
                                        : '0 20px 40px rgba(0, 0, 0, 0.1)',
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Header */}
                                <motion.div
                                    className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center mb-4`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <plan.icon className="w-6 h-6 text-white" />
                                </motion.div>

                                <h3 className="text-xl font-semibold mb-1 text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

                                {/* Animated Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={isYearly ? 'yearly' : 'monthly'}
                                                className="text-4xl font-bold text-gray-900"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                ${isYearly ? plan.price.yearly : plan.price.monthly}
                                            </motion.span>
                                        </AnimatePresence>
                                        <span className="text-gray-500">/month</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{plan.credits}</p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <motion.li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + i * 0.05 }}
                                        >
                                            <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-blue-500' : 'text-gray-400'}`} />
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.button
                                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group ${plan.popular
                                        ? 'bg-blue-500 text-white'
                                        : 'border border-gray-300 text-gray-700'
                                        }`}
                                    whileHover={{
                                        scale: 1.02,
                                        backgroundColor: plan.popular ? '#2563eb' : '#f9fafb',
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {plan.cta}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Enterprise CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Need more?</p>
                            <p className="text-sm text-gray-600">Contact us for custom enterprise pricing</p>
                        </div>
                        <motion.a
                            href="#contact"
                            className="btn-secondary text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Sales
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
