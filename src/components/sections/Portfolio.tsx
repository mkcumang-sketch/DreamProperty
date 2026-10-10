'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';
import { PortfolioItem } from '@/types';

export function Portfolio() {
  const { locale } = useT();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? siteConfig.portfolioItems
      : siteConfig.portfolioItems.filter((i) => i.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#070a0f] relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c] bg-[#e0231c]/10 px-3 py-1 rounded-full border border-[#e0231c]/20 inline-block mb-3">
              Curated Kanpur Archives
            </span>
            <SectionHeading
              title={
                locale === 'hi'
                  ? 'हालिया चयनित परियोजनाएं'
                  : 'Selected Portfolio & Showcases'
              }
              subtitle={
                locale === 'hi'
                  ? 'स्वरूप नगर, सिविल लाइंस और कानपुर के प्रमुख क्षेत्रों में निष्पादित कार्य।'
                  : 'A glance at bespoke turnkey residences, commercial hubs, and high-velocity staging executed across Kanpur.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        {/* Filter Pills */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {siteConfig.portfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#e0231c] text-white shadow-[0_0_15px_rgba(224,35,28,0.4)]'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1}>
              <div
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#0b0f16] border border-white/10 hover:border-[#e0231c]/50 transition-all cursor-pointer shadow-xl"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 group-hover:text-[#e0231c] transition-colors border border-white/10">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-white/90 border border-white/10">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#e0231c] font-medium mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {locale === 'hi' ? item.titleHi : item.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#0d121a] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-[#e0231c] text-white transition-colors border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="800px"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-0.5 rounded-full bg-[#e0231c]/10 text-[#e0231c] border border-[#e0231c]/20 text-xs font-mono">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-white/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#e0231c]" />
                  {selectedItem.location}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {locale === 'hi' ? selectedItem.titleHi : selectedItem.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {selectedItem.description}
              </p>
              <div className="pt-4 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2.5 rounded-full bg-[#e0231c] text-white text-xs font-semibold hover:bg-[#c91e17] transition-all shadow-[0_0_15px_rgba(224,35,28,0.4)]"
                >
                  Inquire About Similar Design
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
