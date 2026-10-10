'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger } from '@/components/motion/Stagger';
import { siteConfig } from '@/config/site';
import { useT } from '@/lib/i18n/useT';

export function Stats() {
  const { locale } = useT();

  return (
    <section className="py-16 bg-[#070a0f] border-y border-white/5 relative overflow-hidden">
      <Container>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group text-center">
                {stat.isPlaceholder && (
                  <span className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-[#e0231c]/70 bg-[#e0231c]/10 px-1.5 py-0.5 rounded border border-[#e0231c]/20">
                    [EDIT]
                  </span>
                )}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 group-hover:text-[#e0231c] transition-colors">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-medium">
                  {locale === 'hi' ? stat.labelHi : stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
