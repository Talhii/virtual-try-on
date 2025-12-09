'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Star, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { label: 'Active Users', value: '50K+', icon: Users },
  { label: 'Try-Ons Daily', value: '2M+', icon: Sparkles },
  { label: 'Accuracy Rate', value: '98%', icon: Zap },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 radial-gradient-1 pointer-events-none" />
      <div className="absolute inset-0 radial-gradient-2 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px] animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="tag">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Trusted by 500+ Fashion Brands</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-1 font-bold tracking-tight mb-6"
          >
            Transform Fashion with{' '}
            <span className="gradient-text">AI Virtual Try-On</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Upload any photo, choose any outfit, and watch our AI dress you in seconds.
            <span className="text-white/80"> Reduce returns by 70%</span> and
            <span className="text-white/80"> boost conversions by 40%</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link href="#try-on" className="btn-primary text-lg flex items-center justify-center gap-2 group">
              <Sparkles className="w-5 h-5" />
              Try It Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary text-lg flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-pink-500/30 to-cyan-500/30 blur-3xl scale-90 -z-10" />

            {/* Main Card */}
            <div className="glass rounded-3xl p-2 md:p-3 shadow-2xl shadow-black/50">
              <div className="bg-canvas-light rounded-2xl overflow-hidden">
                {/* Window Header */}
                <div className="h-12 bg-canvas-subtle flex items-center justify-between px-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm font-medium text-white/40">VTO Studio Pro</span>
                  <div className="w-16" />
                </div>

                {/* Try-On Preview */}
                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-6 items-center">
                    {/* Model */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-canvas-subtle group cursor-pointer">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                        alt="Model"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 glass rounded-full text-xs font-medium">
                        Your Photo
                      </div>
                    </div>

                    {/* Plus Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>

                    {/* Garment */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-canvas-subtle group cursor-pointer">
                      <Image
                        src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop"
                        alt="Garment"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 glass rounded-full text-xs font-medium">
                        Any Outfit
                      </div>
                    </div>

                    {/* Equals Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="9" x2="19" y2="9" />
                        <line x1="5" y1="15" x2="19" y2="15" />
                      </svg>
                    </div>

                    {/* Result */}
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer gradient-border">
                      <Image
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
                        alt="Result"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          AI Result
                        </div>
                        <span className="text-xs text-white/60">0.8s</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/60">98% Accuracy</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-white/60">&lt; 1s Generation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <span className="text-white/60">Identity Preserved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
