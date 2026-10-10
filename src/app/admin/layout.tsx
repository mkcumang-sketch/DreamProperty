import React from 'react';
import Link from 'next/link';
import { LogOut, ArrowLeft, Shield } from 'lucide-react';
import { getAdminSession } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#05070a] text-white flex flex-col">
      {/* Admin Top Navigation */}
      <header className="border-b border-white/10 bg-[#090d13]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#e0231c] flex items-center justify-center font-bold text-white text-xs">
                DP
              </div>
              <span className="font-semibold text-sm tracking-tight">
                Dream Properties CRM
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded text-white/40 border border-white/10">
                Partner Desk
              </span>
            </div>
          </div>

          {session && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
                <Shield className="w-3.5 h-3.5 text-[#e0231c]" />
                <span>{session.email}</span>
              </div>

              <form action="/api/admin/logout" method="POST">
                <button
                  type="submit"
                  id="admin-logout-btn"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-white/70 text-xs font-medium transition-colors border border-white/10 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
