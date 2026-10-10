'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, ArrowRight } from 'lucide-react';
import { navItems } from '@/config/nav';
import { siteConfig } from '@/config/site';
import { useT } from '@/lib/i18n/useT';
import { LanguageToggle } from './LanguageToggle';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { locale, t } = useT();
  useLockBodyScroll(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 z-[120] w-full max-w-xs bg-[#0b0f14] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-[#e0231c] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(224,35,28,0.4)]">
                    DP
                  </div>
                  <span className="font-semibold text-sm text-white tracking-wide">
                    Atelier
                  </span>
                </div>
                <button
                  type="button"
                  id="mobile-menu-close"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4">
                <LanguageToggle className="w-full justify-center py-1" />
              </div>

              <nav className="flex flex-col space-y-1 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors text-base font-medium"
                  >
                    <span>{locale === 'hi' ? item.labelHi : item.label}</span>
                    <ArrowRight className="w-4 h-4 text-white/30" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <a
                href="#contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#e0231c] text-white font-medium text-sm shadow-[0_0_20px_rgba(224,35,28,0.3)] active:scale-95 transition-transform"
              >
                <span>{t.nav.cta}</span>
              </a>

              <div className="space-y-2 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#e0231c]" />
                  <span>{siteConfig.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#e0231c] shrink-0 mt-0.5" />
                  <span>{siteConfig.partner.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
