'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Plus, Equal, Play, Film, ImageIcon as ImageIconLucide } from 'lucide-react';

export default function TryOnPipeline() {
    const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
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

                {/* Tab Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex p-1.5 bg-gray-100 rounded-full">
                        <button
                            onClick={() => setActiveTab('image')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'image'
                                    ? 'bg-white text-gray-900 shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <ImageIconLucide className="w-4 h-4" />
                            Image Try-On
                        </button>
                        <button
                            onClick={() => setActiveTab('video')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'video'
                                    ? 'bg-white text-gray-900 shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Film className="w-4 h-4" />
                            Video Generation
                        </button>
                    </div>
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
                        {activeTab === 'image' ? (
                            /* Image Try-On Pipeline */
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
                                {/* Step 1: Your Photo */}
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mb-3">
                                        1
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                                        Your Photo
                                    </span>
                                    <div className="relative w-[160px] md:w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-200">
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
                                    <div className="relative w-[160px] md:w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-purple-200">
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
                                    <div className="relative w-[160px] md:w-[180px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-green-200">
                                        <Image
                                            src="/images/showcase/model-after.png"
                                            alt="AI generated result - after virtual try-on"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Video Generation Pipeline */
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
                                {/* Step 1: Your Photo */}
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mb-3">
                                        1
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                                        Your Photo
                                    </span>
                                    <div className="relative w-[140px] md:w-[150px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-200">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <ImageIconLucide className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
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
                                    <div className="relative w-[140px] md:w-[150px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-purple-200">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                <ImageIconLucide className="w-6 h-6 text-purple-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow Sign */}
                                <div className="flex items-center justify-center py-4 lg:py-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                        <ArrowRight className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Step 3: AI Video */}
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mb-3">
                                        3
                                    </div>
                                    <span className="text-sm font-semibold text-green-600 mb-3 uppercase tracking-wide">
                                        AI Video
                                    </span>
                                    <div className="relative w-[140px] md:w-[150px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-green-200">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                                            <motion.div
                                                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Play className="w-7 h-7 text-purple-600 ml-1" />
                                            </motion.div>
                                        </div>
                                        <div className="absolute bottom-3 left-3 right-3 text-center">
                                            <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded-full">
                                                4-8 sec video
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/25 transition-all group"
                            >
                                <Sparkles className="w-5 h-5" />
                                {activeTab === 'image' ? 'Try Virtual Try-On' : 'Create Video'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {activeTab === 'video' && (
                                <Link
                                    href="/image-to-video"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all"
                                >
                                    <Film className="w-5 h-5" />
                                    Learn More
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto"
                >
                    <div className="text-center p-4">
                        <div className="text-2xl font-bold text-purple-600">2 sec</div>
                        <div className="text-sm text-gray-500">Image Generation</div>
                    </div>
                    <div className="text-center p-4 border-x border-gray-200">
                        <div className="text-2xl font-bold text-pink-600">HD</div>
                        <div className="text-sm text-gray-500">Quality Output</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-gray-500">AI Powered</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
