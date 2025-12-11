'use client';

import { motion } from 'framer-motion';
import { User, Image as ImageIcon, BookOpen, Zap } from 'lucide-react';

export default function InfoTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
        >
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">How to Use Virtual Try-On</h2>
                <p className="text-gray-600">Follow these simple steps to transform your style with AI</p>
            </div>

            {/* Steps */}
            <div className="space-y-6 mb-10">
                {[
                    {
                        step: 1,
                        title: 'Upload a Model Photo',
                        description: 'Choose a clear, well-lit photo of yourself or a model. Front-facing photos with visible full body work best.',
                        icon: User,
                        color: 'from-purple-500 to-purple-600',
                    },
                    {
                        step: 2,
                        title: 'Select an Item to Try On',
                        description: 'Upload an image of the clothing, shoes, jewelry, or accessories you want to virtually wear.',
                        icon: ImageIcon,
                        color: 'from-pink-500 to-pink-600',
                    },
                    {
                        step: 3,
                        title: 'Add Optional Details',
                        description: 'Provide any additional instructions to help the AI understand your preferences better.',
                        icon: BookOpen,
                        color: 'from-orange-500 to-orange-600',
                    },
                    {
                        step: 4,
                        title: 'Generate Your Look',
                        description: 'Click generate and watch as AI transforms your photo with the new outfit in seconds.',
                        icon: Zap,
                        color: 'from-green-500 to-green-600',
                    },
                ].map((item) => (
                    <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: item.step * 0.1 }}
                        className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                                    Step {item.step}
                                </span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pro Tips Section */}
            <div className="p-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl text-white">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Pro Tips for Best Results
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        'Use high-resolution images (1080p or higher)',
                        'Ensure good lighting in your model photos',
                        'Choose items with clear, visible details',
                        'Try different poses for variety',
                        'Use the "Last Generation AI" for complex items',
                        'Save your favorites to your gallery',
                    ].map((tip) => (
                        <div key={tip} className="flex items-start gap-2 text-sm">
                            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                ✓
                            </span>
                            <span className="text-white/90">{tip}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {[
                        {
                            q: 'What image formats are supported?',
                            a: 'We support JPG, PNG, and WebP formats up to 10MB in size.',
                        },
                        {
                            q: 'How long does generation take?',
                            a: 'Most generations complete in 10-30 seconds, depending on complexity.',
                        },
                        {
                            q: 'Can I try on multiple items?',
                            a: 'Yes! You can add up to 2 items per generation for a complete outfit.',
                        },
                    ].map((faq) => (
                        <div key={faq.q} className="p-4 bg-gray-50 rounded-xl">
                            <h4 className="font-medium text-gray-900 mb-2">{faq.q}</h4>
                            <p className="text-gray-600 text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
