import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  alignment?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  description,
  subtitle,
  align = 'center',
  alignment,
  className,
}: SectionHeadingProps) {
  const effectiveAlign = alignment || align;
  const effectiveText = subtitle || description;

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        effectiveAlign === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {tag && (
        <div
          className={cn(
            'inline-flex items-center gap-2 mb-3',
            effectiveAlign === 'center' && 'justify-center'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#e0231c]" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#aab4ad]">
            {tag}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#dfe7e0] tracking-tight leading-[1.15]">
        {title}
      </h2>
      {effectiveText && (
        <p className="mt-4 text-base sm:text-lg text-[#aab4ad] leading-relaxed font-light">
          {effectiveText}
        </p>
      )}
    </div>
  );
}
