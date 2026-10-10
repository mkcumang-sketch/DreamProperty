'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#e0231c] origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(224,35,28,0.7)]"
      style={{ scaleX }}
    />
  );
}
