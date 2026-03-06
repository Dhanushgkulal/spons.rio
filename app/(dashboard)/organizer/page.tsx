'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Event } from '@/lib/types';
import { TrendingUp, Users, FileText, AlertCircle } from 'lucide-react';

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Load events from localStorage
    const stored = localStorage.getItem('organizer_events');
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  const stats = [
    {
      label: 'Active Events',
      value: events.filter((e) => e.status === 'published').length,
      icon: FileText,
    },
    {
      label: 'Total Sponsors',
      value: Math.floor(Math.random() * 150) + 50,
      icon: Users,
    },
    {
      label: 'Pending Requests',
      value: Math.floor(Math.random() * 20) + 5,
      icon: AlertCircle,
    },
    {
      label: 'Revenue Generated',
      value: `$${Math.floor(Math.random() * 50000) + 10000}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Manage your events and sponsorship deals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-card border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-accent opacity-20" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/organizer/post-event">
            <Card className="bg-card border-border p-6 hover:border-accent cursor-pointer transition-colors">
              <FileText className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground">Post New Event</h3>
              <p className="text-sm text-muted-foreground mt-1">Create a new sponsorship opportunity</p>
            </Card>
          </Link>

          <Link href="/organizer/my-events">
            <Card className="bg-card border-border p-6 hover:border-accent cursor-pointer transition-colors">
              <FileText className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground">View My Events</h3>
              <p className="text-sm text-muted-foreground mt-1">Manage your posted events</p>
            </Card>
          </Link>

          <Link href="/organizer/sponsorship-requests">
            <Card className="bg-card border-border p-6 hover:border-accent cursor-pointer transition-colors">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground">Sponsorship Requests</h3>
              <p className="text-sm text-muted-foreground mt-1">Review sponsor applications</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold">Recent Events</h2>
        {events.length === 0 ? (
          <Card className="bg-card border-border p-8 text-center">
            <p className="text-muted-foreground mb-4">No events posted yet</p>
            <Link href="/organizer/post-event">
              <Button className="bg-secondary hover:bg-yellow-600 text-secondary-foreground">
                Post Your First Event
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4">
            {events.slice(0, 3).map((event) => (
              <Card key={event.id} className="bg-card border-border p-6 hover:border-accent transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent">
                        {event.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {event.sponsorshipTiers.length} tiers
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
