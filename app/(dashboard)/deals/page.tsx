'use client';

import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Deal, CounterOffer } from '@/lib/types';
import { CheckCircle, Clock, AlertCircle, MessageCircle } from 'lucide-react';

// Mock deals data
const mockDeals: Deal[] = [
  {
    id: 'deal_1',
    proposalId: 'prop_1',
    eventId: 'event_1',
    sponsorId: 'sponsor_1',
    organizerId: 'org_1',
    agreedAmount: 10000,
    agreedBenefits: ['Booth space', 'Logo placement', 'Speaking slot'],
    counterOffers: [
      {
        id: 'counter_1',
        offeredBy: 'sponsor_1',
        amount: 8500,
        benefits: ['Booth space', 'Logo placement'],
        message: 'Can we reduce the amount slightly?',
        timestamp: new Date(Date.now() - 86400000),
        status: 'rejected',
      },
      {
        id: 'counter_2',
        offeredBy: 'org_1',
        amount: 10000,
        benefits: ['Booth space', 'Logo placement', 'Speaking slot'],
        message: 'Final offer with all benefits included',
        timestamp: new Date(Date.now() - 43200000),
        status: 'accepted',
      },
    ],
    status: 'agreed',
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    id: 'deal_2',
    proposalId: 'prop_2',
    eventId: 'event_2',
    sponsorId: 'sponsor_2',
    organizerId: 'org_1',
    agreedAmount: 0,
    agreedBenefits: [],
    counterOffers: [
      {
        id: 'counter_3',
        offeredBy: 'sponsor_2',
        amount: 5000,
        benefits: ['Logo placement'],
        message: 'Initial proposal',
        timestamp: new Date(Date.now() - 172800000),
        status: 'pending',
      },
    ],
    status: 'negotiating',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
];

export default function DealsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);
  const [counterAmount, setCounterAmount] = React.useState('');
  const [counterMessage, setCounterMessage] = React.useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agreed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'negotiating':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agreed':
        return 'bg-green-500/20 text-green-400';
      case 'negotiating':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSendCounterOffer = () => {
    if (!selectedDeal || (!counterAmount && !counterMessage)) return;
    // In a real app, this would send to backend
    alert('Counter-offer sent successfully!');
    setCounterAmount('');
    setCounterMessage('');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold">Deal Negotiation</h1>
          <p className="text-muted-foreground">Manage and negotiate your sponsorship agreements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deal List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-display font-semibold">Active Deals</h2>
            {mockDeals.map((deal) => (
              <Card
                key={deal.id}
                onClick={() => setSelectedDeal(deal)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedDeal?.id === deal.id
                    ? 'border-accent bg-surface'
                    : 'border-border hover:border-accent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Event {deal.eventId}</h3>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(deal.status)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Amount: ${deal.agreedAmount?.toLocaleString() || 'Negotiating'}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(deal.status)}`}>
                  {deal.status}
                </span>
              </Card>
            ))}
          </div>

          {/* Deal Details */}
          {selectedDeal ? (
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-semibold">Event: {selectedDeal.eventId}</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Agreement Status</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusIcon(selectedDeal.status)}
                        <span className={`text-sm font-semibold capitalize ${
                          selectedDeal.status === 'agreed' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {selectedDeal.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Current Amount</p>
                      <p className="text-2xl font-bold text-accent mt-1">
                        ${selectedDeal.agreedAmount?.toLocaleString() || 'Pending'}
                      </p>
                    </div>
                  </div>

                  {selectedDeal.agreedBenefits.length > 0 && (
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Agreed Benefits:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDeal.agreedBenefits.map((benefit, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-lg text-xs bg-green-500/20 text-green-400">
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Counter Offers Timeline */}
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Negotiation Timeline</h3>
                  
                  <div className="space-y-4">
                    {selectedDeal.counterOffers.map((offer, idx) => (
                      <div key={offer.id} className="p-4 bg-surface rounded-lg border border-border space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-foreground">
                              {offer.offeredBy === selectedDeal.sponsorId ? 'Sponsor' : 'Organizer'} Offer
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(offer.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                            offer.status === 'accepted'
                              ? 'bg-green-500/20 text-green-400'
                              : offer.status === 'rejected'
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {offer.status}
                          </span>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Amount</p>
                          <p className="text-xl font-bold text-accent">${offer.amount.toLocaleString()}</p>
                        </div>

                        {offer.benefits.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Benefits:</p>
                            <div className="flex flex-wrap gap-1">
                              {offer.benefits.map((benefit, bidx) => (
                                <span key={bidx} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {offer.message && (
                          <div className="p-3 bg-card rounded border border-border">
                            <p className="text-sm text-muted-foreground mb-1">Message:</p>
                            <p className="text-sm text-foreground">{offer.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Send Counter Offer */}
                {selectedDeal.status === 'negotiating' && (
                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Send Counter Offer</h3>

                    <div>
                      <Label htmlFor="counterAmount" className="text-foreground">
                        Proposed Amount
                      </Label>
                      <Input
                        id="counterAmount"
                        type="number"
                        placeholder="e.g., 9500"
                        value={counterAmount}
                        onChange={(e) => setCounterAmount(e.target.value)}
                        className="mt-2 bg-surface border-border text-foreground"
                      />
                    </div>

                    <div>
                      <Label htmlFor="counterMessage" className="text-foreground">
                        Message
                      </Label>
                      <textarea
                        id="counterMessage"
                        placeholder="Explain your counter-offer..."
                        value={counterMessage}
                        onChange={(e) => setCounterMessage(e.target.value)}
                        className="mt-2 w-full p-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted-foreground"
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={handleSendCounterOffer}
                      className="w-full bg-secondary hover:bg-yellow-600 text-secondary-foreground"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Counter Offer
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a deal to view and negotiate</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
