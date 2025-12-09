'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { submitLead } from '@/app/actions/submitLead';
import { Loader2, CheckCircle2 } from 'lucide-react';

const initialState = {
  message: '',
  success: false,
};

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-canvas border-t border-ink/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Get Early Access
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl">
            Join the revolution. Transform your e-commerce experience today.
          </p>
        </div>

        {state.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ink text-canvas p-12 rounded-2xl text-center"
          >
            <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h3 className="text-3xl font-bold mb-4">Request Received</h3>
            <p className="text-neutral-400 text-lg">
              Thank you for your interest. Our team will be in touch shortly to schedule your demo.
            </p>
          </motion.div>
        ) : (
          <form action={formAction} className="space-y-12">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full bg-transparent border-b border-ink/20 py-4 text-2xl md:text-3xl font-medium focus:outline-none focus:border-ink transition-colors placeholder:text-ink/20"
                placeholder="Jane Doe"
              />
              {state.errors?.fullName && (
                <p className="text-red-500 text-sm">{state.errors.fullName[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-transparent border-b border-ink/20 py-4 text-2xl md:text-3xl font-medium focus:outline-none focus:border-ink transition-colors placeholder:text-ink/20"
                placeholder="jane@company.com"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-neutral-500 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                className="w-full bg-transparent border-b border-ink/20 py-4 text-2xl md:text-3xl font-medium focus:outline-none focus:border-ink transition-colors placeholder:text-ink/20 resize-none"
                placeholder="Tell us about your brand..."
              />
              {state.errors?.message && (
                <p className="text-red-500 text-sm">{state.errors.message[0]}</p>
              )}
            </div>

            <div className="pt-8 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="group relative px-8 py-4 bg-ink text-canvas rounded-full text-lg font-bold overflow-hidden disabled:opacity-70 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2 text-canvas">
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </span>
                <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </div>
            
            {state.message && !state.success && (
               <p className="text-red-500 text-center">{state.message}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
