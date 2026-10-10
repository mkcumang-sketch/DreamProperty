import React from 'react';
import { KageExperience } from '@/components/sections/KageExperience';
import { Philosophy } from '@/components/sections/Philosophy';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Partnership } from '@/components/sections/Partnership';
import { Portfolio } from '@/components/sections/Portfolio';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <KageExperience />
      <Philosophy />
      <Stats />
      <Services />
      <Process />
      <Partnership />
      <Portfolio />
      <Testimonials />
      <Faq />
      <Contact />
      <CtaBanner />
    </main>
  );
}
