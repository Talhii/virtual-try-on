'use client';

import { useActionState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle, AlertCircle } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Tag } from '@/components/ui/Badge';

export default function ContactSection() {
    const [state, formAction, isPending] = useActionState(submitLead, null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
        }
    }, [state?.success]);

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-violet-500/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Tag className="mb-6">
                            <MessageSquare className="w-4 h-4" />
                            Get in Touch
                        </Tag>
                        <h2 className="text-display-3 font-bold mb-6">
                            Ready to <span className="gradient-text">Transform</span> Your Fashion Business?
                        </h2>
                        <p className="text-lg text-white/60 mb-8">
                            Whether you&apos;re a small boutique or enterprise retailer, we&apos;d love to hear from you.
                            Get a personalized demo or discuss custom solutions for your needs.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4 mb-8">
                            {[
                                'Free personalized demo',
                                'Custom pricing for your needs',
                                'Technical integration support',
                                'Response within 24 hours',
                            ].map((benefit) => (
                                <div key={benefit} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="text-white/80">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-6">
                            <a href="mailto:hello@vtostudio.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span>hello@vtostudio.com</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-6">Send us a message</h3>

                            <form ref={formRef} action={formAction} className="space-y-5">
                                <Input
                                    name="fullName"
                                    label="Full Name"
                                    placeholder="John Doe"
                                    leftIcon={<User className="w-5 h-5" />}
                                    error={state?.errors?.fullName?.[0]}
                                    required
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    placeholder="john@company.com"
                                    leftIcon={<Mail className="w-5 h-5" />}
                                    error={state?.errors?.email?.[0]}
                                    required
                                />

                                <Textarea
                                    name="message"
                                    label="Message"
                                    rows={4}
                                    placeholder="Tell us about your project or ask us anything..."
                                    error={state?.errors?.message?.[0]}
                                    required
                                />

                                <Button
                                    type="submit"
                                    isLoading={isPending}
                                    className="w-full"
                                    leftIcon={!isPending && <Send className="w-5 h-5" />}
                                >
                                    {isPending ? 'Sending...' : 'Send Message'}
                                </Button>

                                {/* Status Messages */}
                                {state?.success && (
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <CheckCircle className="w-5 h-5" />
                                        {state.message}
                                    </div>
                                )}

                                {state?.message && !state.success && !state.errors && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle className="w-5 h-5" />
                                        {state.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
