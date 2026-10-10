'use client';

import React from 'react';
import { ArrowRight, MessageCircle, Star, MapPin } from 'lucide-react';
import { useT } from '@/lib/i18n/useT';
import { siteConfig } from '@/config/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { TextSplit } from '@/components/motion/TextSplit';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Reveal } from '@/components/motion/Reveal';

export function Hero() {
  const { t } = useT();
  const whatsappUrl = buildWhatsAppLink();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background ambient gradient orbs (GPU transforms only) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(224,35,28,0.14)_0%,rgba(5,7,10,0)_70%)] blur-3xl pointer-events-none will-change-transform" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,rgba(5,7,10,0)_70%)] blur-2xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Partner badge */}
        <Reveal delay={0.1} direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-white/80 mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <span className="flex h-2 w-2 rounded-full bg-[#e0231c] animate-pulse" />
            <span className="font-medium text-white/90">
              {siteConfig.partner.name}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#e0231c] font-medium">11+ Years in Swaroop Nagar</span>
          </div>
        </Reveal>

        {/* Split-text Main Headline */}
        <div className="max-w-4xl mx-auto mb-6">
          <TextSplit
            text={t.hero.title}
            as="h1"
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]"
            wordClassName="text-white"
          />
        </div>

        {/* Subline */}
        <Reveal delay={0.25} distance={20}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8">
            {t.hero.subtitle}
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={0.35} distance={20}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <MagneticButton>
              <a
                href="#contact"
                id="hero-primary-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#e0231c] hover:bg-[#c91e17] text-white font-semibold text-base transition-all shadow-[0_0_30px_rgba(224,35,28,0.4)] hover:shadow-[0_0_40px_rgba(224,35,28,0.65)] active:scale-95 cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-secondary-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-base border border-white/10 hover:border-white/20 transition-all backdrop-blur-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]/20" />
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </MagneticButton>
          </div>
        </Reveal>

        {/* Partner trust metric cards */}
        <Reveal delay={0.45} distance={20}>
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white font-semibold">5.0 / 5.0 Google</span>
              <span className="text-white/40">(70 reviews)</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white font-semibold">4.9 / 5.0 Justdial</span>
              <span className="text-white/40">(81 votes)</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#e0231c]" />
              <span>Khalasi Line, Swaroop Nagar</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
