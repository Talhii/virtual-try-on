'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "What is VTO Studio?",
    answer: "VTO Studio is an AI-powered virtual try-on platform that allows you to visualize how any clothing item looks on any person. Simply upload a photo of a person and a garment, and our AI will generate a photorealistic image of them wearing that outfit in under a second."
  },
  {
    question: "How accurate is the virtual try-on?",
    answer: "Our AI achieves a 98% accuracy rate in fit, fabric drape, and lighting simulation. We use advanced physics engines combined with generative AI to ensure clothing behaves realistically on any body type."
  },
  {
    question: "Do I need professional photos?",
    answer: "No! While higher quality inputs yield better results, our AI works great with standard smartphone photos. Just ensure good lighting, a clear view of the subject, and minimal occlusion."
  },
  {
    question: "Is there an API available?",
    answer: "Yes! We offer a comprehensive REST API for Business and Enterprise customers who want to integrate VTO technology directly into their applications, websites, or workflows."
  },
  {
    question: "What file formats are supported?",
    answer: "We support all major image formats including JPEG, PNG, WebP, and HEIC. For output, you can choose between JPEG, PNG, or WebP. Maximum input size is 20MB per image."
  },
  {
    question: "What happens to my uploaded photos?",
    answer: "We take privacy seriously. Your photos are processed securely using end-to-end encryption and are automatically deleted from our servers within 24 hours unless you choose to save them."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. No cancellation fees apply."
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about VTO Studio.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-3"
            >
              <motion.div
                className={`bg-white rounded-xl border overflow-hidden transition-colors ${openIndex === index ? 'border-blue-200 shadow-md' : 'border-gray-200'
                  }`}
                whileHover={{ scale: openIndex === index ? 1 : 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className={`font-medium pr-4 transition-colors ${openIndex === index ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                    {faq.question}
                  </span>
                  <motion.div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <AnimatePresence mode="wait">
                      {openIndex === index ? (
                        <motion.div
                          key="minus"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Minus className="w-4 h-4 text-blue-600" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="plus"
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Plus className="w-4 h-4 text-gray-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        className="px-5 pb-5 text-gray-600 leading-relaxed"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-600">
            Still have questions?{' '}
            <motion.a
              href="mailto:support@vtostudio.com"
              className="text-blue-500 hover:text-blue-600 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact our support team
            </motion.a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
