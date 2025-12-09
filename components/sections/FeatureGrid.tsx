'use client';

import { motion } from 'framer-motion';
import {
  Zap, ShieldCheck, Layers, UserCheck, Clock, CreditCard,
  Cpu, Globe, Palette, RefreshCw, Lock, Headphones
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning-Fast',
    description: 'Generate try-on results in under 1 second. 10x faster than traditional rendering.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: UserCheck,
    title: 'Identity Preservation',
    description: 'Advanced facial reconstruction keeps your model looking exactly like themselves.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Layers,
    title: 'Texture Fidelity',
    description: 'Our AI preserves exact fabric textures, patterns, and natural drape physics.',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'SOC 2 and GDPR compliant. Your data is encrypted and never shared.',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    icon: Clock,
    title: '98% First-Try Success',
    description: 'Industry-leading accuracy means no endless regeneration cycles.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    description: 'No hidden fees or setup costs. Start free and scale as you grow.',
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    icon: Cpu,
    title: 'Powerful API',
    description: 'RESTful API with comprehensive documentation for seamless integration.',
    gradient: 'from-indigo-400 to-violet-500',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Edge-deployed servers ensure fast processing from anywhere in the world.',
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Color Matching',
    description: 'Intelligent color correction ensures perfect lighting consistency.',
    gradient: 'from-fuchsia-400 to-pink-500',
  },
  {
    icon: RefreshCw,
    title: 'Batch Processing',
    description: 'Process hundreds of images simultaneously with our bulk API.',
    gradient: 'from-lime-400 to-green-500',
  },
  {
    icon: Lock,
    title: 'Private by Default',
    description: 'Images auto-delete after 24 hours. Your data is never used for training.',
    gradient: 'from-red-400 to-rose-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team ready to help via chat, email, or video call.',
    gradient: 'from-sky-400 to-blue-500',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="section-padding relative overflow-hidden bg-canvas-light/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="tag mb-6 inline-flex">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-display-3 font-bold mb-6">
            Why Brands Choose <span className="gradient-text">VTO Studio</span>
          </h2>
          <p className="text-lg text-white/60">
            Revolutionary technology that outperforms traditional CGI with unmatched speed,
            accuracy, and ease of use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="card p-6 h-full hover:border-white/10 relative overflow-hidden">
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
