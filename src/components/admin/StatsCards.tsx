import React from 'react';
import { Users, Sparkles, Calendar, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    newCount: number;
    thisWeek: number;
    winRate: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Leads',
      value: stats.total,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'New & Uncontacted',
      value: stats.newCount,
      icon: Sparkles,
      color: 'text-[#e0231c]',
      bg: 'bg-[#e0231c]/10',
    },
    {
      label: 'Received This Week',
      value: stats.thisWeek,
      icon: Calendar,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
    {
      label: 'Conversion Win Rate',
      value: `${stats.winRate}%`,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#090d13] border border-white/10 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-white/50 font-medium mb-1">{c.label}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{c.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${c.bg} ${c.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
