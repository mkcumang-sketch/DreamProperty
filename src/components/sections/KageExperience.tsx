'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Skeleton } from '@/components/ui/Skeleton';

const DynamicKageCanvas = dynamic(() => import('./KageCanvasClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[640px] bg-[#05070a] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-48 h-6 rounded-md" />
      <p className="text-xs text-white/40 tracking-wider uppercase animate-pulse">
        Initializing Three.js WebGL Architecture Scene...
      </p>
    </div>
  ),
});

export function KageExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender3D, setShouldRender3D] = useState(false);

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

  return (
    <section
      id="experience"
      aria-label="3D Spatial Architecture Experience"
      className="kage-experience-wrapper relative w-full h-[100svh] min-h-[640px] overflow-hidden [isolation:isolate] z-10 bg-[#05070a]"
    >
      {/* Top crop mask to ensure internal Kage navbar is never visible */}
      <div
        className="kage-top-mask absolute top-0 left-0 right-0 h-[84px] bg-[#05070a] z-25 pointer-events-none"
        aria-hidden="true"
      />

      {shouldRender3D ? (
        <DynamicKageCanvas />
      ) : (
        <div className="relative w-full h-full min-h-[640px] overflow-hidden bg-[#05070a]">
          <Image
            src="/images/placeholders/kage-poster.webp"
            alt="Spatial architecture preview"
            fill
            sizes="100vw"
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/30 to-transparent flex flex-col justify-end p-8 md:p-16">
            <span className="text-[#e0231c] text-xs font-mono uppercase tracking-widest mb-2">
              Spatial Architecture • Swaroop Nagar Atelier
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Precision Spatial Lighting & Geometry
            </h2>
            <p className="text-sm md:text-base text-white/70 max-w-xl">
              Turnkey architectural interiors rendered in real-time WebGL for Dream Properties clients.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
