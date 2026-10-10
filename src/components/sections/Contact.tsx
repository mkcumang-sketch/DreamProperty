'use client';

import React from 'react';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  Star,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LeadForm } from '@/components/forms/LeadForm';
import { Reveal } from '@/components/motion/Reveal';
import { useT } from '@/lib/i18n/useT';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function Contact() {
  const { locale } = useT();
  const whatsappUrl = buildWhatsAppLink();

  return (
    <section id="contact" className="py-24 bg-[#05070a] relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(224,35,28,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c] bg-[#e0231c]/10 px-3 py-1 rounded-full border border-[#e0231c]/20 inline-block mb-3">
              Direct Agency & Studio Desk
            </span>
            <SectionHeading
              title={
                locale === 'hi'
                  ? 'निःशुल्क साइट विजिट या परामर्श बुक करें'
                  : 'Connect with Our Kanpur Design Desk'
              }
              subtitle={
                locale === 'hi'
                  ? 'ड्रीम प्रॉपर्टीज स्वरूप नगर कार्यालय में हमसे मिलें या अपनी साइट पर मिलने का समय तय करें।'
                  : 'Meet us at Dream Properties Swaroop Nagar partner office or book an on-site spatial walk-through across Kanpur.'
              }
              alignment="center"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact details, Map, Partner office */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-[#090d13] border border-white/10 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {siteConfig.partner.name} Desk
                  </h3>
                  <p className="text-xs text-white/50">
                    Official Interior Partner Office • Swaroop Nagar
                  </p>
                </div>

                <div className="space-y-4 text-xs text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#e0231c] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Physical Address</p>
                      <p className="text-white/60 leading-relaxed">
                        {siteConfig.partner.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#e0231c] shrink-0" />
                    <div>
                      <p className="text-white font-medium">Direct Telephone</p>
                      <a
                        href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                        className="text-[#e0231c] hover:underline font-mono text-sm"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#e0231c] shrink-0" />
                    <div>
                      <p className="text-white font-medium">Visiting Hours</p>
                      <p className="text-white/60">{siteConfig.partner.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Reputation Verified</p>
                      <p className="text-white/60">
                        4.9/5 Justdial (81 votes) • 5.0 Google (70 reviews)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>WhatsApp Chat</span>
                  </a>

                  <a
                    href={siteConfig.partner.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Google Maps Embed / Preview Card */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#090d13] p-1 shadow-xl">
                <div className="relative h-56 w-full rounded-xl overflow-hidden bg-[#0d121a]">
                  <iframe
                    title="Dream Properties Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.218671403698!2d80.3155705!3d26.4789885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c38827da78083%3A0xb304b7dbf3aa415c!2sDream%20Properties!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#05070a]/90 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-white/70 flex items-center justify-between">
                    <span>113/182 Khalasi Line, Swaroop Nagar</span>
                    <a
                      href={siteConfig.partner.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e0231c] hover:underline"
                    >
                      Open App →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
