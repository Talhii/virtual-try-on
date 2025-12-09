'use client';

import { motion } from 'framer-motion';
import { Upload, Wand2, Download, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Upload,
        title: 'Upload Your Photo',
        description: 'Start by uploading a photo of yourself or your model. Our AI works with any standard photo - no professional setup required.',
        color: 'from-violet-500 to-purple-600',
        features: ['Smartphone photos accepted', 'Auto body detection', 'Multiple poses supported'],
    },
    {
        number: '02',
        icon: Sparkles,
        title: 'Choose Any Garment',
        description: 'Select from our catalog or upload your own product images. Our AI understands fabric textures, patterns, and drape.',
        color: 'from-pink-500 to-rose-600',
        features: ['10K+ garments in catalog', 'Custom uploads supported', 'All clothing types'],
    },
    {
        number: '03',
        icon: Wand2,
        title: 'AI Does the Magic',
        description: 'Our advanced neural network analyzes both images and seamlessly blends them while preserving identity and realistic physics.',
        color: 'from-cyan-500 to-blue-600',
        features: ['< 1 second processing', 'Physics-accurate draping', 'Identity preservation'],
    },
    {
        number: '04',
        icon: Download,
        title: 'Download & Use',
        description: 'Get your high-resolution try-on result ready for e-commerce, marketing, or personal use. Commercial license included.',
        color: 'from-emerald-500 to-green-600',
        features: ['4K resolution output', 'Multiple format export', 'Commercial license'],
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="tag mb-6 inline-flex">
                        <Sparkles className="w-4 h-4" />
                        Simple 4-Step Process
                    </div>
                    <h2 className="text-display-3 font-bold mb-6">
                        How VTO Studio <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-lg text-white/60">
                        Transform any photo into a professional virtual try-on in seconds.
                        No technical skills required.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="card p-6 h-full flex flex-col relative overflow-hidden">
                                {/* Gradient Glow on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                {/* Step Number */}
                                <span className="text-5xl font-bold text-white/5 absolute top-4 right-4 select-none">
                                    {step.number}
                                </span>

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <step.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                                    {step.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {step.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Connector Arrow (hidden on last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-canvas-subtle border border-white/10 items-center justify-center text-white/30">
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <a href="#try-on" className="btn-primary inline-flex items-center gap-2 text-lg">
                        Start Creating Now
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
