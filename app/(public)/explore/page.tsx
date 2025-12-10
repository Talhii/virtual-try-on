'use client';

import { motion } from 'framer-motion';
import { Sparkles, Search, Filter, Grid3X3, List, Heart, Eye, Download } from 'lucide-react';
import { Badge } from '@/components/ui';
import { Footer } from '@/components/layout';

const categories = [
    'All',
    'Clothing',
    'Shoes',
    'Jewelry',
    'Accessories',
    'Bags',
    'Eyewear',
];

const exploreItems = [
    { id: 1, title: 'Summer Dress Collection', category: 'Clothing', likes: 234, views: 1.2 },
    { id: 2, title: 'Vintage Sneakers', category: 'Shoes', likes: 189, views: 0.9 },
    { id: 3, title: 'Gold Necklace Set', category: 'Jewelry', likes: 312, views: 1.5 },
    { id: 4, title: 'Designer Handbag', category: 'Bags', likes: 267, views: 1.1 },
    { id: 5, title: 'Aviator Sunglasses', category: 'Eyewear', likes: 156, views: 0.7 },
    { id: 6, title: 'Boho Hat Collection', category: 'Accessories', likes: 198, views: 0.8 },
    { id: 7, title: 'Formal Blazer', category: 'Clothing', likes: 423, views: 2.1 },
    { id: 8, title: 'Running Shoes Pro', category: 'Shoes', likes: 345, views: 1.8 },
];

export default function ExplorePage() {
    return (
        <div className="pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 pt-4"
                >
                    <Badge className="mb-4">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Discover Amazing Styles
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Explore AI Try-On Gallery
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Browse through thousands of virtual try-on creations from our community
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search styles, items, or categories..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Filter className="w-5 h-5" />
                        Filters
                    </button>
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                        <button className="p-3 bg-gray-100">
                            <Grid3X3 className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="p-3 hover:bg-gray-50">
                            <List className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </motion.div>

                {/* Category Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-12"
                >
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${index === 0
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {exploreItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                        >
                            <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="w-12 h-12 text-purple-300" />
                                </div>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                                        <Heart className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                                <div className="absolute bottom-3 left-3">
                                    <Badge className="bg-white/90 backdrop-blur text-xs">
                                        {item.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        {item.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {item.views}k
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                        Load More
                    </button>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
