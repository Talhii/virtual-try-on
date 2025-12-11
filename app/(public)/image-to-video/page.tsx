'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';

import VideoSidebar from './_components/VideoSidebar';
import VideoGallery from './_components/VideoGallery';
import VideoExamples from './_components/VideoExamples';

const tabs = [
    { id: 'videos', label: 'My videos' },
    { id: 'examples', label: 'Examples' },
];

export default function ImageToVideoPage() {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [selectedStyle, setSelectedStyle] = React.useState('natural');
    const [selectedDuration, setSelectedDuration] = React.useState('4s');
    const [activeTab, setActiveTab] = React.useState('videos');
    const [modelImage, setModelImage] = React.useState<string | null>(null);
    const [itemImage, setItemImage] = React.useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-20">
            {/* Main Content Area */}
            <div className="flex h-[calc(100vh-80px)]">
                {/* Left Sidebar */}
                <VideoSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    selectedStyle={selectedStyle}
                    setSelectedStyle={setSelectedStyle}
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                    modelImage={modelImage}
                    setModelImage={setModelImage}
                    itemImage={itemImage}
                    setItemImage={setItemImage}
                />

                {/* Show sidebar toggle when sidebar is closed */}
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="hidden lg:flex fixed left-4 top-24 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors z-40 shadow-sm"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                )}

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Tabs */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab.id
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'videos' && <VideoGallery />}
                        {activeTab === 'examples' && <VideoExamples />}
                    </div>

                    {/* Simple Footer */}
                    <div className="border-t border-gray-100 px-6 py-3 bg-white">
                        <p className="text-xs text-gray-400 text-center">
                            Video generation takes 30-60 seconds • Powered by AI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
