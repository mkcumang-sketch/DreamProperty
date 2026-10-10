'use client';

import React, { useRef, useState } from 'react';
import {
  Home,
  Sparkles,
  Key,
  Building2,
  Boxes,
  Compass,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { servicesConfig } from '@/config/services';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ServiceItem } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Sparkles,
  Key,
  Building2,
  Boxes,
  Compass,
};

function ServiceCard({ item }: { item: ServiceItem }) {
  const { locale } = useT();
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = iconMap[item.iconName] || Home;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotX, y: rotY });
    setGlowPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const bullets = locale === 'hi' ? item.bulletsHi : item.bullets;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          !prefersReducedMotion && isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s ease-out',
      }}
      className="relative p-7 rounded-2xl bg-[#090d13]/80 border border-white/10 hover:border-[#e0231c]/50 transition-colors flex flex-col justify-between overflow-hidden group shadow-lg"
    >
      {/* Dynamic Cursor Glow */}
      {!prefersReducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, rgba(224, 35, 28, 0.15), transparent 70%)`,
          }}
        />
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#e0231c]/10 border border-[#e0231c]/25 flex items-center justify-center text-[#e0231c] group-hover:scale-110 group-hover:bg-[#e0231c] group-hover:text-white transition-all shadow-[0_0_20px_rgba(224,35,28,0.2)]">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono tracking-wider uppercase text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            {item.tag}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {locale === 'hi' ? item.titleHi : item.title}
        </h3>

        <p className="text-xs text-[#e0231c] font-medium mb-6">
          {locale === 'hi' ? item.benefitHi : item.benefit}
        </p>

        <ul className="space-y-3 mb-8">
          {bullets.map((bullet, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e0231c] shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 group-hover:text-[#e0231c] transition-colors pt-4 border-t border-white/5"
      >
        <span>Request tailored quotation</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

export function Services() {
  const { locale } = useT();

  return (
    <section id="services" className="py-24 bg-[#05070a] relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(224,35,28,0.06)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c] bg-[#e0231c]/10 px-3 py-1 rounded-full border border-[#e0231c]/20 inline-block mb-3">
              Comprehensive Architectural Services
            </span>
            <SectionHeading
              title={
                locale === 'hi'
                  ? 'संपत्ति को शिखर पर ले जाने वाली सेवाएं'
                  : 'Tailored Services for Every Property Stage'
              }
              subtitle={
                locale === 'hi'
                  ? 'ड्रीम प्रॉपर्टीज के ग्राहकों के लिए विशेष रूप से डिज़ाइन की गई छह मुख्य सेवाएं।'
                  : 'Designed specifically for Dream Properties buyers, landlords, sellers, and luxury residents across Swaroop Nagar, Civil Lines, and Kanpur.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesConfig.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08}>
              <ServiceCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
