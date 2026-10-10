'use client';

import React from 'react';
import { Star, ShieldCheck, Clock, Users, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';

export function Testimonials() {
  const { locale } = useT();

  return (
    <section className="py-24 bg-[#05070a] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(224,35,28,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c] bg-[#e0231c]/10 px-3 py-1 rounded-full border border-[#e0231c]/20 inline-block mb-3">
              Independent Verified Ratings
            </span>
            <SectionHeading
              title={
                locale === 'hi'
                  ? 'कानपुर के नागरिकों और पेशेवरों का विश्वास'
                  : 'Reputation Built Across 11+ Years'
              }
              subtitle={
                locale === 'hi'
                  ? 'सत्यापित सार्वजनिक रेटिंग्स (गूगल एवं जस्टडायल)। कोई मनगढ़ंत प्रशंसापत्र नहीं।'
                  : 'Independent third-party scores verified across Google Reviews and Justdial for Dream Properties Swaroop Nagar.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        {/* Rating Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Google Review Card */}
          <Reveal delay={0.1}>
            <div className="p-8 rounded-2xl bg-[#090d13] border border-white/10 hover:border-amber-400/40 transition-colors shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wider uppercase text-white/80">
                  Google Verified
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Authentic
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-extrabold text-white">5.0</span>
                <span className="text-xl text-white/40">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-white/70">
                Over <strong className="text-white">70 organic client reviews</strong> with a flawless 5.0 rating on Google Maps Business profile.
              </p>
            </div>
          </Reveal>

          {/* Justdial Card */}
          <Reveal delay={0.2}>
            <div className="p-8 rounded-2xl bg-[#090d13] border border-white/10 hover:border-amber-400/40 transition-colors shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wider uppercase text-white/80">
                  Justdial Verified
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  11 Yrs Verified
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-extrabold text-white">4.9</span>
                <span className="text-xl text-white/40">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400 fill-amber-400/50'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-white/70">
                Backed by <strong className="text-white">81 verified consumer votes</strong> across Kanpur real estate and leasing.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Customer Strengths Highlighted */}
        <Reveal delay={0.3}>
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#080b10] border border-white/5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#e0231c] mb-4 text-center">
              Strengths Consistently Applauded by Property Owners
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Clock className="w-5 h-5 text-[#e0231c] mx-auto mb-2" />
                <h5 className="font-bold text-white text-xs mb-1">Fast Turnaround</h5>
                <p className="text-[11px] text-white/50">Rapid response and accelerated site visits</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#e0231c] mx-auto mb-2" />
                <h5 className="font-bold text-white text-xs mb-1">100% Trustworthy</h5>
                <p className="text-[11px] text-white/50">Clean documentation and zero hidden agendas</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Users className="w-5 h-5 text-[#e0231c] mx-auto mb-2" />
                <h5 className="font-bold text-white text-xs mb-1">Courteous Staff</h5>
                <p className="text-[11px] text-white/50">Professional and respectful client handling</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle className="w-5 h-5 text-[#e0231c] mx-auto mb-2" />
                <h5 className="font-bold text-white text-xs mb-1">Tailored Matches</h5>
                <p className="text-[11px] text-white/50">Spaces matched strictly to client conditions</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
