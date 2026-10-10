'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { useT } from '@/lib/i18n/useT';

export function FloatingWhatsApp() {
  const { t } = useT();
  const whatsappUrl = buildWhatsAppLink();

  return (
    <aside
      aria-label="Direct messaging contact"
      className="fixed bottom-6 right-6 z-[90] flex items-center group"
    >
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 rounded-full bg-[#0d1117]/90 text-white/90 text-xs font-medium border border-white/10 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {t.hero.ctaSecondary}
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp with Dream Properties Atelier"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none"
          style={{ animationDuration: '2.5s' }}
        />
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </a>
    </aside>
  );
}
