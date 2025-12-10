'use client';

import { motion } from 'framer-motion';
import {
  Zap, ShieldCheck, Sparkles, UserCheck, Target, CreditCard
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'One-Shot Perfect Generation',
    description: 'Get perfect try-on results on your first attempt. Our AI understands body shape, pose, and lighting automatically.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Processing',
    description: 'Generate try-on results in under 2 seconds. 10x faster than traditional rendering methods.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: UserCheck,
    title: 'Identity Preservation',
    description: 'Advanced facial reconstruction keeps your model looking exactly like themselves in every try-on.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Consistent Character Editing',
    description: 'Maintain consistency across multiple try-ons. Same model, different outfits, perfect results.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'SOC 2 and GDPR compliant. Your images are encrypted, processed securely, and never shared.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: CreditCard,
    title: 'No Credit Card Required',
    description: 'Start with free credits and experience the magic. Upgrade only when you need more.',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

export default function FeatureGrid() {
  return (
    <section id="features" className="py-12 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Creators Choose{' '}
            <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">VTO Studio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revolutionary AI technology that outperforms traditional methods with unmatched speed and accuracy.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group"
            >
              <motion.div
                className="bg-white rounded-2xl p-8 h-full border border-gray-100 card-shine relative overflow-hidden"
                whileHover={{
                  y: -8,
                  borderColor: 'rgb(216, 180, 254)',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
