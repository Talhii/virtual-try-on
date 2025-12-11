'use client';

import { motion } from 'framer-motion';
import { Play, Clock, Sparkles } from 'lucide-react';

export default function VideoExamples() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Example Videos</h2>
                <p className="text-gray-500 mt-1">See what&apos;s possible with AI-generated try-on videos</p>
            </div>

            {/* Example Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                    { title: 'Summer Dress', duration: '4s', category: 'Clothing' },
                    { title: 'Formal Blazer', duration: '6s', category: 'Clothing' },
                    { title: 'Sneaker Walk', duration: '5s', category: 'Shoes' },
                    { title: 'Jewelry Shine', duration: '4s', category: 'Accessories' },
                    { title: 'Casual Outfit', duration: '6s', category: 'Clothing' },
                    { title: 'Evening Gown', duration: '8s', category: 'Clothing' },
                    { title: 'Watch Display', duration: '4s', category: 'Accessories' },
                    { title: 'Bag Showcase', duration: '5s', category: 'Accessories' },
                ].map((example, i) => (
                    <motion.div
                        key={example.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="aspect-[9/16] bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-200 relative"
                    >
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                <Play className="w-6 h-6 text-purple-600 ml-1" />
                            </div>
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                                {example.category}
                            </span>
                        </div>

                        {/* Info bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                            <h4 className="font-medium text-white text-sm">{example.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-white/80 mt-1">
                                <Clock className="w-3 h-3" />
                                {example.duration}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* How It Works */}
            <div className="mt-12 p-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl text-white">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    How Video Generation Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { step: '1', title: 'Upload Photos', desc: 'Add your model photo and the item to try on' },
                        { step: '2', title: 'Choose Style', desc: 'Select animation style and duration' },
                        { step: '3', title: 'Generate', desc: 'AI creates your animated try-on video' },
                    ].map((item) => (
                        <div key={item.step} className="flex gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                {item.step}
                            </div>
                            <div>
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-white/80">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
