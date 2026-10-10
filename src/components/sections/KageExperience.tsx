'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Eye, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';

const DynamicKageCanvas = dynamic(() => import('./KageCanvasClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] md:h-[760px] rounded-2xl bg-[#090d13] border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-48 h-6 rounded-md" />
      <Skeleton className="w-72 h-4 rounded-md" />
      <p className="text-xs text-white/40 tracking-wider uppercase animate-pulse">
        Initializing Three.js WebGL Architecture Scene...
      </p>
    </div>
  ),
});

export function KageExperience() {
  const { locale } = useT();
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [forced3D, setForced3D] = useState(false);

  useEffect(() => {
    // Check if network is Save-Data or mobile low concurrency
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean };
      hardwareConcurrency?: number;
    };
    const isSaveData = nav.connection?.saveData === true;
    const isLowEnd = (nav.hardwareConcurrency ?? 8) < 4;

    if (prefersReducedMotion || isSaveData || isLowEnd) {
      setShouldRender3D(false);
    } else {
      setShouldRender3D(true);
    }
  }, [prefersReducedMotion]);

  const showInteractive = shouldRender3D || forced3D;

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#05070a]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle,rgba(224,35,28,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0231c]/10 border border-[#e0231c]/20 text-[#e0231c] text-xs font-medium uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Spatial Atelier</span>
              </div>
              <SectionHeading
                title={
                  locale === 'hi'
                    ? 'अतुलनीय स्थानिक अनुभव'
                    : 'The Kage Spatial Experience'
                }
                subtitle={
                  locale === 'hi'
                    ? 'सटीक 3D स्थानिक प्रकाश और बनावट के साथ अपने स्वप्निल स्थान का पूर्वावलोकन करें।'
                    : 'Interactive Three.js depth canvas previewing spatial mood, material reflections and architectural geometry.'
                }
                alignment="left"
              />
            </div>

            <div className="flex items-center gap-3">
              {!showInteractive && (
                <button
                  type="button"
                  onClick={() => setForced3D(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/15 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#e0231c]" />
                  <span>Launch 3D WebGL Canvas</span>
                </button>
              )}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0231c] text-white text-xs font-medium hover:bg-[#c91e17] transition-all shadow-[0_0_15px_rgba(224,35,28,0.3)]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Book Site 3D Scan</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          {showInteractive ? (
            <div className="relative group">
              <DynamicKageCanvas />
              <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#05070a]/80 backdrop-blur-md border border-white/10 text-xs text-white/70">
                <Layers className="w-3.5 h-3.5 text-[#e0231c]" />
                <span>ThreeUI Interactive Engine</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-[520px] md:h-[680px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090d13]">
              <Image
                src="/images/placeholders/kage-poster.webp"
                alt="Architectural space preview"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover opacity-85"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="text-[#e0231c] text-xs font-mono uppercase tracking-widest mb-2">
                  Spatial Architecture
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Spaces that sell. Homes that last.
                </h3>
                <p className="text-sm text-white/70 max-w-lg mb-6">
                  Interactive 3D scene paused to optimize your device and network performance.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setForced3D(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e0231c] hover:bg-[#c91e17] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(224,35,28,0.4)] cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Experience Full 3D Canvas</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
