'use client';

import React from 'react';
import { KageLandingPage } from '@designcodeio/threeui/components/KageLandingPage';
import '@designcodeio/threeui/style.css';

export default function KageCanvasClient() {
  return (
    <div className="shader-frame w-full h-[620px] md:h-[760px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative bg-[#05070a]">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
