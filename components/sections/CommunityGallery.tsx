'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, Download, Eye } from 'lucide-react';
import Image from 'next/image';

const galleryItems = [
    {
        id: 1,
        title: 'Summer Dress Try-On',
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
        likes: 234,
        views: 1200,
    },
    {
        id: 2,
        title: 'Casual Blazer Fit',
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
        likes: 189,
        views: 890,
    },
    {
        id: 3,
        title: 'Elegant Evening Wear',
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop',
        likes: 312,
        views: 1500,
    },
    {
        id: 4,
        title: 'Streetwear Look',
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
        likes: 267,
        views: 1100,
    },
    {
        id: 5,
        title: 'Designer Sneakers',
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
        likes: 423,
        views: 2100,
    },
    {
        id: 6,
        title: 'Luxury Watch Try-On',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
        likes: 198,
        views: 800,
    },
];

export default function CommunityGallery() {
    return (
        <section className="py-12 bg-gradient-to-b from-white to-purple-50/30">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-pink-600" />
                        <span className="text-sm font-medium text-pink-700">Community Showcase</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Stunning Try-Ons from Our{' '}
                        <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Community</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See what our users are creating with AI Virtual Try-On technology
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Category Badge */}
                            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                                {item.category}
                            </div>

                            {/* Hover Actions */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                    <Heart className="w-4 h-4 text-gray-700" />
                                </button>
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                                    <Download className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-white/80">
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        {item.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {item.views}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <button className="px-8 py-4 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                        Explore More Creations
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
