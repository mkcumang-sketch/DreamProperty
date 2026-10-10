import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-[#e0231c]/20 border border-[#e0231c]/40 flex items-center justify-center animate-pulse">
        <span className="font-bold text-[#e0231c] text-sm">DP</span>
      </div>
      <Skeleton className="w-48 h-4 rounded-md" />
      <Skeleton className="w-32 h-3 rounded-md" />
    </div>
  );
}
