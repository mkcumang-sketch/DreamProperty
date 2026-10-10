import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-[#05070a]">
      <div className="space-y-4 max-w-md">
        <span className="text-xs font-mono uppercase tracking-widest text-[#e0231c]">
          404 • Page Not Found
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Spatial Pathway Lost
        </h1>
        <p className="text-sm text-white/60 leading-relaxed">
          The requested architectural page or document does not exist in this directory.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e0231c] hover:bg-[#c91e17] text-white text-xs font-semibold transition-all shadow-[0_0_20px_rgba(224,35,28,0.4)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
