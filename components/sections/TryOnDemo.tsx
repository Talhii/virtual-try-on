'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Shirt, Sparkles, User, Wand2,
  Download, RefreshCw, Loader2, Check
} from 'lucide-react';
import Image from 'next/image';

const sampleModels = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', label: 'Model 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', label: 'Model 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', label: 'Model 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', label: 'Model 4' },
];

const sampleGarments = [
  { id: 1, src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop', label: 'Dress' },
  { id: 2, src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop', label: 'Jacket' },
  { id: 3, src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400&auto=format&fit=crop', label: 'T-Shirt' },
  { id: 4, src: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=400&auto=format&fit=crop', label: 'Sweater' },
  { id: 5, src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop', label: 'Coat' },
  { id: 6, src: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop', label: 'Blouse' },
];

export default function TryOnDemo() {
  const [selectedModel, setSelectedModel] = useState<typeof sampleModels[0] | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<typeof sampleGarments[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    if (!selectedModel || !selectedGarment) return;

    setIsGenerating(true);
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      setResult('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop');
      setIsGenerating(false);
    }, 2000);
  }, [selectedModel, selectedGarment]);

  const handleReset = () => {
    setSelectedModel(null);
    setSelectedGarment(null);
    setResult(null);
  };

  return (
    <section id="try-on" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Try It Now
          </h2>
          <p className="text-lg text-gray-600">
            Experience the power of AI virtual try-on. Select a model and garment to see the magic happen.
          </p>
        </motion.div>

        {/* Main Editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Editor Header */}
            <div className="h-14 bg-gray-50 flex items-center justify-between px-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">VTO Studio</span>
              </div>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr_280px]">
              {/* Left Panel - Model Selection */}
              <div className="p-6 border-r border-gray-100 bg-gray-50/50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Select Model
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {sampleModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden group transition-all duration-300 ${selectedModel?.id === model.id
                        ? 'ring-2 ring-blue-500 ring-offset-2'
                        : 'hover:ring-2 hover:ring-gray-300'
                        }`}
                    >
                      <Image src={model.src} alt={model.label} fill className="object-cover" />
                      {selectedModel?.id === model.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Custom
                  </button>
                </div>
              </div>

              {/* Center - Preview Canvas */}
              <div className="bg-white relative flex flex-col items-center justify-center p-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10 w-full max-w-sm"
                    >
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                        <Image src={result} alt="Result" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            AI Generated
                          </div>
                          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                            <Download className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-4">Generated in ~1 second</p>
                    </motion.div>
                  )}
                  {!result && isGenerating && (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-6 relative z-10"
                    >
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                        <div className="absolute inset-0 rounded-full bg-gray-100 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-900 mb-1">AI Processing</p>
                        <p className="text-sm text-gray-500">Generating your try-on result...</p>
                      </div>
                    </motion.div>
                  )}
                  {!result && !isGenerating && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-6 relative z-10"
                    >
                      {/* Model Preview */}
                      <div className={`w-40 aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${selectedModel ? 'shadow-lg border border-gray-200' : 'border-2 border-dashed border-gray-300'
                        }`}>
                        {selectedModel ? (
                          <div className="relative w-full h-full">
                            <Image src={selectedModel.src} alt="Model" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                            <User className="w-10 h-10 mb-2" />
                            <span className="text-sm">Select Model</span>
                          </div>
                        )}
                      </div>

                      {/* Plus Icon */}
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>

                      {/* Garment Preview */}
                      <div className={`w-40 aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 ${selectedGarment ? 'shadow-lg border border-gray-200' : 'border-2 border-dashed border-gray-300'
                        }`}>
                        {selectedGarment ? (
                          <div className="relative w-full h-full">
                            <Image src={selectedGarment.src} alt="Garment" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                            <Shirt className="w-10 h-10 mb-2" />
                            <span className="text-sm">Select Garment</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Generate Button */}
                {!result && !isGenerating && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleGenerate}
                    disabled={!selectedModel || !selectedGarment}
                    className={`absolute bottom-6 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 ${selectedModel && selectedGarment
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    <Wand2 className="w-5 h-5" />
                    Generate Try-On
                  </motion.button>
                )}
              </div>

              {/* Right Panel - Garment Selection */}
              <div className="p-6 border-l border-gray-100 bg-gray-50/50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shirt className="w-4 h-4" />
                  Select Garment
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {sampleGarments.map((garment) => (
                    <button
                      key={garment.id}
                      onClick={() => setSelectedGarment(garment)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden group transition-all duration-300 ${selectedGarment?.id === garment.id
                        ? 'ring-2 ring-purple-500 ring-offset-2'
                        : 'hover:ring-2 hover:ring-gray-300'
                        }`}
                    >
                      <Image src={garment.src} alt={garment.label} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-xs font-medium text-white">{garment.label}</span>
                      {selectedGarment?.id === garment.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Credits Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <span className="text-gray-700 font-medium">Free tier:</span>{' '}
            10 try-ons remaining •{' '}
            <a href="#pricing" className="text-blue-500 hover:text-blue-600">Upgrade for unlimited</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
