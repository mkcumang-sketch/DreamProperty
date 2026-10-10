import React from 'react';

interface StatusBadgeProps {
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'WON' | 'LOST' | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    NEW: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    CONTACTED: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    },
    QUOTED: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    WON: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    },
    LOST: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
    },
  };

  const current = styles[status] || {
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    border: 'border-gray-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${current.bg} ${current.text} ${current.border}`}
    >
      {status}
    </span>
  );
}
