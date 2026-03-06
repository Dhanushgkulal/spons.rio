'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Briefcase, TrendingUp, LogOut, Home } from 'lucide-react';

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'sponsor') {
      router.push('/login?redirect=sponsor');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'sponsor') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/sponsor" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">SponsorBridge</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="text-foreground hover:bg-surface"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-border bg-card min-h-[calc(100vh-60px)]">
          <div className="p-6 space-y-2">
            <Link href="/sponsor">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
            </Link>

            <Link href="/sponsor/discover-events">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <Compass className="w-4 h-4 mr-3" />
                Discover Events
              </Button>
            </Link>

            <Link href="/sponsor/my-sponsorships">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <Briefcase className="w-4 h-4 mr-3" />
                My Sponsorships
              </Button>
            </Link>

            <Link href="/sponsor/analytics">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <TrendingUp className="w-4 h-4 mr-3" />
                Analytics
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
