'use client';

import { motion } from 'framer-motion';
import { Image as ImageIcon, Zap } from 'lucide-react';

export default function GalleryTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
        >
            {/* Simple Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Creations</h2>
                <p className="text-gray-500 mt-1">AI-generated try-on results will appear here</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-xs text-purple-600/70 font-medium">Creations</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-pink-600">0</div>
                    <div className="text-xs text-pink-600/70 font-medium">This Week</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-orange-600">10</div>
                    <div className="text-xs text-orange-600/70 font-medium">Credits Left</div>
                </div>
            </div>

            {/* Gallery Grid or Empty State */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200"
                    >
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                            <ImageIcon className="w-8 h-8 mb-2" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State CTA */}
            <div className="mt-8 text-center py-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-7 h-7 text-purple-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to create?</h4>
                <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                    Use the panel on the left to upload your photo and items
                </p>
            </div>
        </motion.div>
    );
}
