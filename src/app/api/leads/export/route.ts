import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

function escapeCsv(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Lead ID',
      'Created Date',
      'Name',
      'Phone',
      'Email',
      'Type',
      'Service',
      'Property Type',
      'Location',
      'Budget Range',
      'Status',
      'Notes',
      'Language',
      'Source',
      'Message',
    ];

    const rows = leads.map((l) => [
      escapeCsv(l.id),
      escapeCsv(l.createdAt.toISOString()),
      escapeCsv(l.name),
      escapeCsv(l.phone),
      escapeCsv(l.email),
      escapeCsv(l.type),
      escapeCsv(l.service),
      escapeCsv(l.propertyType),
      escapeCsv(l.location),
      escapeCsv(l.budgetRange),
      escapeCsv(l.status),
      escapeCsv(l.notes),
      escapeCsv(l.language),
      escapeCsv(l.source),
      escapeCsv(l.message),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const filename = `dream-properties-leads-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating CSV export:', error);
    return NextResponse.json({ error: 'Failed to generate export' }, { status: 500 });
  }
}
