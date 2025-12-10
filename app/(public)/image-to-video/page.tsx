'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Video, Play, Clock, User, Shirt, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui';

const features = [
    {
        icon: Upload,
        title: 'Upload Model & Item',
        description: 'Start by uploading a photo of yourself and the garment you want to try on',
    },
    {
        icon: Sparkles,
        title: 'AI Try-On Generation',
        description: 'Our AI creates a perfect virtual try-on and then animates it into a video',
    },
    {
        icon: Video,
        title: 'Get Your Video',
        description: 'Download your animated try-on video showing the outfit in motion',
    },
];

const examples = [
    { id: 1, title: 'Dress Try-On Video', duration: '4s', category: 'Clothing' },
    { id: 2, title: 'Formal Blazer Motion', duration: '5s', category: 'Clothing' },
    { id: 3, title: 'Sneaker Showcase', duration: '3s', category: 'Shoes' },
    { id: 4, title: 'Jewelry Animation', duration: '4s', category: 'Accessories' },
];

export default function ImageToVideoPage() {
    const [modelImage, setModelImage] = useState<string | null>(null);
    const [itemImage, setItemImage] = useState<string | null>(null);

    const handleModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setModelImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleItemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setItemImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 pt-4"
                >
                    <Badge className="mb-4">
                        <Video className="w-4 h-4 mr-2" />
                        Virtual Try-On Video
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gray-900">Turn Your Try-On Into</span>
                        <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Animated Video
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Upload a model photo and an item, then watch the AI create a stunning video of the virtual try-on in motion
                    </p>
                </motion.div>

                {/* Main Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-100">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center">
                            {/* Upload Model */}
                            <div className="space-y-3">
                                <span className="block text-sm font-medium text-gray-700 text-center">
                                    Step 1: Upload Model
                                </span>
                                <div className="border-2 border-dashed border-purple-300 rounded-2xl p-4 hover:border-purple-500 transition-colors cursor-pointer bg-white">
                                    <input
                                        type="file"
                                        id="model-upload-video"
                                        accept="image/*"
                                        onChange={handleModelUpload}
                                        className="hidden"
                                    />
                                    <label htmlFor="model-upload-video" className="cursor-pointer block">
                                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative flex items-center justify-center">
                                            {modelImage ? (
                                                <Image src={modelImage} alt="Model" fill className="object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <User className="w-8 h-8 text-purple-500" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700">Upload human model</p>
                                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Plus Icon */}
                            <div className="hidden lg:flex w-12 h-12 rounded-full bg-purple-200 items-center justify-center text-purple-600 font-bold text-xl">
                                +
                            </div>

                            {/* Upload Item */}
                            <div className="space-y-3">
                                <span className="block text-sm font-medium text-gray-700 text-center">
                                    Step 2: Upload Item
                                </span>
                                <div className="border-2 border-dashed border-purple-300 rounded-2xl p-4 hover:border-purple-500 transition-colors cursor-pointer bg-white">
                                    <input
                                        type="file"
                                        id="item-upload-video"
                                        accept="image/*"
                                        onChange={handleItemUpload}
                                        className="hidden"
                                    />
                                    <label htmlFor="item-upload-video" className="cursor-pointer block">
                                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative flex items-center justify-center">
                                            {itemImage ? (
                                                <Image src={itemImage} alt="Item" fill className="object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <Shirt className="w-8 h-8 text-pink-500" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700">Upload item to wear</p>
                                                    <p className="text-xs text-gray-500 mt-1">Clothing, shoes, accessories</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Arrow Icon */}
                            <div className="hidden lg:flex w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center">
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>

                            {/* Video Result Preview */}
                            <div className="space-y-3">
                                <span className="block text-sm font-medium text-gray-700 text-center">
                                    Step 3: Get Video
                                </span>
                                <div className="border-2 border-purple-400 rounded-2xl p-4 bg-gradient-to-br from-purple-100 to-pink-100">
                                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white relative flex items-center justify-center">
                                        <div className="text-center p-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Play className="w-10 h-10 text-white ml-1" />
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800">Try-On Video</p>
                                            <p className="text-xs text-gray-500 mt-1">4-8 second animation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile indicators */}
                        <div className="lg:hidden flex justify-center gap-4 mt-4 text-purple-400">
                            <span className="text-2xl">+</span>
                            <span className="text-2xl">→</span>
                        </div>

                        {/* Options */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <select className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                <option>Animation Style: Natural Movement</option>
                                <option>Animation Style: Walking</option>
                                <option>Animation Style: Pose Rotation</option>
                                <option>Animation Style: Subtle Motion</option>
                            </select>
                            <select className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                <option>Duration: 4 seconds</option>
                                <option>Duration: 6 seconds</option>
                                <option>Duration: 8 seconds</option>
                            </select>
                        </div>

                        <button
                            className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!modelImage || !itemImage}
                        >
                            <Sparkles className="w-5 h-5" />
                            Generate Try-On Video
                        </button>
                        {(!modelImage || !itemImage) && (
                            <p className="text-center text-sm text-gray-500 mt-3">
                                Please upload both a model photo and an item to generate the video
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* How It Works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="text-center p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Example Videos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="text-center mb-12">
                        <Badge className="mb-4">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Example Results
                        </Badge>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Try-On Video Examples
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {examples.map((example) => (
                            <div
                                key={example.id}
                                className="group relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                        <Play className="w-6 h-6 text-purple-600 ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                                        {example.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="font-medium text-gray-900 mb-1">{example.title}</h4>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        {example.duration}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Ready to Create Your Try-On Video?
                        </h3>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Turn static try-on images into engaging, shareable video content for your brand or personal use
                        </p>
                        <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all">
                            Get Started Free
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
