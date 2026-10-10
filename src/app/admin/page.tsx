import React from 'react';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StatsCards } from '@/components/admin/StatsCards';
import { LeadsTable } from '@/components/admin/LeadsTable';
import { LeadRecord } from '@/types';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Fetch all leads for admin dashboard view
  const rawLeads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Calculate stats
  const total = rawLeads.length;
  const newCount = rawLeads.filter((l) => l.status === 'NEW').length;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = rawLeads.filter((l) => new Date(l.createdAt) >= oneWeekAgo).length;

  const wonCount = rawLeads.filter((l) => l.status === 'WON').length;
  const winRate = total > 0 ? Math.round((wonCount / total) * 100) : 0;

  // Serialize leads for client component
  const leads: LeadRecord[] = rawLeads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email || undefined,
    type: l.type as LeadRecord['type'],
    service: l.service || undefined,
    propertyType: l.propertyType || undefined,
    location: l.location || undefined,
    budgetRange: l.budgetRange || undefined,
    message: l.message || undefined,
    source: l.source,
    status: l.status as LeadRecord['status'],
    notes: l.notes || undefined,
    language: l.language as 'en' | 'hi',
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          Interior Leads CRM
        </h1>
        <p className="text-xs sm:text-sm text-white/50">
          Inbound client pipeline and partner agency lead assignments
        </p>
      </div>

      <StatsCards
        stats={{
          total,
          newCount,
          thisWeek,
          winRate,
        }}
      />

      <LeadsTable initialLeads={leads} />
    </div>
  );
}
