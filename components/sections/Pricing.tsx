'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Building2, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    description: 'Perfect for trying out VTO Studio',
    price: { monthly: 0, yearly: 0 },
    credits: '10 free try-ons',
    icon: Sparkles,
    gradient: 'from-slate-500 to-slate-600',
    features: [
      '10 Try-On Credits',
      'Standard Resolution (1080p)',
      'Basic Support',
      'Personal Use Only',
      'Watermarked Results',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For creators and small businesses',
    price: { monthly: 49, yearly: 39 },
    credits: '500 credits/month',
    icon: Zap,
    gradient: 'from-violet-500 to-purple-600',
    features: [
      '500 Try-On Credits',
      'High Resolution (4K)',
      'Priority Processing',
      'Commercial License',
      'No Watermarks',
      'Advanced Editing Tools',
      'Email Support (24h)',
    ],
    cta: 'Get Pro',
    popular: true,
  },
  {
    name: 'Business',
    description: 'For teams and growing brands',
    price: { monthly: 149, yearly: 119 },
    credits: '2,000 credits/month',
    icon: Building2,
    gradient: 'from-pink-500 to-rose-600',
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
    cta: 'Get Business',
    popular: false,
  },
  {
    name: 'Enterprise',
    description: 'For large-scale operations',
    price: { monthly: null, yearly: null },
    credits: 'Unlimited',
    icon: Building2,
    gradient: 'from-cyan-500 to-blue-600',
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
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="tag mb-6 inline-flex">
            <Sparkles className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="text-display-3 font-bold mb-6">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 glass rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!isYearly ? 'bg-white text-canvas' : 'text-white/60 hover:text-white'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isYearly ? 'bg-white text-canvas' : 'text-white/60 hover:text-white'
                }`}
            >
              Yearly
              <span className="ml-2 text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-sm font-bold z-10">
                  Most Popular
                </div>
              )}

              <div className={`card p-6 h-full flex flex-col ${plan.popular ? 'border-violet-500/50 ring-1 ring-violet-500/20' : ''
                }`}>
                {/* Header */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price.monthly !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-white/40">/month</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">Custom Pricing</div>
                  )}
                  <p className="text-sm text-white/40 mt-1">{plan.credits}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-violet-400' : 'text-white/40'}`} />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${plan.popular
                    ? 'btn-primary'
                    : 'border border-white/20 hover:bg-white/5 hover:border-white/30'
                  }`}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-white/40 text-sm"
        >
          Have questions? Check our{' '}
          <a href="#faq" className="text-violet-400 hover:text-violet-300 underline">
            FAQ section
          </a>{' '}
          or{' '}
          <a href="#contact" className="text-violet-400 hover:text-violet-300 underline">
            contact us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
