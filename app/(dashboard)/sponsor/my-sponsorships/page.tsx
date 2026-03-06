'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Proposal, Event } from '@/lib/types';
import { MessageCircle, CheckCircle, Clock } from 'lucide-react';

export default function MySponsorshipsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [events, setEvents] = useState<Map<string, Event>>(new Map());
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'negotiating' | 'agreed'>('all');

  useEffect(() => {
    // Load proposals
    const stored = localStorage.getItem('sponsor_proposals');
    if (stored) {
      setProposals(JSON.parse(stored));
    }

    // Load events for reference
    const storedEvents = localStorage.getItem('organizer_events');
    if (storedEvents) {
      const eventsList = JSON.parse(storedEvents);
      const eventMap = new Map();
      eventsList.forEach((e) => eventMap.set(e.id, e));
      setEvents(eventMap);
    }
  }, []);

  const filteredProposals = proposals.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
      case 'negotiating':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'agreed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
      case 'negotiating':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">My Sponsorships</h1>
        <p className="text-muted-foreground">Track your sponsorship proposals and agreements</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'accepted', 'negotiating', 'agreed'] as const).map((status) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            className={`capitalize ${
              filter === status
                ? 'bg-secondary hover:bg-yellow-600 text-secondary-foreground'
                : 'bg-surface border border-border text-foreground hover:border-accent'
            }`}
          >
            {status.replace('_', ' ')}
            {filter === status && (
              <span className="ml-2 text-sm">({filteredProposals.length})</span>
            )}
          </Button>
        ))}
      </div>

      {/* Sponsorships List */}
      <div className="space-y-4">
        {filteredProposals.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No {filter !== 'all' ? `${filter} ` : ''}sponsorships
            </p>
            <Link href="/sponsor/discover-events">
              <Button className="bg-secondary hover:bg-yellow-600 text-secondary-foreground">
                Discover Events
              </Button>
            </Link>
          </Card>
        ) : (
          filteredProposals.map((proposal) => {
            const event = events.get(proposal.eventId);
            return (
              <Card
                key={proposal.id}
                className="bg-card border-border p-6 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {event?.title || 'Unknown Event'}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(proposal.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(proposal.status)}`}
                        >
                          {proposal.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3">
                      {event?.location} • {new Date(event?.date || 0).toLocaleDateString()}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-muted-foreground text-sm">Sponsorship Amount</p>
                        <p className="text-2xl font-bold text-accent">
                          ${proposal.customAmount?.toLocaleString() || '0'}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground text-sm">Tier Selected</p>
                        <p className="font-medium text-foreground text-lg">
                          {event?.sponsorshipTiers.find((t) => t.id === proposal.tierId)?.name || 'Custom'}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground text-sm">Submitted</p>
                        <p className="font-medium text-foreground">
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {proposal.requestedBenefits && proposal.requestedBenefits.length > 0 && (
                      <div>
                        <p className="text-muted-foreground text-sm mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {proposal.requestedBenefits.map((benefit, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-lg text-xs bg-primary/10 text-primary">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {proposal.message && (
                      <div className="mt-4 p-4 bg-surface rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Your Message:</p>
                        <p className="text-foreground text-sm">{proposal.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="border-border text-foreground hover:bg-surface whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    {proposal.status === 'pending' && (
                      <Button variant="outline" className="border-border text-foreground hover:bg-surface">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
