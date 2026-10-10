'use client';

import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/motion/Marquee';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';
import { useT } from '@/lib/i18n/useT';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function CtaBanner() {
  const { locale } = useT();
  const whatsappUrl = buildWhatsAppLink();

  return (
    <section className="bg-[#05070a] relative overflow-hidden">
      {/* Brand & Material Marquee strip */}
      <div className="py-6 border-b border-white/5">
        <p className="text-center text-[11px] font-mono uppercase tracking-widest text-white/40 mb-3">
          Architectural Materials & Hardware Partners
        </p>
        <Marquee items={siteConfig.brands} speed={25} />
      </div>

      {/* Heroic CTA Banner */}
      <div className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(224,35,28,0.14),transparent)] pointer-events-none" />

        <Container className="relative z-10 text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/25 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Move In Without Compromise</span>
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {locale === 'hi'
                  ? 'अपनी संपत्ति को एक नया रूप देने के लिए तैयार हैं?'
                  : 'Ready to Transform Your Kanpur Property?'}
              </h2>

              <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
                {locale === 'hi'
                  ? 'ड्रीम प्रॉपर्टीज के साथ मिलकर एक निःशुल्क साइट परामर्श शेड्यूल करें और अपनी जगह की वास्तविक क्षमता का अनुभव करें।'
                  : 'Schedule an on-site consultation with our senior designers alongside Dream Properties advisors.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="#contact"
                  id="cta-banner-primary-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#e0231c] hover:bg-[#c91e17] text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(224,35,28,0.5)] active:scale-95 cursor-pointer"
                >
                  <span>Book Free Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-banner-whatsapp-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-colors backdrop-blur-md active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/20" />
                  <span>Chat with Partner Desk</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
