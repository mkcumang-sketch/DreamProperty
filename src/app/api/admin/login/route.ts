import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminLoginSchema } from '@/lib/validations';
import { verifyPassword, setAdminSession } from '@/lib/auth';
import { authRateLimiter } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // Rate limiting for auth
    const rateCheck = authRateLimiter.check(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many login attempts. Please wait ${rateCheck.resetInSec} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = adminLoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid email or password' },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Check DB AdminUser first
    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    let isValid = false;
    let adminName = 'Admin';

    if (admin) {
      isValid = await verifyPassword(password, admin.passwordHash);
      adminName = admin.name;
    } else if (process.env.ADMIN_PASSWORD_HASH) {
      // Fallback to env password hash for primary admin
      isValid = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
      adminName = 'Super Admin';
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Set signed JWT cookie
    await setAdminSession({
      email: email.toLowerCase(),
      name: adminName,
      role: 'admin',
    });

    return NextResponse.json({
      ok: true,
      user: { email: email.toLowerCase(), name: adminName },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
