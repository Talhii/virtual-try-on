'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Film,
    Menu,
    User,
    Image as ImageIcon,
    ChevronUp,
    ChevronDown,
    Sparkles,
    Zap,
    Video,
} from 'lucide-react';

const videoStyles = [
    { id: 'natural', label: 'Natural', icon: '🚶' },
    { id: 'walking', label: 'Walking', icon: '🏃' },
    { id: 'rotating', label: 'Rotate', icon: '🔄' },
    { id: 'subtle', label: 'Subtle', icon: '✨' },
];

const durationOptions = [
    { id: '4s', label: '4 sec' },
    { id: '6s', label: '6 sec' },
    { id: '8s', label: '8 sec' },
];

interface VideoSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    selectedDuration: string;
    setSelectedDuration: (duration: string) => void;
    modelImage: string | null;
    setModelImage: (image: string | null) => void;
    itemImage: string | null;
    setItemImage: (image: string | null) => void;
}

export default function VideoSidebar({
    sidebarOpen,
    setSidebarOpen,
    selectedStyle,
    setSelectedStyle,
    selectedDuration,
    setSelectedDuration,
    modelImage,
    setModelImage,
    itemImage,
    setItemImage,
}: VideoSidebarProps) {
    const [optionsExpanded, setOptionsExpanded] = React.useState(false);

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
        <AnimatePresence>
            {sidebarOpen && (
                <motion.aside
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 360, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden lg:block h-full bg-white border-r border-gray-200 overflow-hidden flex-shrink-0 sticky top-20"
                >
                    <div className="w-[360px] h-full overflow-y-auto">
                        {/* Sidebar Header */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Film className="w-5 h-5 text-purple-600" />
                                    <h2 className="font-semibold text-gray-900">Image to Video</h2>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Menu className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Step 1: Upload Model */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        1
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Upload Your Photo</span>
                                </div>
                                <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer group ${modelImage ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50/50'
                                    }`}>
                                    <input
                                        type="file"
                                        id="model-upload-video"
                                        accept="image/*"
                                        onChange={handleModelUpload}
                                        className="hidden"
                                    />
                                    <label htmlFor="model-upload-video" className="cursor-pointer block">
                                        {modelImage ? (
                                            <div className="relative">
                                                <div className="relative w-full h-36 rounded-lg overflow-hidden">
                                                    <Image src={modelImage} alt="Model" fill className="object-cover" unoptimized />
                                                </div>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); setModelImage(null); }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <User className="w-7 h-7 text-white" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">Drop photo or click</p>
                                                <p className="text-xs text-gray-500 mt-1">Full body photo works best</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Step 2: Upload Item */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        2
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Upload Item to Try</span>
                                </div>
                                <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer group ${itemImage ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-400 hover:bg-pink-50/50'
                                    }`}>
                                    <input
                                        type="file"
                                        id="item-upload-video"
                                        accept="image/*"
                                        onChange={handleItemUpload}
                                        className="hidden"
                                    />
                                    <label htmlFor="item-upload-video" className="cursor-pointer block">
                                        {itemImage ? (
                                            <div className="relative">
                                                <div className="relative w-full h-36 rounded-lg overflow-hidden">
                                                    <Image src={itemImage} alt="Item" fill className="object-cover" unoptimized />
                                                </div>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); setItemImage(null); }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="w-7 h-7 text-white" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">Drop item or click</p>
                                                <p className="text-xs text-gray-500 mt-1">Clothing, shoes, jewelry, etc.</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Step 3: Choose Animation Style */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        3
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Animation Style</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {videoStyles.map((style) => (
                                        <button
                                            key={style.id}
                                            onClick={() => setSelectedStyle(style.id)}
                                            className={`p-3 rounded-xl text-center transition-all ${selectedStyle === style.id
                                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-[1.02]'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <div className="text-xl mb-1">{style.icon}</div>
                                            <div className="text-xs font-medium">{style.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 4: Duration */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        4
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Video Duration</span>
                                </div>
                                <div className="flex gap-2">
                                    {durationOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedDuration(option.id)}
                                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${selectedDuration === option.id
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-2">
                                <button
                                    onClick={() => setOptionsExpanded(!optionsExpanded)}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    {optionsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    <span>Advanced options</span>
                                </button>
                                <AnimatePresence>
                                    {optionsExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="space-y-3 pt-2">
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                    <span className="text-sm text-gray-700">HD Quality</span>
                                                    <div className="w-10 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                    <span className="text-sm text-gray-700">Loop animation</span>
                                                    <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Generate Button */}
                            <button
                                className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${modelImage && itemImage
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-200 hover:scale-[1.02]'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                disabled={!modelImage || !itemImage}
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate Video
                            </button>

                            {/* Helper Text */}
                            {(!modelImage || !itemImage) && (
                                <p className="text-center text-xs text-gray-500">
                                    Upload both a photo and an item to generate
                                </p>
                            )}

                            {/* Credits Info */}
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <Zap className="w-4 h-4 text-orange-500" />
                                <span className="text-xs text-gray-500">Uses 2 credits per video</span>
                            </div>
                        </div>

                        {/* Bottom Links */}
                        <div className="border-t border-gray-100 p-4 mt-4">
                            <div className="space-y-1">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                >
                                    <ImageIcon className="w-4 h-4" />
                                    Virtual Try-On
                                </Link>
                                <Link
                                    href="/dashboard/gallery"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                >
                                    <Video className="w-4 h-4" />
                                    My Videos
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
