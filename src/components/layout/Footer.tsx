'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Star, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navItems } from '@/config/nav';
import { useT } from '@/lib/i18n/useT';

export function Footer() {
  const { locale } = useT();

  return (
    <footer className="relative bg-[#030406] border-t border-white/10 text-white/70 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(224,35,28,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Partner */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#e0231c] flex items-center justify-center font-bold text-white text-base tracking-tight shadow-[0_0_20px_rgba(224,35,28,0.4)]">
                DP
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-base tracking-tight">
                  Dream Properties Atelier
                </span>
                <span className="text-[11px] tracking-widest uppercase text-[#e0231c]">
                  Kanpur Studio
                </span>
              </div>
            </div>

            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Premium interior architectural design, bespoke turnkey furnishing and
              strategic home staging in official partnership with Dream Properties,
              Kanpur&apos;s trusted property consultancy for 11+ years.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/90">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-medium">5.0 / 5 Google</span>
                <span className="text-white/40 text-[10px]">(70 reviews)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/90">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-medium">4.9 / 5 Justdial</span>
                <span className="text-white/40 text-[10px]">(81 votes)</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {locale === 'hi' ? item.labelHi : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Process */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Home Staging
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Rental Furnishing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Turnkey Interiors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Fit-outs
                </a>
              </li>
              <li>
                <a href="#partnership" className="hover:text-white transition-colors">
                  Partner Agency Deck
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Partner Desk */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Partner Desk
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e0231c] shrink-0 mt-0.5" />
                <span>{siteConfig.partner.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e0231c] shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e0231c] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#e0231c] shrink-0" />
                <span>{siteConfig.partner.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} in alliance with Dream
            Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e0231c]" />
              Zero-spam lead guarantee
            </span>
            <Link
              href="/admin/login"
              className="text-white/40 hover:text-white transition-colors text-[11px]"
            >
              Partner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
