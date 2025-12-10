'use client';

import { motion } from 'framer-motion';
import { Upload, Wand2, Download, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Upload,
        title: 'Upload Your Photo',
        description: 'Start by uploading a photo of yourself or your model. Our AI works with any standard photo.',
        color: 'bg-blue-500',
    },
    {
        number: '02',
        icon: Sparkles,
        title: 'Choose Any Garment',
        description: 'Select from our catalog or upload your own product images. Our AI understands all fabric types.',
        color: 'bg-purple-500',
    },
    {
        number: '03',
        icon: Wand2,
        title: 'AI Does the Magic',
        description: 'Our advanced AI seamlessly blends both images while preserving identity and realistic physics.',
        color: 'bg-pink-500',
    },
    {
        number: '04',
        icon: Download,
        title: 'Download & Use',
        description: 'Get your high-resolution try-on result ready for personal use or commercial purposes.',
        color: 'bg-green-500',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section-padding bg-gray-50">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600">
                        Transform any photo into a professional virtual try-on in seconds.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                {/* Step Number */}
                                <span className="text-sm font-medium text-gray-400 mb-4 block">
                                    Step {step.number}
                                </span>

                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-5`}>
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a href="#try-on" className="btn-primary inline-flex items-center gap-2">
                        Start Creating Now
                        <ArrowRight className="w-5 h-5 arrow-icon" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
