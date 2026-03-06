'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Event } from '@/lib/types';
import { Edit, Eye, MoreHorizontal } from 'lucide-react';

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('organizer_events');
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">My Events</h1>
        <p className="text-muted-foreground">Manage and track all your sponsored events</p>
      </div>

      {events.length === 0 ? (
        <Card className="bg-card border-border p-12 text-center">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">No events posted yet</p>
            <Link href="/organizer/post-event">
              <Button className="bg-secondary hover:bg-yellow-600 text-secondary-foreground">
                Post Your First Event
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-card border-border p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{event.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Attendees</p>
                      <p className="font-medium text-foreground">{event.expectedAttendees}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sponsorship Tiers</p>
                      <p className="font-medium text-foreground">{event.sponsorshipTiers.length}</p>
                    </div>
                  </div>

                  {/* Tier Preview */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Sponsorship Tiers:</p>
                    <div className="flex flex-wrap gap-2">
                      {event.sponsorshipTiers.map((tier) => (
                        <span
                          key={tier.id}
                          className="px-3 py-1 rounded-lg text-xs bg-accent/10 text-accent"
                        >
                          {tier.name}: ${tier.amount}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/organizer/my-events/${event.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-foreground hover:bg-surface hover:text-accent"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:bg-surface hover:text-accent"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
