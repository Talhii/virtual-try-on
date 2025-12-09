'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, Twitter, Verified } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    user: {
      name: 'Sarah Jenkins',
      role: 'Creative Director @ LUXE Fashion',
      handle: '@sarahstyle',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
    content: "VTO Studio has completely transformed our e-commerce workflow. We cut our photoshoot budget by 80% and the AI-generated results are indistinguishable from real photography. Our returns dropped by 60% in the first quarter!",
    rating: 5,
    metric: { label: 'Return Rate Reduction', value: '60%' },
  },
  {
    id: 2,
    user: {
      name: 'Alex Chen',
      role: 'Founder @ StreetStyle Co',
      handle: '@alexc_design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
    content: "Finally, a try-on tool that actually respects fabric physics! The drape and lighting matching is next level. My clients are loving the instant previews and our conversion rates have doubled.",
    rating: 5,
    metric: { label: 'Conversion Increase', value: '2x' },
  },
  {
    id: 3,
    user: {
      name: 'Emma Rodriguez',
      role: 'E-commerce Manager @ Vogue Retail',
      handle: '@emmar_retail',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
    content: "We integrated the VTO API into our Shopify store last month. The results have been phenomenal - customers spend 40% more time on product pages and our add-to-cart rate increased by 35%.",
    rating: 5,
    metric: { label: 'Time on Page', value: '+40%' },
  },
  {
    id: 4,
    user: {
      name: 'Marcus Thompson',
      role: 'CTO @ FashionTech Inc',
      handle: '@marcus_dev',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      verified: false,
    },
    content: "The API documentation is excellent and integration took less than a day. The consistency is what sold me - same model, 50 different outfits, zero hallucinations. Production-ready from day one.",
    rating: 5,
    metric: { label: 'Integration Time', value: '<1 day' },
  },
  {
    id: 5,
    user: {
      name: 'Lisa Park',
      role: 'Product Lead @ ModernWear',
      handle: '@lisap_fashion',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
    content: "We've tried every virtual try-on solution on the market. VTO Studio is in a completely different league - the speed, accuracy, and identity preservation are unmatched. Worth every penny.",
    rating: 5,
    metric: { label: 'Accuracy Rate', value: '98%' },
  },
  {
    id: 6,
    user: {
      name: 'David Kim',
      role: 'Head of Digital @ Seoul Style',
      handle: '@davidk_seoul',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
    content: "The batch processing feature is a game-changer for our catalog. We processed 500 products in under an hour. The ROI was positive within the first week of implementation.",
    rating: 5,
    metric: { label: 'Products Processed', value: '500/hr' },
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden bg-canvas-light/30">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="tag mb-6 inline-flex">
            <Star className="w-4 h-4 text-yellow-400" />
            Trusted by 500+ Brands
          </div>
          <h2 className="text-display-3 font-bold mb-6">
            Loved by <span className="gradient-text">Fashion Leaders</span>
          </h2>
          <p className="text-lg text-white/60">
            See what industry professionals are saying about VTO Studio.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="card p-6 hover:border-white/10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                      <Image
                        src={testimonial.user.image}
                        alt={testimonial.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{testimonial.user.name}</span>
                        {testimonial.user.verified && (
                          <Verified className="w-4 h-4 text-violet-400" />
                        )}
                      </div>
                      <div className="text-sm text-white/40">{testimonial.user.role}</div>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-white/10" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>

                {/* Metric */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-white/40">{testimonial.metric.label}</span>
                  <span className="text-lg font-bold gradient-text">{testimonial.metric.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-sm text-white/50">Fashion Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">2M+</div>
              <div className="text-sm text-white/50">Try-Ons Daily</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">98%</div>
              <div className="text-sm text-white/50">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">4.9/5</div>
              <div className="text-sm text-white/50">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
