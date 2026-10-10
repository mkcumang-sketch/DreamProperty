import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'dp_admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_secret_must_be_32_characters_long_min!';
const key = new TextEncoder().encode(SESSION_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Allow login page and login/health APIs freely
  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/login' ||
    pathname === '/api/health'
  ) {
    return NextResponse.next();
  }

  // 2. Protect Admin Web Dashboard (/admin and /admin/...)
  const isAdminDashboard = pathname.startsWith('/admin');

  // 3. Protect Admin APIs
  const isAdminApi =
    (pathname === '/api/leads' && req.method === 'GET') ||
    pathname.startsWith('/api/leads/') ||
    pathname === '/api/admin/logout';

  if (isAdminDashboard || isAdminApi) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (token) {
      try {
        await jwtVerify(token, key, { algorithms: ['HS256'] });
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      if (isAdminDashboard) {
        const loginUrl = new URL('/admin/login', req.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/leads/:path*', '/api/admin/:path*'],
};
