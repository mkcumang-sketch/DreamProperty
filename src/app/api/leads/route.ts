import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { leadFormSchema } from '@/lib/validations';
import { leadRateLimiter } from '@/lib/rate-limit';
import { sendLeadNotification } from '@/lib/mailer';
import { getAdminSession } from '@/lib/auth';
import { LeadRecord } from '@/types';

export async function POST(req: NextRequest) {
  try {
    // 1. Determine client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // 2. IP Rate Limit Check
    const rateCheck = leadRateLimiter.check(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${rateCheck.resetInSec} seconds or call our partner desk at 082990 58827.`,
        },
        { status: 429 }
      );
    }

    // 3. Parse and Validate Request Body
    const body = await req.json();
    const result = leadFormSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Invalid form data';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;

    // 4. Honeypot check (anti-spam)
    if (data.hp && data.hp.length > 0) {
      // Silently discard spam bots with fake 200
      return NextResponse.json({ ok: true, id: 'filtered' }, { status: 200 });
    }

    // 5. Store Lead in SQLite DB via Prisma
    const userAgent = req.headers.get('user-agent') || undefined;

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        type: data.type,
        service: data.service || null,
        propertyType: data.propertyType || null,
        location: data.location || null,
        budgetRange: data.budgetRange || null,
        message: data.message || null,
        language: data.language,
        ip,
        userAgent,
        source: 'website',
        status: 'NEW',
      },
    });

    // 6. Trigger SMTP lead email notification (non-blocking)
    sendLeadNotification(lead as unknown as Partial<LeadRecord>).catch((err) => {
      console.error('Lead notification trigger error:', err);
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    // Never leak internal stack traces to the public
    return NextResponse.json(
      { error: 'An unexpected error occurred while saving your request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Verify Admin Session
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Query Parameters
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search')?.trim();
    const status = searchParams.get('status')?.trim();
    const type = searchParams.get('type')?.trim();

    // 3. Build Prisma Where Clause
    const where: Record<string, unknown> = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (type && type !== 'ALL') {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { location: { contains: search } },
        { message: { contains: search } },
      ];
    }

    // 4. Query DB
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching leads list:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
