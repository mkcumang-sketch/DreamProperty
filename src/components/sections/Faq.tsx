'use client';

import React from 'react';
import { faqConfig } from '@/config/faq';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';

export function Faq() {
  const { locale } = useT();

  const formattedItems = faqConfig.map((item, index) => ({
    id: `faq-${index}`,
    question: locale === 'hi' ? item.questionHi : item.question,
    answer: locale === 'hi' ? item.answerHi : item.answer,
  }));

  return (
    <section id="faq" className="py-24 bg-[#070a0f] relative overflow-hidden">
      <Container className="max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c] bg-[#e0231c]/10 px-3 py-1 rounded-full border border-[#e0231c]/20 inline-block mb-3">
              Frequently Asked Questions
            </span>
            <SectionHeading
              title={
                locale === 'hi'
                  ? 'अक्सर पूछे जाने वाले सवाल'
                  : 'Clear Answers for Informed Decisions'
              }
              subtitle={
                locale === 'hi'
                  ? 'कीमत, सामग्री, वारंटी और समयसीमा पर पारदर्शी स्पष्टीकरण।'
                  : 'Detailed breakdowns on pricing tiers, warranties, Vastu alignment, and site execution protocols.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Accordion items={formattedItems} />
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-sm text-white/70">
              Have a specific architectural or layout question?{' '}
              <a
                href="#contact"
                className="text-[#e0231c] hover:underline font-medium ml-1"
              >
                Speak directly with our senior designer →
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
