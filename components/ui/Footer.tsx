'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Github, Youtube, Sparkles, ArrowUp } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API', href: '#' },
    { name: 'Integrations', href: '#' },
    { name: 'Changelog', href: '#' },
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'Examples', href: '#showcase' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Support', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-canvas-light/50 border-t border-white/5">
      {/* CTA Section */}
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-cyan-500/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Fashion Business?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Join 500+ brands already using VTO Studio to boost conversions and reduce returns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#try-on" className="btn-primary text-lg flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Free Trial
              </Link>
              <Link href="#contact" className="btn-secondary text-lg">
                Talk to Sales
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container-custom pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">VTO Studio</span>
            </Link>
            <p className="text-white/40 text-sm mb-6 max-w-xs">
              AI-powered virtual try-on technology for modern fashion brands.
              Transform any photo into a photorealistic try-on in seconds.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} VTO Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <span>Made with ❤️ for fashion</span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
