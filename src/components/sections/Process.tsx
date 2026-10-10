'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { processConfig } from '@/config/process';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Clock } from 'lucide-react';

export function Process() {
  const { locale } = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="py-24 bg-[#070a0f] relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c] bg-[#e0231c]/10 px-3 py-1 rounded-full border border-[#e0231c]/20 inline-block mb-3">
              Standardized Execution Protocol
            </span>
            <SectionHeading
              title={
                locale === 'hi'
                  ? 'चरणबद्ध निष्पादन प्रक्रिया'
                  : 'Five Steps from Consultation to Keys'
              }
              subtitle={
                locale === 'hi'
                  ? 'पारदर्शी मील के पत्थर, कोई छिपी हुई लागत नहीं, और तय समयसीमा पर सटीक हैंडओवर।'
                  : 'A predictable, transparent journey designed to eliminate delays, cost overruns, and on-site stress.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Animated Vertical Line for Desktop & Tablet */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-white/10 hidden sm:block">
            {!prefersReducedMotion && (
              <motion.div
                className="w-full bg-[#e0231c] origin-top shadow-[0_0_12px_#e0231c]"
                style={{ scaleY: lineHeight, height: '100%' }}
              />
            )}
          </div>

          <div className="space-y-12 sm:space-y-16">
            {processConfig.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 group`}
                >
                  {/* Step Node Marker on the timeline */}
                  <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#070a0f] border-2 border-[#e0231c] text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(224,35,28,0.4)] z-10 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>

                  {/* Empty Spacer on alternate side for desktop alignment */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div className="sm:w-1/2">
                    <Reveal delay={idx * 0.1} direction={isEven ? 'right' : 'left'}>
                      <div className="p-7 rounded-2xl bg-[#0b0f16]/90 border border-white/10 hover:border-[#e0231c]/40 transition-colors shadow-xl group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span className="sm:hidden text-xs font-mono font-bold text-[#e0231c] bg-[#e0231c]/10 px-2.5 py-1 rounded-md border border-[#e0231c]/20">
                            STEP {item.step}
                          </span>
                          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                            {locale === 'hi' ? item.titleHi : item.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 shrink-0">
                            <Clock className="w-3 h-3 text-[#e0231c]" />
                            {item.duration}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {locale === 'hi' ? item.descriptionHi : item.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
