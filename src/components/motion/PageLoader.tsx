'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070a] text-white pointer-events-none select-none"
        >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e0231c] flex items-center justify-center font-bold text-white text-xl tracking-tight shadow-[0_0_30px_rgba(224,35,28,0.5)]">
              DP
            </div>
            <div className="text-left">
              <span className="block text-sm font-semibold tracking-wider uppercase text-white/90">
                Dream Properties
              </span>
              <span className="block text-[11px] tracking-widest uppercase text-[#e0231c]">
                Atelier Kanpur
              </span>
            </div>
          </motion.div>

          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                ease: 'easeInOut',
              }}
              className="w-1/2 h-full bg-[#e0231c] rounded-full shadow-[0_0_12px_#e0231c]"
            />
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
