'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Image as ImageIcon,
  Upload,
  Play,
  ArrowUp,
  ArrowDown,
  Plus,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Zap,
  Images,
  History,
  BookOpen,
  Menu,
} from 'lucide-react';

const aiHelperOptions = [
  { id: 'ai-helper', label: 'AI helper' },
  { id: 'clothes', label: 'Try on clothes' },
  { id: 'shoes', label: 'Try on shoes' },
  { id: 'jewelry', label: 'Try on jewelry' },
  { id: 'bag', label: 'Try on bag' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'swap-model', label: 'Swap model' },
  { id: 'insert-logo', label: 'Insert logo' },
  { id: 'background', label: 'Background' },
  { id: 'create-model', label: 'Create a model' },
  { id: 'expand-image', label: 'Expand image' },
  { id: 'turn-into-video', label: 'Turn into video' },
  { id: 'convert-hd', label: 'Convert to HD' },
];

const tryOnModes = [
  { id: 'text', label: 'Text' },
  { id: 'photo', label: 'Photo' },
];

const aiModes = [
  { id: 'standard', label: 'Standard AI' },
  { id: 'last-gen', label: 'Last Generation AI' },
];

const tabs = [
  { id: 'gallery', label: 'My gallery' },
  { id: 'upload', label: 'Upload' },
  { id: 'info', label: 'Info' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [selectedHelper, setSelectedHelper] = React.useState('clothes');
  const [modeExpanded, setModeExpanded] = React.useState(true);
  const [modelSectionExpanded, setModelSectionExpanded] = React.useState(true);
  const [selectedTryOnMode, setSelectedTryOnMode] = React.useState('photo');
  const [selectedAiMode, setSelectedAiMode] = React.useState('standard');
  const [activeTab, setActiveTab] = React.useState('gallery');
  const [additionalInfo, setAdditionalInfo] = React.useState('');
  const [modelImage, setModelImage] = React.useState<string | null>(null);
  const [itemImage, setItemImage] = React.useState<string | null>(null);
  const [item2Image, setItem2Image] = React.useState<string | null>(null);

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

  const handleItem2Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setItem2Image(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Combined Left Sidebar - Sticky */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block h-full bg-white border-r border-gray-200 overflow-hidden flex-shrink-0 sticky top-20"
            >
              <div className="w-[300px] h-full overflow-y-auto p-4 space-y-4">
                {/* Sidebar Toggle */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>

                {/* Collection Section */}
                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Collection : My gallery (all)</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Mode Selection Section */}
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setModeExpanded(!modeExpanded)}
                    className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-900">Mode : AI Virtual try on clothes</span>
                    </div>
                    {modeExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {modeExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 pt-0 flex flex-wrap gap-1">
                          {aiHelperOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSelectedHelper(option.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedHelper === option.id
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Model & Items Section */}
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setModelSectionExpanded(!modelSectionExpanded)}
                    className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">Model & item(s) to try on</span>
                      <span className="text-xs text-purple-600 underline cursor-pointer">help</span>
                      <BookOpen className="w-3 h-3 text-gray-400" />
                    </div>
                    {modelSectionExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {modelSectionExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 pt-0 space-y-4">
                          {/* Model Upload */}
                          <div className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-gray-300 transition-colors bg-white">
                            <input
                              type="file"
                              id="model-upload"
                              accept="image/*"
                              onChange={handleModelUpload}
                              className="hidden"
                            />
                            <label htmlFor="model-upload" className="cursor-pointer block">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                  <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Upload human model</span>
                              </div>
                              {modelImage && (
                                <div className="mt-3 relative w-full h-24">
                                  <Image src={modelImage} alt="Model" fill className="object-cover rounded-lg" unoptimized />
                                </div>
                              )}
                            </label>
                          </div>
                          <div className="flex items-center gap-2 justify-center text-xs">
                            <button className="text-purple-600 hover:underline">Model templates</button>
                            <span className="text-gray-400">or</span>
                            <button className="text-purple-600 hover:underline">Create a model</button>
                          </div>

                          {/* Try on with */}
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-700">Try on with</span>
                            <div className="flex rounded-full border border-gray-200 p-1 bg-white">
                              {tryOnModes.map((mode) => (
                                <button
                                  key={mode.id}
                                  onClick={() => setSelectedTryOnMode(mode.id)}
                                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all ${selectedTryOnMode === mode.id
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                  {mode.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Item Upload */}
                          <div className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-gray-300 transition-colors bg-white">
                            <input
                              type="file"
                              id="item-upload"
                              accept="image/*"
                              onChange={handleItemUpload}
                              className="hidden"
                            />
                            <label htmlFor="item-upload" className="cursor-pointer block">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Upload item to wear</span>
                              </div>
                              {itemImage && (
                                <div className="mt-3 relative w-full h-24">
                                  <Image src={itemImage} alt="Item" fill className="object-cover rounded-lg" unoptimized />
                                </div>
                              )}
                            </label>
                          </div>
                          <div className="text-center">
                            <button className="text-xs text-purple-600 hover:underline">Item templates</button>
                          </div>

                          {/* Item 2 Upload (Optional) */}
                          <div className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-gray-300 transition-colors bg-white">
                            <input
                              type="file"
                              id="item2-upload"
                              accept="image/*"
                              onChange={handleItem2Upload}
                              className="hidden"
                            />
                            <label htmlFor="item2-upload" className="cursor-pointer block">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <span className="text-sm font-medium text-gray-500">Item 2 (optional)</span>
                              </div>
                              {item2Image && (
                                <div className="mt-3 relative w-full h-24">
                                  <Image src={item2Image} alt="Item 2" fill className="object-cover rounded-lg" unoptimized />
                                </div>
                              )}
                            </label>
                          </div>

                          {/* Additional Info */}
                          <div className="space-y-2">
                            <label htmlFor="additional-info" className="text-sm font-medium text-gray-700">
                              Additional info (optional)
                            </label>
                            <textarea
                              id="additional-info"
                              value={additionalInfo}
                              onChange={(e) => setAdditionalInfo(e.target.value)}
                              placeholder="Respect clothing details"
                              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
                              rows={2}
                            />
                          </div>

                          {/* AI Mode Selection */}
                          <div className="flex rounded-lg border-2 border-purple-500 overflow-hidden">
                            {aiModes.map((mode) => (
                              <button
                                key={mode.id}
                                onClick={() => setSelectedAiMode(mode.id)}
                                className={`flex-1 py-2.5 px-2 text-xs font-medium transition-all ${selectedAiMode === mode.id
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                                  }`}
                              >
                                {mode.label}
                              </button>
                            ))}
                          </div>

                          {/* Generate Button */}
                          <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm">
                            <Plus className="w-4 h-4" />
                            Add model and item above
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Actions */}
                <div className="space-y-1 pt-2">
                  <Link
                    href="/dashboard/gallery"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                  >
                    <Images className="w-4 h-4" />
                    My Gallery
                  </Link>
                  <Link
                    href="/dashboard/history"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                  >
                    <History className="w-4 h-4" />
                    Recent History
                  </Link>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

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
            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Virtual Try On Clothes</h2>

                {/* Video Tutorial Section */}
                <div className="mb-8">
                  <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video max-w-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <span className="text-red-500 font-bold">8</span>{' '}
                      Virtual Try on 2 items with AI - AI ...
                    </div>
                  </div>
                  <button className="mt-4 text-sm text-gray-600 flex items-center gap-2 hover:text-gray-900 transition-colors">
                    All tutorials <Play className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    Virtual try-on clothes with AI{' '}
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-normal">
                      <Play className="w-3 h-3" />
                      <span>1min28</span>
                    </span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-4xl">
                    Try on outfits and change your look instantly with our AI virtual try-on. Change your clothes with AI, like a dress or a jacket in few seconds. Simply upload a photo of yourself and a photo of a new item, and our virtual try on will automatically dress you in seconds. Discover the ultimate AI try-on platform and explore new fashion styles in seconds.
                  </p>
                </div>

                {/* Sample Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your first image above</h3>
                  <p className="text-gray-500 text-sm">Drop your images or click to browse</p>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use Virtual Try-On</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">1. Upload a model photo</h4>
                    <p className="text-gray-600 text-sm">Choose a clear photo of yourself or a model</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">2. Upload an item to try on</h4>
                    <p className="text-gray-600 text-sm">Select the clothing or accessory you want to see</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">3. Generate the result</h4>
                    <p className="text-gray-600 text-sm">Click generate and see the magic happen in seconds</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowUp className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Load more...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
