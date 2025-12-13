'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Image as ImageIcon,
    Plus,
    ChevronDown,
    ChevronUp,
    Zap,
    Images,
    History,
    Menu,
    Loader2,
    User,
} from 'lucide-react';
import { uploadApi, tryonApi, type TryOnResult } from '@/services/api';
import { useAuth } from '@/hooks';

interface DashboardSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    selectedHelper: string;
    setSelectedHelper: (helper: string) => void;
    modelImage: string | null;
    setModelImage: (image: string | null) => void;
    itemImage: string | null;
    setItemImage: (image: string | null) => void;
    item2Image: string | null;
    setItem2Image: (image: string | null) => void;
    additionalInfo: string;
    setAdditionalInfo: (info: string) => void;
    selectedAiMode: string;
    setSelectedAiMode: (mode: string) => void;
    onTryOnResult?: (result: TryOnResult) => void;
}

const aiModes = [
    { id: 'standard', label: 'Standard AI' },
    { id: 'last-gen', label: 'Last Generation AI' },
];

export default function DashboardSidebar({
    sidebarOpen,
    setSidebarOpen,
    selectedHelper,
    setSelectedHelper,
    modelImage,
    setModelImage,
    itemImage,
    setItemImage,
    item2Image,
    setItem2Image,
    additionalInfo,
    setAdditionalInfo,
    selectedAiMode,
    setSelectedAiMode,
    onTryOnResult,
}: DashboardSidebarProps) {
    const { user } = useAuth() as { user: any };
    const [modeExpanded, setModeExpanded] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState<'model' | 'item' | 'item2' | null>(null);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Store the uploaded URLs separately from display URLs
    const [modelUploadUrl, setModelUploadUrl] = React.useState<string | null>(null);
    const [itemUploadUrl, setItemUploadUrl] = React.useState<string | null>(null);

    const handleModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsUploading('model');

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (event) => {
            setModelImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to storage
        try {
            const result = await uploadApi.uploadModelImage(file);
            if (result.success) {
                setModelUploadUrl(result.url);
                setModelImage(result.url);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to upload model image';
            setError(message);
        } finally {
            setIsUploading(null);
        }
    };

    const handleItemUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsUploading('item');

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (event) => {
            setItemImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to storage
        try {
            const result = await uploadApi.uploadGarmentImage(file);
            if (result.success) {
                setItemUploadUrl(result.url);
                setItemImage(result.url);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to upload garment image';
            setError(message);
        } finally {
            setIsUploading(null);
        }
    };

    const handleItem2Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading('item2');
        const reader = new FileReader();
        reader.onload = (event) => {
            setItem2Image(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        try {
            const result = await uploadApi.uploadGarmentImage(file);
            if (result.success) {
                setItem2Image(result.url);
            }
        } catch {
            // Silent fail for optional second item
        } finally {
            setIsUploading(null);
        }
    };

    const handleGenerate = async () => {
        const modelUrl = modelUploadUrl || modelImage;
        const itemUrl = itemUploadUrl || itemImage;

        if (!modelUrl || !itemUrl) return;

        // Check if images are data URLs (local preview) - need actual URLs for AI processing
        if (modelUrl.startsWith('data:') || itemUrl.startsWith('data:')) {
            setError('Please wait for images to finish uploading before generating.');
            return;
        }

        setError(null);
        setIsGenerating(true);

        try {
            const result = await tryonApi.generate({
                modelImageUrl: modelUrl,
                garmentImageUrl: itemUrl,
                settings: {
                    preserveIdentity: true,
                    highResolution: selectedAiMode === 'last-gen',
                    creativity: 50,
                },
            });

            if (result.success && result.result) {
                onTryOnResult?.(result.result);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to generate try-on';
            setError(message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClearModel = () => {
        setModelImage(null);
        setModelUploadUrl(null);
    };

    const handleClearItem = () => {
        setItemImage(null);
        setItemUploadUrl(null);
    };

    const isUploadsReady = modelImage && itemImage &&
        !modelImage.startsWith('data:') && !itemImage.startsWith('data:');

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
                                <h2 className="font-semibold text-gray-900">Virtual Try-On</h2>
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Menu className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Step 1: Choose Mode */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        1
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Choose Mode</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'clothes', label: 'Clothes', icon: '👕' },
                                        { id: 'shoes', label: 'Shoes', icon: '👟' },
                                        { id: 'jewelry', label: 'Jewelry', icon: '💍' },
                                        { id: 'bag', label: 'Bags', icon: '👜' },
                                        { id: 'accessories', label: 'Extras', icon: '🎀' },
                                        { id: 'swap-model', label: 'Swap', icon: '🔄' },
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => setSelectedHelper(mode.id)}
                                            className={`p-3 rounded-xl text-center transition-all ${selectedHelper === mode.id
                                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-[1.02]'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <div className="text-xl mb-1">{mode.icon}</div>
                                            <div className="text-[10px] font-medium leading-tight">{mode.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Upload Model */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        2
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Upload Your Photo</span>
                                    {isUploading === 'model' && (
                                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                                    )}
                                </div>
                                <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer group ${modelImage ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50/50'
                                    }`}>
                                    <input
                                        type="file"
                                        id="model-upload"
                                        accept="image/*"
                                        onChange={handleModelUpload}
                                        className="hidden"
                                        disabled={isUploading === 'model'}
                                    />
                                    <label htmlFor="model-upload" className="cursor-pointer block">
                                        {modelImage ? (
                                            <div className="relative">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                                    <Image src={modelImage} alt="Model" fill className="object-cover" unoptimized />
                                                    {isUploading === 'model' && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); handleClearModel(); }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">Drop photo or click</p>
                                                <p className="text-xs text-gray-500 mt-1">Full body photo works best</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Step 3: Upload Item */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                                        3
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">Upload Item to Try</span>
                                    {isUploading === 'item' && (
                                        <Loader2 className="w-4 h-4 animate-spin text-pink-600" />
                                    )}
                                </div>
                                <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer group ${itemImage ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-400 hover:bg-pink-50/50'
                                    }`}>
                                    <input
                                        type="file"
                                        id="item-upload"
                                        accept="image/*"
                                        onChange={handleItemUpload}
                                        className="hidden"
                                        disabled={isUploading === 'item'}
                                    />
                                    <label htmlFor="item-upload" className="cursor-pointer block">
                                        {itemImage ? (
                                            <div className="relative">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                                    <Image src={itemImage} alt="Item" fill className="object-cover" unoptimized />
                                                    {isUploading === 'item' && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); handleClearItem(); }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="w-6 h-6 text-white" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">Drop item or click</p>
                                                <p className="text-xs text-gray-500 mt-1">Clothing, shoes, jewelry, etc.</p>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                {/* Optional: Add second item */}
                                {item2Image ? (
                                    <div className="relative border-2 border-dashed border-orange-400 bg-orange-50 rounded-xl p-3">
                                        <div className="relative w-full h-20 rounded-lg overflow-hidden">
                                            <Image src={item2Image} alt="Item 2" fill className="object-cover" unoptimized />
                                        </div>
                                        <button
                                            onClick={() => setItem2Image(null)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => document.getElementById('item2-upload')?.click()}
                                        className="w-full py-2 text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Add second item (optional)
                                    </button>
                                )}
                                <input
                                    type="file"
                                    id="item2-upload"
                                    accept="image/*"
                                    onChange={handleItem2Upload}
                                    className="hidden"
                                />
                            </div>

                            {/* Optional: Additional Instructions */}
                            <div className="space-y-2">
                                <button
                                    onClick={() => setModeExpanded(!modeExpanded)}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    {modeExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    <span>Additional options</span>
                                </button>
                                <AnimatePresence>
                                    {modeExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="space-y-3 pt-2">
                                                <textarea
                                                    value={additionalInfo}
                                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                                    placeholder="Add special instructions (e.g., 'keep original colors')"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                                                    rows={2}
                                                />
                                                <div className="flex gap-2">
                                                    {aiModes.map((mode) => (
                                                        <button
                                                            key={mode.id}
                                                            onClick={() => setSelectedAiMode(mode.id)}
                                                            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${selectedAiMode === mode.id
                                                                ? 'bg-purple-600 text-white'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                }`}
                                                        >
                                                            {mode.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={handleGenerate}
                                className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${isUploadsReady && !isGenerating
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg hover:shadow-purple-200 hover:scale-[1.02]'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                disabled={!isUploadsReady || isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Generate Try-On
                                    </>
                                )}
                            </button>

                            {/* Helper Text */}
                            {(!modelImage || !itemImage) && (
                                <p className="text-center text-xs text-gray-500">
                                    Upload both a photo and an item to generate
                                </p>
                            )}
                            {modelImage && itemImage && !isUploadsReady && (
                                <p className="text-center text-xs text-purple-600">
                                    <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                                    Uploading images...
                                </p>
                            )}
                            {!user && (
                                <p className="text-center text-xs text-orange-500 mt-2">
                                    Sign in specifically to save your results to history.
                                </p>
                            )}
                        </div>

                        {/* Bottom Links */}
                        <div className="border-t border-gray-100 p-4 mt-4">
                            <div className="space-y-1">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                >
                                    <Images className="w-4 h-4" />
                                    My Gallery
                                </Link>
                                {user && (
                                    <Link
                                        href="/history"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                    >
                                        <History className="w-4 h-4" />
                                        Recent History
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
