'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
    { name: 'Vogue', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Vogue_logo.svg' },
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Zara', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg' },
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
    { name: 'Gucci', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/79/1960s_Gucci_Logo.svg' },
    { name: 'Prada', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Prada-Logo.svg' },
];

export default function BrandLogos() {
    return (
        <section className="py-16 relative overflow-hidden border-t border-white/5">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm text-white/40 uppercase tracking-widest font-medium">
                        Trusted by leading fashion brands worldwide
                    </p>
                </motion.div>

                {/* Infinite Scroll Animation */}
                <div className="relative">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex gap-16 items-center justify-center flex-wrap"
                    >
                        {/* Placeholder brand names since external SVGs might not load */}
                        {['VOGUE', 'NIKE', 'ZARA', 'H&M', 'GUCCI', 'PRADA', 'DIOR', 'CHANEL'].map((brand, i) => (
                            <div
                                key={i}
                                className="text-2xl font-bold text-white/20 hover:text-white/40 transition-colors cursor-pointer"
                                style={{ fontFamily: 'serif', letterSpacing: '0.2em' }}
                            >
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
