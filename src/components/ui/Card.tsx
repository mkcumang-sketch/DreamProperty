import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'subtle' | 'outline';
  hoverEffect?: boolean;
}

export function Card({
  children,
  variant = 'glass',
  hoverEffect = true,
  className,
  ...props
}: CardProps) {
  const variants = {
    glass:
      'bg-[#0a0e12]/80 backdrop-blur-md border border-[rgba(223,231,224,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.36)]',
    subtle:
      'bg-[#05070a]/90 border border-[rgba(223,231,224,0.08)]',
    outline:
      'bg-transparent border border-[rgba(223,231,224,0.18)]',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 sm:p-8 transition-all duration-300',
        variants[variant],
        hoverEffect &&
          'hover:border-[#e0231c]/60 hover:shadow-[0_12px_40px_rgba(224,35,28,0.12)] hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
