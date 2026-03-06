'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, LogOut, Home, Plus } from 'lucide-react';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'organizer') {
      router.push('/login?redirect=organizer');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'organizer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/organizer" className="flex items-center gap-2">
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
            <Link href="/organizer">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
            </Link>

            <Link href="/organizer/my-events">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <Calendar className="w-4 h-4 mr-3" />
                My Events
              </Button>
            </Link>

            <Link href="/organizer/post-event">
              <Button className="w-full justify-start bg-secondary hover:bg-yellow-600 text-secondary-foreground">
                <Plus className="w-4 h-4 mr-3" />
                Post New Event
              </Button>
            </Link>

            <Link href="/organizer/sponsorship-requests">
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-surface hover:text-accent"
              >
                <Users className="w-4 h-4 mr-3" />
                Sponsorship Requests
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
