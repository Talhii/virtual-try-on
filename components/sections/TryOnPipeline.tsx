'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Plus, Equal } from 'lucide-react';

export default function TryOnPipeline() {
    return (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">Simple 3-Step Process</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Upload your photo, add a clothing item, and get instant AI-generated results
                    </p>
                </motion.div>

                {/* Pipeline Showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    {/* Pipeline Content */}
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">

                            {/* Step 1: Your Photo */}
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mb-3">
                                    1
                                </div>
                                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                                    Your Photo
                                </span>
                                <div className="relative w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-200">
                                    <Image
                                        src="/images/showcase/model-before.png"
                                        alt="Your photo - before virtual try-on"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Plus Sign */}
                            <div className="flex items-center justify-center py-4 lg:py-0">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Plus className="w-6 h-6 text-gray-500" />
                                </div>
                            </div>

                            {/* Step 2: Clothing Item */}
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold mb-3">
                                    2
                                </div>
                                <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                                    Clothing Item
                                </span>
                                <div className="relative w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-purple-200">
                                    <Image
                                        src="/images/showcase/clothing-item.png"
                                        alt="Clothing item to try on"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Equals Sign */}
                            <div className="flex items-center justify-center py-4 lg:py-0">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                    <Equal className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* Step 3: AI Result */}
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mb-3">
                                    3
                                </div>
                                <span className="text-sm font-semibold text-green-600 mb-3 uppercase tracking-wide">
                                    AI Result
                                </span>
                                <div className="relative w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-green-200">
                                    <Image
                                        src="/images/showcase/model-after.png"
                                        alt="AI generated result - after virtual try-on"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex justify-center mt-10">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/25 transition-all group"
                            >
                                <Sparkles className="w-5 h-5" />
                                Try It Now - It&apos;s Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
