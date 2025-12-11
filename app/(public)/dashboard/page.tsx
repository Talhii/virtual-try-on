'use client';

import * as React from 'react';
import { Menu, Upload } from 'lucide-react';

import DashboardSidebar from './_components/DashboardSidebar';
import GalleryTab from './_components/GalleryTab';
import UploadTab from './_components/UploadTab';
import InfoTab from './_components/InfoTab';

const tabs = [
  { id: 'gallery', label: 'My gallery' },
  { id: 'upload', label: 'Upload' },
  { id: 'info', label: 'Info' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [selectedHelper, setSelectedHelper] = React.useState('clothes');
  const [selectedAiMode, setSelectedAiMode] = React.useState('standard');
  const [activeTab, setActiveTab] = React.useState('gallery');
  const [additionalInfo, setAdditionalInfo] = React.useState('');
  const [modelImage, setModelImage] = React.useState<string | null>(null);
  const [itemImage, setItemImage] = React.useState<string | null>(null);
  const [item2Image, setItem2Image] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedHelper={selectedHelper}
          setSelectedHelper={setSelectedHelper}
          modelImage={modelImage}
          setModelImage={setModelImage}
          itemImage={itemImage}
          setItemImage={setItemImage}
          item2Image={item2Image}
          setItem2Image={setItem2Image}
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
          selectedAiMode={selectedAiMode}
          setSelectedAiMode={setSelectedAiMode}
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

        {/* Main Content Area - Independent Scroll */}
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
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'upload' && <UploadTab />}
            {activeTab === 'info' && <InfoTab />}
          </div>

          {/* Simple Footer */}
          <div className="border-t border-gray-100 px-6 py-3 bg-white">
            <p className="text-xs text-gray-400 text-center">
              Powered by AI • Results may vary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
