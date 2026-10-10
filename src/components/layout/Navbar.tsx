'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, ArrowRight } from 'lucide-react';
import { navItems } from '@/config/nav';
import { useT } from '@/lib/i18n/useT';
import { LanguageToggle } from './LanguageToggle';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const { locale, t } = useT();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    setIsScrolled(latest > 30);

    // Hide on scroll down, show on scroll up (only after scrolling past 150px)
    if (latest > 150 && diff > 8) {
      setIsHidden(true);
    } else if (diff < -6 || latest <= 150) {
      setIsHidden(false);
    }
  });

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#05070a]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              id="navbar-brand-logo"
            >
              <div className="w-10 h-10 rounded-lg bg-[#e0231c] flex items-center justify-center font-bold text-white text-base tracking-tight shadow-[0_0_20px_rgba(224,35,28,0.4)] group-hover:scale-105 transition-transform">
                DP
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm sm:text-base tracking-tight">
                  Dream Properties
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#e0231c] font-medium">
                  Atelier Kanpur
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                  {locale === 'hi' ? item.labelHi : item.label}
                </Link>
              ))}
            </nav>

            {/* Actions: Language + CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageToggle />
              <a
                href="#contact"
                id="nav-cta-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e0231c] hover:bg-[#c91e17] text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(224,35,28,0.35)] hover:shadow-[0_0_25px_rgba(224,35,28,0.55)] cursor-pointer"
              >
                <span>{t.nav.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageToggle />
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
