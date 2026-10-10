'use client';

import React from 'react';
import {
  Handshake,
  TrendingUp,
  Gift,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';
import { useT } from '@/lib/i18n/useT';

export function Partnership() {
  const { locale } = useT();

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Faster Sales & Lettings',
      titleHi: 'तेज बिक्री एवं लीजिंग',
      desc: 'Professionally staged properties attract 3x more viewing inquiries and convert prospective buyers into signed contracts significantly faster.',
      descHi: 'सजाई गई संपत्तियों पर 3 गुना अधिक इंक्वायरी मिलती हैं और सौदे तेजी से फाइनल होते हैं।',
    },
    {
      icon: Gift,
      title: 'Mutual Referral Benefit',
      titleHi: 'पारस्परिक रेफरल लाभ',
      desc: 'High-yield commercial referral commissions on every design project contracted through agency client introductions.',
      descHi: 'एजेंसी द्वारा रेफ़र किए गए प्रत्येक क्लाइंट पर आकर्षक व्यावसायिक कमीशन और लाभ।',
    },
    {
      icon: BookOpen,
      title: 'Co-Branded Catalogue',
      titleHi: 'सह-ब्रांडेड कैटलॉग',
      desc: 'Luxury hardcover and digital interior lookbooks presented under the joint Dream Properties × Atelier banner during client presentations.',
      descHi: 'क्लाइंट प्रस्तुतियों के दौरान ड्रीम प्रॉपर्टीज के साथ संयुक्त रूप से लक्जरी कैटलॉग।',
    },
    {
      icon: Award,
      title: 'Buyer Move-in Handover Kit',
      titleHi: 'खरीदार हैंडओवर किट',
      desc: 'A complimentary space-planning voucher, 3D visualization credit, and architectural consultation gift card presented to every property buyer.',
      descHi: 'प्रत्येक खरीदार को निःशुल्क स्पेस-प्लानिंग वाउचर और 3D विज़ुअलाइज़ेशन क्रेडिट।',
    },
  ];

  return (
    <section id="partnership" className="py-24 bg-[#05070a] relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(224,35,28,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Partner Profile */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0231c]/10 border border-[#e0231c]/20 text-[#e0231c] text-xs font-medium uppercase tracking-wider mb-2">
                <Handshake className="w-3.5 h-3.5" />
                <span>Strategic Alliance</span>
              </div>
              <SectionHeading
                title={
                  locale === 'hi'
                    ? 'ड्रीम प्रॉपर्टीज के साथ विशेष साझेदारी'
                    : 'The Dream Properties Synergy'
                }
                subtitle={
                  locale === 'hi'
                    ? 'स्वरूप नगर में 11 वर्षों की निष्ठावान रियल एस्टेट विशेषज्ञता और आधुनिक इंटीरियर वास्तुकला का संयोजन।'
                    : "Merging 11+ years of Swaroop Nagar's premier real estate consultancy with turnkey architectural design to elevate Kanpur's real estate ecosystem."
                }
                alignment="left"
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-6 rounded-2xl bg-[#090d13] border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {siteConfig.partner.name}
                    </h4>
                    <p className="text-xs text-white/50">
                      Khalasi Line, Swaroop Nagar, Kanpur
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#e0231c]">
                      Est. 11+ Years
                    </span>
                    <p className="text-[10px] text-white/40">Verified Agency</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e0231c] shrink-0" />
                    <span>5.0 / 5.0 Google (70 reviews) • 4.9 / 5.0 Justdial (81 votes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e0231c] shrink-0" />
                    <span>Specialists in high-value residential, commercial, & hotel leases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e0231c] shrink-0" />
                    <span>Strict customer commitment: verified papers & well-behaved staff</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#contact"
                    id="partner-agency-cta"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-[#e0231c] text-white text-xs font-semibold border border-white/10 hover:border-transparent transition-all shadow-md group cursor-pointer"
                  >
                    <span>Partner agencies, talk to us</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4 Strategic Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="p-6 rounded-2xl bg-[#0b0f16] border border-white/10 hover:border-[#e0231c]/40 transition-colors group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#e0231c]/10 border border-[#e0231c]/25 flex items-center justify-center text-[#e0231c] mb-4 group-hover:bg-[#e0231c] group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">
                        {locale === 'hi' ? b.titleHi : b.title}
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {locale === 'hi' ? b.descHi : b.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
