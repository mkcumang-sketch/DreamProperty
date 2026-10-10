import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface ThankYouProps {
  searchParams: Promise<{ id?: string; name?: string }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouProps) {
  const params = await searchParams;
  const leadId = params.id;
  const name = params.name;

  const whatsappUrl = buildWhatsAppLink({ leadId, name });

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#05070a]">
      <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-[#090d13] border border-white/10 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#e0231c]/15 blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto rounded-full bg-[#e0231c]/10 border border-[#e0231c]/30 flex items-center justify-center text-[#e0231c]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c]">
            Enquiry Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Thank you{name ? `, ${name}` : ''}!
          </h1>
          <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
            Your interior enquiry has been logged directly with our design architects and the Dream Properties partner desk at Swaroop Nagar, Kanpur.
          </p>
          {leadId && (
            <p className="text-xs text-white/40 font-mono pt-2">
              Reference Lead ID: <span className="text-[#e0231c]">{leadId}</span>
            </p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 space-y-1">
          <p>
            An advisor will review your specifications and contact you shortly.
          </p>
          <p>
            Need immediate assistance or walk-in directions today?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="thank-you-wa-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Fast-Track on WhatsApp</span>
          </a>

          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#e0231c]" />
            <span>Call Partner Office</span>
          </a>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
