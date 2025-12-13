'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Zap, Loader2, Trash2, Calendar } from 'lucide-react';
import { tryonApi, creditsApi, type TryOnResult, type CreditBalance } from '@/services/api';
import { useAuth } from '@/hooks';

interface GalleryTabProps {
    newResult?: TryOnResult | null;
}

export default function GalleryTab({ newResult }: GalleryTabProps) {
    const [history, setHistory] = useState<TryOnResult[]>([]);
    const [credits, setCredits] = useState<CreditBalance>({ remaining: 10, usedTotal: 0, plan: 'starter' });
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<TryOnResult | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { user } = useAuth() as { user: any }; // Type assertion to avoid conflicts if types aren't perfect

    useEffect(() => {
        async function loadData() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const [historyData, creditsData] = await Promise.all([
                    tryonApi.getHistory(20, 0),
                    creditsApi.getBalance().catch(() => ({ remaining: 10, usedTotal: 0, plan: 'starter' }))
                ]);

                setHistory(historyData.results);
                setCredits(creditsData);
            } catch (error) {
                console.error('Error loading gallery data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [user]);

    // Add new result to the top when it comes in
    useEffect(() => {
        if (newResult) {
            setHistory(prev => [newResult, ...prev]);
            // Also decrement credits locally
            setCredits(prev => ({ ...prev, remaining: Math.max(0, prev.remaining - 1) }));
        }
    }, [newResult]);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const result = await tryonApi.delete(id);
            if (result.success) {
                setHistory(prev => prev.filter(item => item.id !== id));
                if (selectedImage?.id === id) {
                    setSelectedImage(null);
                }
            }
        } catch (error) {
            console.error('Error deleting result:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const thisWeekCount = history.filter(item => {
        const createdAt = new Date(item.createdAt);
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return createdAt >= weekAgo;
    }).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

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
            {user && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-600">{history.length}</div>
                        <div className="text-xs text-purple-600/70 font-medium">Creations</div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                        <div className="text-2xl font-bold text-pink-600">{thisWeekCount}</div>
                        <div className="text-xs text-pink-600/70 font-medium">This Week</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                        <div className="text-2xl font-bold text-orange-600">{credits.remaining}</div>
                        <div className="text-xs text-orange-600/70 font-medium">Credits Left</div>
                    </div>
                </div>
            )}

            {/* Gallery Grid */}
            {history.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {history.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200 relative"
                            onClick={() => setSelectedImage(item)}
                        >
                            <Image
                                src={item.resultImageUrl}
                                alt={`Try-on result ${i + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-white/80 text-xs">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(item.id);
                                            }}
                                            disabled={deletingId === item.id}
                                            className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {deletingId === item.id ? (
                                                <Loader2 className="w-3 h-3 animate-spin text-white" />
                                            ) : (
                                                <Trash2 className="w-3 h-3 text-white" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <>
                    {/* Empty State Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
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
                        {user ? (
                            <>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to create?</h4>
                                <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                                    Use the panel on the left to upload your photo and items
                                </p>
                            </>
                        ) : (
                            <>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Sign in to save results</h4>
                                <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                                    Create an account to save your try-on history and access more features.
                                </p>
                                <a
                                    href="/login"
                                    className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all text-sm"
                                >
                                    Sign In
                                </a>
                            </>
                        )}
                    </div>
                </>
            )}

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
                    {/* Backdrop button */}
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/80 cursor-default"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close preview"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-2xl max-h-full z-10"
                    >
                        <Image
                            src={selectedImage.resultImageUrl}
                            alt="Full size preview"
                            width={600}
                            height={800}
                            className="rounded-xl object-contain"
                            unoptimized
                        />
                        <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            ✕
                        </button>
                        <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg px-3 py-2 text-white text-sm">
                            {selectedImage.processingTime}s processing time
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
