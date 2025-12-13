'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight, LogOut, User as UserIcon } from 'lucide-react';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useTranslation } from '@/providers/TranslationProvider';
import { useAuth } from '@/hooks';
import { authApi } from '@/services/api';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useTranslation();
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await authApi.logout();
            // Force reload to clear all states and ensure middleware sees empty cookies
            globalThis.window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navLinks = [
        { name: t.common.home, href: '/' },
        { name: t.common.dashboard, href: '/dashboard' },
        { name: t.common.pricing, href: '/pricing' },
        { name: t.common.explore, href: '/explore' },
        { name: t.common.imageToVideo, href: '/image-to-video' },
        { name: t.common.history, href: '/history' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'py-3 glass-strong shadow-sm'
                    : 'py-4 bg-white'
                    }`}
            >
                <div className="container-custom flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-lg font-bold text-gray-900">{t.navbar.brand}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <LanguageSelector />
                        {user ? (
                            <div className="flex items-center gap-3 pl-2">
                                <Link
                                    href="/dashboard"
                                    className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors"
                                >
                                    <UserIcon className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                {t.common.login}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 pt-20 px-6 bg-white lg:hidden"
                    >
                        <div className="flex flex-col gap-1 pt-4">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-3">
                            {/* Mobile Language Selector */}
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm font-medium text-gray-600">Language</span>
                                <LanguageSelector variant="full" />
                            </div>
                            {user ? (
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleLogout();
                                    }}
                                    className="bg-gray-100 text-gray-900 w-full py-3 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-gray-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-blue-600 text-white w-full py-3 rounded-full flex items-center justify-center gap-2 font-medium"
                                >
                                    {t.common.login}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
