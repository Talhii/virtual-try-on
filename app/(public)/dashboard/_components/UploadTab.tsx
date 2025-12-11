'use client';

import { motion } from 'framer-motion';
import { Upload, BookOpen } from 'lucide-react';

export default function UploadTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center h-full"
        >
            <div className="w-full max-w-lg">
                {/* Upload Zone */}
                <div className="border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-2xl p-12 text-center transition-colors cursor-pointer group bg-gradient-to-br from-gray-50 to-white">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <Upload className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Images</h3>
                    <p className="text-gray-500 mb-6">Drag and drop your images here, or click to browse</p>
                    <div className="flex flex-col gap-3">
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                            Choose Files
                        </button>
                        <span className="text-xs text-gray-400">Supports: JPG, PNG, WebP (Max 10MB)</span>
                    </div>
                </div>

                {/* Upload Tips */}
                <div className="mt-8 p-6 bg-purple-50 rounded-xl">
                    <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Tips for Best Results
                    </h4>
                    <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>Use high-resolution images for better quality</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>Ensure the model is clearly visible in the photo</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>Upload items with clean backgrounds for best results</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
