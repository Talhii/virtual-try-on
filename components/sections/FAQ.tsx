'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    category: 'General',
    questions: [
      {
        question: "What is VTO Studio?",
        answer: "VTO Studio is an AI-powered virtual try-on platform that allows you to visualize how any clothing item looks on any person. Simply upload a photo of a person and a garment, and our AI will generate a photorealistic image of them wearing that outfit in under a second."
      },
      {
        question: "How accurate is the virtual try-on?",
        answer: "Our AI achieves a 98% accuracy rate in fit, fabric drape, and lighting simulation. We use advanced physics engines combined with generative AI to ensure clothing behaves realistically on any body type. The technology has been trained on millions of fashion images to understand fabric properties and body mechanics."
      },
      {
        question: "Do I need professional photos?",
        answer: "No! While higher quality inputs yield better results, our AI works great with standard smartphone photos. Just ensure good lighting, a clear view of the subject, and minimal occlusion (nothing blocking the body). We recommend a resolution of at least 720p for best results."
      },
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        question: "Is there an API available?",
        answer: "Yes! We offer a comprehensive REST API for Business and Enterprise customers who want to integrate VTO technology directly into their applications, websites, or workflows. The API supports batch processing, webhooks, and comes with detailed documentation and SDKs for popular programming languages."
      },
      {
        question: "What file formats are supported?",
        answer: "We support all major image formats including JPEG, PNG, WebP, and HEIC. For output, you can choose between JPEG (optimized for web), PNG (with transparency support), or WebP (best compression). Maximum input size is 20MB per image."
      },
      {
        question: "How long does processing take?",
        answer: "Most try-ons complete in under 1 second. Complex images with intricate patterns or unusual poses may take up to 3 seconds. Batch processing via API typically processes 100 images per minute. We offer priority processing for Pro and higher plans."
      },
    ]
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        question: "What happens to my uploaded photos?",
        answer: "We take privacy seriously. Your photos are processed securely using end-to-end encryption and are automatically deleted from our servers within 24 hours unless you choose to save them to your private gallery. We are SOC 2 Type II certified and GDPR compliant."
      },
      {
        question: "Are my images used for AI training?",
        answer: "No, absolutely not. Your uploaded images are never used to train our AI models. We have strict data policies that prohibit the use of customer data for model training. Your content remains your property at all times."
      },
    ]
  },
  {
    category: 'Billing',
    questions: [
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No cancellation fees or penalties apply. Unused credits do not roll over but remain available until your subscription ends."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe. We also offer invoicing for annual Business and Enterprise plans."
      },
    ]
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>(['General-0']);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="tag mb-6 inline-flex">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-display-3 font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to know about VTO Studio. Can't find the answer?
            <a href="#contact" className="text-violet-400 hover:text-violet-300 ml-1">Contact us</a>.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {FAQS.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-8"
            >
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">
                {category.category}
              </h3>

              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const itemId = `${category.category}-${qIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div
                      key={qIndex}
                      className="card overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="font-semibold pr-4">{faq.question}</span>
                        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-violet-500/20' : ''}`}>
                          {isOpen ? (
                            <Minus className="w-4 h-4 text-violet-400" />
                          ) : (
                            <Plus className="w-4 h-4 text-white/40" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-5 pb-5 text-white/60 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
