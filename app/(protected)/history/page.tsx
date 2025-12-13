'use client';

import { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Clock, Download, Trash2, Eye, Search, Filter, Calendar, Loader2, X } from 'lucide-react';
import { Badge } from '@/components/ui';
import { tryonApi, type TryOnResult } from '@/services/api';

// HistoryItem is the same as TryOnResult
type HistoryItem = TryOnResult;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
}

function getCategoryFromSettings(settings?: HistoryItem['settings']): string {
    if (settings?.highResolution) return 'High-Res';
    return 'Clothing';
}

export default function HistoryPage() {
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function loadHistory() {
            try {
                const { results } = await tryonApi.getHistory(50, 0);
                setHistoryItems(results as HistoryItem[]);
            } catch (error) {
                console.error('Error loading history:', error);
            } finally {
                setLoading(false);
            }
        }
        loadHistory();
    }, []);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const result = await tryonApi.delete(id);
            if (result.success) {
                setHistoryItems(prev => prev.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const handleClearAll = () => {
        if (!confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            return;
        }
        startTransition(async () => {
            try {
                // Delete all items one by one
                await Promise.all(historyItems.map(item => tryonApi.delete(item.id)));
                setHistoryItems([]);
            } catch (error) {
                console.error('Error clearing history:', error);
            }
        });
    };

    const handleDownload = async (item: HistoryItem) => {
        try {
            const response = await fetch(item.resultImageUrl);
            const blob = await response.blob();
            const url = globalThis.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tryon-${item.id}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            globalThis.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const filteredItems = historyItems.filter(item => {
        if (!searchQuery) return true;
        const category = getCategoryFromSettings(item.settings);
        return category.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (loading) {
        return (
            <div className="pt-4 pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                    </div>
                </div>
            </div>
        );
    }

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
                            <button
                                onClick={handleClearAll}
                                disabled={isPending || historyItems.length === 0}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                            >
                                {isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <Filter className="w-5 h-5" />
                        Filter by Type
                    </button>
                </motion.div>

                {/* History List */}
                {filteredItems.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden relative">
                                        <Image
                                            src={item.resultImageUrl}
                                            alt="Try-on result"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">Virtual Try-On</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <Badge className="text-xs">{getCategoryFromSettings(item.settings)}</Badge>
                                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                {formatDate(item.createdAt)}
                                            </span>
                                            {item.processingTime > 0 && (
                                                <span className="text-xs text-gray-400">
                                                    {item.processingTime.toFixed(1)}s
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <Eye className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(item)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deletingId === item.id}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deletingId === item.id ? (
                                                <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                                            ) : (
                                                <Trash2 className="w-5 h-5 text-red-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center py-16"
                    >
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HistoryIcon className="w-8 h-8 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No history yet</h3>
                        <p className="text-gray-500">Your virtual try-on results will appear here</p>
                    </motion.div>
                )}

                {/* Image Preview Modal */}
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
                        <button
                            type="button"
                            className="absolute inset-0 bg-black/80 cursor-default"
                            onClick={() => setSelectedItem(null)}
                            aria-label="Close preview"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative max-w-4xl w-full z-10 bg-white rounded-2xl overflow-hidden"
                        >
                            <div className="grid md:grid-cols-3 gap-4 p-6">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-gray-500 uppercase">Model</p>
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                                        <Image
                                            src={selectedItem.modelImageUrl || '/placeholder.jpg'}
                                            alt="Model"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-gray-500 uppercase">Garment</p>
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                                        <Image
                                            src={selectedItem.garmentImageUrl || '/placeholder.jpg'}
                                            alt="Garment"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-gray-500 uppercase">Result</p>
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-2 ring-purple-500">
                                        <Image
                                            src={selectedItem.resultImageUrl}
                                            alt="Result"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Created {formatDate(selectedItem.createdAt)} • {selectedItem.processingTime.toFixed(1)}s processing
                                </div>
                                <button
                                    onClick={() => handleDownload(selectedItem)}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Result
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
