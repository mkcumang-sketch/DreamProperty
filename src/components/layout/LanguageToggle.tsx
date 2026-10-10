'use client';

import React from 'react';
import { useT } from '@/lib/i18n/useT';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { locale, setLocale } = useT();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium ${className}`}
    >
      <button
        type="button"
        id="lang-toggle-en"
        onClick={() => setLocale('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          locale === 'en'
            ? 'bg-[#e0231c] text-white shadow-[0_0_12px_rgba(224,35,28,0.4)]'
            : 'text-white/60 hover:text-white'
        }`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        id="lang-toggle-hi"
        onClick={() => setLocale('hi')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          locale === 'hi'
            ? 'bg-[#e0231c] text-white shadow-[0_0_12px_rgba(224,35,28,0.4)]'
            : 'text-white/60 hover:text-white'
        }`}
        aria-pressed={locale === 'hi'}
      >
        हिन्दी
      </button>
    </div>
  );
}
