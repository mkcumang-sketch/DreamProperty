'use client';

import React from 'react';
import { KageLandingPage } from '@designcodeio/threeui/components/KageLandingPage';
import '@designcodeio/threeui/style.css';

export default function KageCanvasClient() {
  React.useEffect(() => {
    const frame = document.querySelector('.shader-frame iframe') as HTMLIFrameElement | null;
    if (!frame) return;

    const configureFrame = () => {
      try {
        frame.setAttribute('scrolling', 'no');
        frame.style.overflow = 'hidden';
        const doc = frame.contentDocument;
        if (doc) {
          const style = doc.createElement('style');
          style.id = 'kage-custom-frame-overrides';
          style.textContent = `
            .nav, #pre, .peek { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
            html, body { overflow: hidden !important; scrollbar-width: none !important; -ms-overflow-style: none !important; }
            html::-webkit-scrollbar, body::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
          `;
          doc.head.appendChild(style);

          const internalNav = doc.querySelector('.nav') as HTMLElement | null;
          if (internalNav) {
            internalNav.style.display = 'none';
          }
          doc.documentElement.style.overflow = 'hidden';
          doc.body.style.overflow = 'hidden';
        }
      } catch {
        // Fallback
      }
    };

    frame.addEventListener('load', configureFrame);
    configureFrame();

    return () => {
      frame.removeEventListener('load', configureFrame);
    };
  }, []);

  return (
    <div className="shader-frame w-full h-full relative overflow-hidden bg-[#05070a]">
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
