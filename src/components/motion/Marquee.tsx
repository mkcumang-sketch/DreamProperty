'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for full cycle
  className?: string;
}

export function Marquee({ items, speed = 30, className }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden border-y border-[rgba(223,231,224,0.08)] bg-[#05070a]/90 py-4 select-none',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around gap-12 text-sm sm:text-base font-light tracking-[0.2em] uppercase text-[#aab4ad]',
          !prefersReducedMotion && 'animate-marquee group-hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <div key={`m1-${i}`} className="flex items-center gap-12 whitespace-nowrap">
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-[#e0231c]" />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around gap-12 text-sm sm:text-base font-light tracking-[0.2em] uppercase text-[#aab4ad]',
          !prefersReducedMotion && 'animate-marquee group-hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <div key={`m2-${i}`} className="flex items-center gap-12 whitespace-nowrap">
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-[#e0231c]" />
          </div>
        ))}
      </div>
    </div>
  );
}
