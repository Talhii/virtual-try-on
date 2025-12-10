'use client';

import { motion } from 'framer-motion';
import { History as HistoryIcon, Clock, Download, Trash2, Eye, MoreVertical, Search, Filter, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui';

const historyItems = [
    {
        id: 1,
        title: 'Summer Dress Try-On',
        type: 'Clothing',
        date: '2 hours ago',
        status: 'completed',
    },
    {
        id: 2,
        title: 'Sneakers Virtual Fit',
        type: 'Shoes',
        date: '5 hours ago',
        status: 'completed',
    },
    {
        id: 3,
        title: 'Diamond Necklace Preview',
        type: 'Jewelry',
        date: 'Yesterday',
        status: 'completed',
    },
    {
        id: 4,
        title: 'Formal Blazer Fitting',
        type: 'Clothing',
        date: 'Yesterday',
        status: 'completed',
    },
    {
        id: 5,
        title: 'Designer Bag Match',
        type: 'Bags',
        date: '2 days ago',
        status: 'completed',
    },
    {
        id: 6,
        title: 'Sunglasses Try-On',
        type: 'Eyewear',
        date: '3 days ago',
        status: 'completed',
    },
];

export default function HistoryPage() {
    return (
        <div className="pt-4 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <Badge className="mb-4">
                                <HistoryIcon className="w-4 h-4 mr-2" />
                                Your Activity
                            </Badge>
                            <h1 className="text-4xl font-bold text-gray-900">Try-On History</h1>
                            <p className="text-gray-600 mt-2">View and manage your previous virtual try-ons</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Calendar className="w-4 h-4" />
                                Date Range
                            </button>
                            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Trash2 className="w-4 h-4" />
                                Clear All
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Search & Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Filter className="w-5 h-5" />
                        Filter by Type
                    </button>
                </motion.div>

                {/* History List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4"
                >
                    {historyItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                                    <HistoryIcon className="w-8 h-8 text-purple-400" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge className="text-xs">{item.type}</Badge>
                                        <span className="flex items-center gap-1 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            {item.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                                        <Eye className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                                        <Download className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MoreVertical className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load More */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <button className="px-8 py-3 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
                        Load More History
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
