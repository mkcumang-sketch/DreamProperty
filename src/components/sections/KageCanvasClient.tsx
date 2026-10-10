'use client';

import React from 'react';
import { KageLandingPage } from '@designcodeio/threeui/components/KageLandingPage';
import '@designcodeio/threeui/style.css';
import { useT } from '@/lib/i18n/useT';

export default function KageCanvasClient() {
  const { locale } = useT();

  React.useEffect(() => {
    const frame = document.querySelector('.kage-hero-section iframe') as HTMLIFrameElement | null;
    if (!frame) return;

    const configureFrame = () => {
      try {
        frame.setAttribute('scrolling', 'no');
        frame.style.width = '100%';
        frame.style.height = '100%';
        frame.style.border = '0';
        frame.style.display = 'block';
        frame.style.overflow = 'hidden';

        const doc = frame.contentDocument;
        if (doc) {
          const style = doc.createElement('style');
          style.id = 'kage-custom-frame-overrides';
          style.textContent = `
            .nav, #pre { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
            html, body { overflow: hidden !important; scrollbar-width: none !important; -ms-overflow-style: none !important; margin: 0 !important; padding: 0 !important; }
            html::-webkit-scrollbar, body::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
          `;
          doc.head.appendChild(style);

          const internalNav = doc.querySelector('.nav') as HTMLElement | null;
          if (internalNav) {
            internalNav.style.display = 'none';
          }
          doc.documentElement.style.overflow = 'hidden';
          doc.body.style.overflow = 'hidden';

          // Language sync
          doc.querySelectorAll('[data-en]').forEach((el) => {
            el.textContent = locale === 'hi' ? el.getAttribute('data-hi') : el.getAttribute('data-en');
          });
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
  }, [locale]);

  return (
    <div className="shader-frame w-full h-full m-0 p-0 border-0 rounded-none shadow-none relative overflow-hidden bg-[#05070a]">
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
