'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-3.5', className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const headingId = `faq-heading-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border transition-colors duration-200 overflow-hidden',
              isOpen
                ? 'border-[#e0231c]/50 bg-[#0a0e12]/90 shadow-[0_4px_24px_rgba(224,35,28,0.08)]'
                : 'border-[rgba(223,231,224,0.1)] bg-[#0a0e12]/50 hover:border-[rgba(223,231,224,0.2)]'
            )}
          >
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0231c]"
              >
                <span className="flex items-center gap-4 text-base sm:text-lg font-normal text-[#dfe7e0]">
                  <span className="text-xs font-mono text-[#e0231c] opacity-80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-[#aab4ad] transition-transform duration-300',
                    isOpen && 'rotate-180 text-[#e0231c]'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-sm sm:text-base text-[#aab4ad] font-light leading-relaxed border-t border-[rgba(223,231,224,0.06)] mt-1">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
