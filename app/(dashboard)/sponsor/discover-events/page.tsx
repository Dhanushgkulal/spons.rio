'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Event } from '@/lib/types';
import { Search, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

export default function DiscoverEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');

  useEffect(() => {
    // Load events from localStorage
    const stored = localStorage.getItem('organizer_events');
    if (stored) {
      const allEvents = JSON.parse(stored);
      setEvents(allEvents.filter((e) => e.status === 'published'));
    }
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = !eventTypeFilter || event.eventType === eventTypeFilter;

    return matchesSearch && matchesType;
  });

  const eventTypes = [...new Set(events.map((e) => e.eventType))];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Discover Events</h1>
        <p className="text-muted-foreground">Find sponsorship opportunities that match your brand</p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by event name, location, or audience..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground"
          />
        </div>

        {eventTypes.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setEventTypeFilter('')}
              className={`${
                !eventTypeFilter
                  ? 'bg-secondary hover:bg-yellow-600 text-secondary-foreground'
                  : 'bg-surface border border-border text-foreground hover:border-accent'
              }`}
            >
              All Types
            </Button>
            {eventTypes.map((type) => (
              <Button
                key={type}
                onClick={() => setEventTypeFilter(type)}
                className={`${
                  eventTypeFilter === type
                    ? 'bg-secondary hover:bg-yellow-600 text-secondary-foreground'
                    : 'bg-surface border border-border text-foreground hover:border-accent'
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Card className="bg-card border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No events matching your search</p>
          {searchQuery || eventTypeFilter ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setEventTypeFilter('');
              }}
              className="border-border text-foreground hover:bg-surface"
            >
              Clear Filters
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">Check back soon for new opportunities</p>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-card border-border hover:border-accent transition-colors overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{event.description}</p>
                  </div>
                  <Link href={`/sponsor/event-detail/${event.id}`}>
                    <Button className="bg-secondary hover:bg-yellow-600 text-secondary-foreground whitespace-nowrap">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Event Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{event.expectedAttendees} attendees</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="px-2 py-1 rounded-lg bg-accent/10 text-accent">{event.eventType}</span>
                  </div>
                </div>

                {/* Sponsorship Tiers */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Available Sponsorship Tiers:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {event.sponsorshipTiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="p-4 rounded-lg bg-surface border border-border hover:border-accent transition-colors"
                      >
                        <h4 className="font-semibold text-foreground">{tier.name}</h4>
                        <p className="text-2xl font-bold text-accent mt-1">${tier.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {tier.availableSlots - tier.filledSlots} / {tier.availableSlots} slots available
                        </p>
                        <div className="mt-3 space-y-1">
                          {(tier.benefits || []).slice(0, 2).map((benefit, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                              <span className="text-accent">•</span> {benefit}
                            </p>
                          ))}
                          {(tier.benefits || []).length > 2 && (
                            <p className="text-xs text-accent font-medium">
                              +{(tier.benefits || []).length - 2} more benefits
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
