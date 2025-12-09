'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Shirt, Sparkles, User, Wand2, Image as ImageIcon,
  Download, Trash2, RefreshCw, ZoomIn, Loader2, Check,
  ChevronLeft, ChevronRight, Settings, Sliders
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
  const [settings, setSettings] = useState({
    preserveIdentity: true,
    highResolution: false,
    creativity: 0.7,
  });

  const handleGenerate = useCallback(() => {
    if (!selectedModel || !selectedGarment) return;

    setIsGenerating(true);
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      // Use a sample result image
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
    <section id="try-on" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="tag mb-6 inline-flex">
            <Wand2 className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-display-3 font-bold mb-6">
            Try <span className="gradient-text">VTO Studio</span> Now
          </h2>
          <p className="text-lg text-white/60">
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
          <div className="glass rounded-3xl overflow-hidden">
            {/* Editor Header */}
            <div className="h-14 bg-canvas-subtle flex items-center justify-between px-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-white/40">
                <Sparkles className="w-4 h-4" />
                VTO Studio Pro
              </div>
              <button onClick={handleReset} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr_280px]">
              {/* Left Panel - Model Selection */}
              <div className="p-6 border-r border-white/5 bg-canvas-subtle/50">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Select Model
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {sampleModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden group transition-all duration-300 ${selectedModel?.id === model.id
                          ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-canvas'
                          : 'hover:ring-1 hover:ring-white/20'
                        }`}
                    >
                      <Image src={model.src} alt={model.label} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {selectedModel?.id === model.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Custom
                  </button>
                </div>
              </div>

              {/* Center - Preview Canvas */}
              <div className="bg-canvas relative flex flex-col items-center justify-center p-8 min-h-[600px]">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative z-10 w-full max-w-sm"
                    >
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl gradient-border glow-accent">
                        <Image src={result} alt="Result" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div className="px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-sm font-bold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            AI Generated
                          </div>
                          <button className="p-2 glass rounded-full hover:bg-white/20 transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-center text-sm text-white/40 mt-4">Generated in 0.8 seconds</p>
                    </motion.div>
                  ) : isGenerating ? (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-6 relative z-10"
                    >
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 animate-spin-slow opacity-30 blur-xl" />
                        <div className="absolute inset-2 rounded-full bg-canvas flex items-center justify-center">
                          <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium mb-1">AI Processing</p>
                        <p className="text-sm text-white/40">Blending garment with model...</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-6 relative z-10"
                    >
                      {/* Model Preview */}
                      <div className={`w-48 aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${selectedModel ? 'shadow-xl' : 'border-2 border-dashed border-white/20'
                        }`}>
                        {selectedModel ? (
                          <div className="relative w-full h-full">
                            <Image src={selectedModel.src} alt="Model" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                            <User className="w-12 h-12 mb-2" />
                            <span className="text-sm">Select Model</span>
                          </div>
                        )}
                      </div>

                      {/* Plus Icon */}
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>

                      {/* Garment Preview */}
                      <div className={`w-48 aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${selectedGarment ? 'shadow-xl' : 'border-2 border-dashed border-white/20'
                        }`}>
                        {selectedGarment ? (
                          <div className="relative w-full h-full">
                            <Image src={selectedGarment.src} alt="Garment" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                            <Shirt className="w-12 h-12 mb-2" />
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
                    className={`absolute bottom-8 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 ${selectedModel && selectedGarment
                        ? 'btn-primary shadow-lg shadow-violet-500/30'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                      }`}
                  >
                    <Wand2 className="w-5 h-5" />
                    Generate Try-On
                  </motion.button>
                )}
              </div>

              {/* Right Panel - Garment Selection */}
              <div className="p-6 border-l border-white/5 bg-canvas-subtle/50">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shirt className="w-4 h-4" />
                  Select Garment
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {sampleGarments.map((garment) => (
                    <button
                      key={garment.id}
                      onClick={() => setSelectedGarment(garment)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden group transition-all duration-300 ${selectedGarment?.id === garment.id
                          ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-canvas'
                          : 'hover:ring-1 hover:ring-white/20'
                        }`}
                    >
                      <Image src={garment.src} alt={garment.label} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-xs font-medium">{garment.label}</span>
                      {selectedGarment?.id === garment.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Settings */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">Preserve Identity</span>
                      <button
                        onClick={() => setSettings(s => ({ ...s, preserveIdentity: !s.preserveIdentity }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${settings.preserveIdentity ? 'bg-violet-500' : 'bg-white/20'
                          }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${settings.preserveIdentity ? 'left-5' : 'left-0.5'
                          }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">High Resolution</span>
                      <button
                        onClick={() => setSettings(s => ({ ...s, highResolution: !s.highResolution }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${settings.highResolution ? 'bg-violet-500' : 'bg-white/20'
                          }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${settings.highResolution ? 'left-5' : 'left-0.5'
                          }`} />
                      </button>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Creativity</span>
                        <span className="text-white/40">{settings.creativity.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.creativity}
                        onChange={(e) => setSettings(s => ({ ...s, creativity: parseFloat(e.target.value) }))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credits Info */}
          <div className="mt-6 text-center text-sm text-white/40">
            <span className="text-white/60 font-medium">Free tier:</span> 10 try-ons remaining •
            <a href="#pricing" className="text-violet-400 hover:text-violet-300 ml-1">Upgrade for unlimited</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
