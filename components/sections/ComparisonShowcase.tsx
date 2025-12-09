'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const EXAMPLES = [
  {
    id: 1,
    title: "Elegant Evening Wear",
    description: "Transform casual photos into stunning gala-ready looks with perfect fabric draping.",
    prompt: "Apply elegant evening dress with natural body-conforming drape",
    model: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    garment: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
    result: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    description: "Try on the latest oversized collections and streetwear trends instantly.",
    prompt: "Apply casual streetwear jacket maintaining original pose",
    model: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    garment: "https://images.unsplash.com/photo-1551488852-0801751acbe3?q=80&w=800&auto=format&fit=crop",
    result: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Summer Collection",
    description: "Visualize swimwear and summer dresses with perfect fit and lighting.",
    prompt: "Apply summer dress with natural lighting adjustments",
    model: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    garment: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    result: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Professional Attire",
    description: "See how business wear looks before making purchasing decisions.",
    prompt: "Apply professional blazer with color matching",
    model: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    garment: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    result: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ComparisonShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBefore, setShowBefore] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % EXAMPLES.length);
    setShowBefore(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + EXAMPLES.length) % EXAMPLES.length);
    setShowBefore(false);
  };

  const current = EXAMPLES[currentIndex];

  return (
    <section id="showcase" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12"
        >
          <div>
            <div className="tag mb-6">
              <Sparkles className="w-4 h-4" />
              Real Examples
            </div>
            <h2 className="text-display-3 font-bold mb-4">
              See What <span className="gradient-text">VTO Can Do</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl">
              Browse through real transformations created by our AI. Each result is generated in under a second.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm font-medium">
              {currentIndex + 1} / {EXAMPLES.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-0"
            >
              {/* Left Side - Inputs */}
              <div className="p-8 lg:p-12 bg-canvas-subtle/50 border-r border-white/5">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-6">Input Images</h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Model */}
                  <div>
                    <span className="text-sm text-white/40 mb-2 block">Model Photo</span>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-canvas">
                      <Image
                        src={current.model}
                        alt="Model"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Garment */}
                  <div>
                    <span className="text-sm text-white/40 mb-2 block">Garment</span>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-canvas">
                      <Image
                        src={current.garment}
                        alt="Garment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Prompt Used */}
                <div className="p-4 rounded-xl bg-canvas/50 border border-white/5">
                  <span className="text-xs text-white/40 uppercase tracking-wider block mb-2">Prompt Used</span>
                  <p className="text-sm text-white/80 italic">"{current.prompt}"</p>
                </div>
              </div>

              {/* Right Side - Result */}
              <div className="p-8 lg:p-12 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">AI Result</h3>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-full border border-violet-500/30">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    <span className="text-xs font-bold text-violet-300">Generated in 0.8s</span>
                  </div>
                </div>

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden flex-grow gradient-border glow-accent">
                  <Image
                    src={current.result}
                    alt="Result"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl font-bold mb-2">{current.title}</h4>
                    <p className="text-white/60 text-sm mb-4">{current.description}</p>
                    <button className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2">
                      Try This Style
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Thumbnail Navigation */}
        <div className="mt-8 flex justify-center gap-3">
          {EXAMPLES.map((example, i) => (
            <button
              key={example.id}
              onClick={() => setCurrentIndex(i)}
              className={`relative w-20 h-12 rounded-lg overflow-hidden transition-all duration-300 ${i === currentIndex
                  ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-canvas scale-110'
                  : 'opacity-50 hover:opacity-80'
                }`}
            >
              <Image src={example.result} alt={example.title} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
