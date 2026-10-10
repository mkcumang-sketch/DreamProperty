'use client';

import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { useT } from '@/lib/i18n/useT';

interface SuccessStateProps {
  leadId?: string;
  name?: string;
  onReset: () => void;
}

export function SuccessState({ leadId, name, onReset }: SuccessStateProps) {
  const { t } = useT();
  const whatsappUrl = buildWhatsAppLink({ leadId, name });

  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-full bg-[#e0231c]/10 border border-[#e0231c]/30 flex items-center justify-center text-[#e0231c]">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t.form.successTitle}
        </h3>
        <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
          {t.form.successSubtitle}
        </p>
        {leadId && (
          <p className="text-xs text-white/40 font-mono pt-1">
            Reference ID: <span className="text-[#e0231c]">{leadId}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white stroke-none" />
          <span>Speed up via WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors cursor-pointer"
        >
          <span>Submit another request</span>
          <ArrowRight className="w-4 h-4 text-white/50" />
        </button>
      </div>
    </div>
  );
}
