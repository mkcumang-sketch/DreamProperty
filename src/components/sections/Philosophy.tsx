'use client';

import React from 'react';
import { ArrowRight, MessageCircle, Star, Sparkles, Building2, ShieldCheck, Palette } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { useT } from '@/lib/i18n/useT';
import { siteConfig } from '@/config/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function Philosophy() {
  const { locale } = useT();
  const whatsappUrl = buildWhatsAppLink();

  const pillars = [
    {
      icon: Palette,
      title: locale === 'hi' ? 'सटीक स्थानिक वास्तुकला' : 'Spatial Precision & Vastu',
      desc:
        locale === 'hi'
          ? 'कानपुर के घरों के अनुरूप विचारशील लेआउट, मॉड्यूलर स्टोरेज और प्राकृतिक रोशनी का अनुकूलन।'
          : 'Tailored floorplans, bespoke modular cabinetry, and natural light choreography tuned to Kanpur homes.',
    },
    {
      icon: Building2,
      title: locale === 'hi' ? 'ड्रीम प्रॉपर्टीज साझेदारी' : 'Dream Properties Partnership',
      desc:
        locale === 'hi'
          ? 'स्वरूप नगर और सिविल लाइंस में साइट ब्लूप्रिंट्स तक त्वरित पहुंच और 11 वर्षों की सिद्ध विश्वसनीयता।'
          : 'Direct coordination with Swaroop Nagar’s premier real estate desk for zero-delay site visits and blueprints.',
    },
    {
      icon: ShieldCheck,
      title: locale === 'hi' ? 'टर्नकी निष्पादन एवं वारंटी' : 'Turnkey Handover & Warranty',
      desc:
        locale === 'hi'
          ? 'सामग्रियों के चयन से लेकर अंतिम फिनिशिंग तक, 10-वर्षीय वारंटी के साथ परेशानी-मुक्त हैंडओवर।'
          : 'Complete civil, modular joinery, and styling delivery backed by comprehensive 10-year warranty.',
    },
  ];

  return (
    <section id="approach" className="relative py-24 sm:py-32 bg-[#05070a] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(224,35,28,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0231c]/10 border border-[#e0231c]/20 text-[#e0231c] text-xs font-medium uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'hi' ? 'हमारी वास्तुकला दृष्टि' : 'Design Philosophy'}</span>
            </div>

            <SectionHeading
              title={
                locale === 'hi'
                  ? 'शांत और सुंदर स्थान, कानपुर में निर्मित'
                  : 'Calm spaces, crafted in Kanpur'
              }
              subtitle={
                locale === 'hi'
                  ? 'ड्रीम प्रॉपर्टीज (स्वरूप नगर) के साथ रणनीतिक साझेदारी — 11 वर्षों के रियल एस्टेट भरोसे को आधुनिक इंटीरियर डिजाइन और 3D स्थानिक नियोजन के साथ जोड़ना।'
                  : 'In strategic partnership with Dream Properties, Swaroop Nagar — pairing 11 years of trusted real estate excellence with bespoke architectural interiors and turnkey execution.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        {/* 3 Pillars */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#090d13]/70 border border-white/10 hover:border-[#e0231c]/30 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e0231c] mb-6 group-hover:scale-110 group-hover:bg-[#e0231c]/10 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </Stagger>

        {/* Trust Proof & CTAs */}
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-semibold">5.0 Google</span>
                <span className="text-white/40">(70 reviews)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-semibold">4.9 Justdial</span>
                <span className="text-white/40">(81 votes)</span>
              </div>
              <span className="text-white/20">•</span>
              <span className="text-white/80">{siteConfig.partner.address.split(',')[3] || 'Swaroop Nagar'}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <MagneticButton>
                <a
                  href="#contact"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#e0231c] hover:bg-[#c91e17] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(224,35,28,0.35)] cursor-pointer"
                >
                  <span>{locale === 'hi' ? 'साइट विजिट बुक करें' : 'Book a free site visit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#25D366] border border-white/10 transition-colors"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25D366]/20" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
