'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Proposal } from '@/lib/types';
import { Check, X, MessageCircle } from 'lucide-react';

// Mock data for demonstration
const mockProposals: Proposal[] = [
  {
    id: 'prop_1',
    eventId: 'event_1',
    sponsorId: 'sponsor_1',
    tierId: 'tier_1',
    customAmount: 5000,
    requestedBenefits: ['Booth space', 'Logo placement'],
    message: 'Interested in sponsoring your tech conference. We believe this aligns with our brand.',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'prop_2',
    eventId: 'event_1',
    sponsorId: 'sponsor_2',
    tierId: 'tier_2',
    customAmount: 10000,
    requestedBenefits: ['Speaking slot', 'Booth space', 'Logo placement', 'VIP table'],
    message: 'We would like to be a premium sponsor for this event.',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'prop_3',
    eventId: 'event_1',
    sponsorId: 'sponsor_3',
    tierId: 'tier_1',
    customAmount: 3000,
    requestedBenefits: ['Logo placement'],
    message: 'Small startup looking to get brand visibility.',
    status: 'accepted',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

export default function SponsorshipRequestsPage() {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const filteredProposals = proposals.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const handleAccept = (id: string) => {
    setProposals(proposals.map((p) => (p.id === id ? { ...p, status: 'accepted' as const } : p)));
  };

  const handleReject = (id: string) => {
    setProposals(proposals.map((p) => (p.id === id ? { ...p, status: 'rejected' as const } : p)));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'accepted':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Sponsorship Requests</h1>
        <p className="text-muted-foreground">Review and manage sponsor applications</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            className={`capitalize ${
              filter === status
                ? 'bg-secondary hover:bg-yellow-600 text-secondary-foreground'
                : 'bg-surface border border-border text-foreground hover:border-accent'
            }`}
          >
            {status}
            {filter === status && (
              <span className="ml-2 text-sm">
                ({filteredProposals.length})
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredProposals.length === 0 ? (
          <Card className="bg-card border-border p-12 text-center">
            <p className="text-muted-foreground">No {filter !== 'all' ? `${filter} ` : ''}sponsorship requests</p>
          </Card>
        ) : (
          filteredProposals.map((proposal) => (
            <Card
              key={proposal.id}
              className="bg-card border-border p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">Sponsor Company</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Proposed Amount</p>
                      <p className="text-2xl font-bold text-accent">${proposal.customAmount?.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Requested Benefits:</p>
                      <div className="flex flex-wrap gap-2">
                        {proposal.requestedBenefits?.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-xs bg-primary/10 text-primary"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {proposal.message && (
                      <div className="bg-surface p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Message:</p>
                        <p className="text-foreground text-sm">{proposal.message}</p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(proposal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {proposal.status === 'pending' && (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleAccept(proposal.id)}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 whitespace-nowrap"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(proposal.id)}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive/10 whitespace-nowrap"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border text-foreground hover:bg-surface whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                )}

                {proposal.status !== 'pending' && (
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-surface whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
