'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event, SponsorshipTier } from '@/lib/types';
import { Calendar, MapPin, Users, ArrowLeft, Send } from 'lucide-react';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTier, setSelectedTier] = useState<SponsorshipTier | null>(null);
  const [proposalMessage, setProposalMessage] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('organizer_events');
    if (stored) {
      const events = JSON.parse(stored);
      const found = events.find((e) => e.id === params.id);
      setEvent(found || null);
      if (found?.sponsorshipTiers.length > 0) {
        setSelectedTier(found.sponsorshipTiers[0]);
      }
    }
  }, [params.id]);

  const handleSubmitProposal = async () => {
    if (!selectedTier && !customAmount) {
      alert('Please select a tier or enter a custom amount');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Save proposal to localStorage
      const existingProposals = localStorage.getItem('sponsor_proposals');
      const proposals = existingProposals ? JSON.parse(existingProposals) : [];

      const newProposal = {
        id: `prop_${Date.now()}`,
        eventId: params.id,
        sponsorId: 'current_sponsor',
        tierId: selectedTier?.id,
        customAmount: customAmount ? parseInt(customAmount) : selectedTier?.amount,
        requestedBenefits: selectedTier?.benefits || [],
        message: proposalMessage,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      proposals.push(newProposal);
      localStorage.setItem('sponsor_proposals', JSON.stringify(proposals));

      alert('Proposal sent successfully!');
      router.push('/sponsor/my-sponsorships');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Event not found</p>
        <Link href="/sponsor/discover-events">
          <Button className="mt-4 bg-secondary hover:bg-yellow-600 text-secondary-foreground">
            Back to Events
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <Link href="/sponsor/discover-events">
        <Button variant="ghost" className="text-accent hover:bg-surface mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
      </Link>

      {/* Event Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-display font-bold">{event.title}</h1>
        <p className="text-lg text-muted-foreground">{event.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-5 h-5 text-accent" />
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-5 h-5 text-accent" />
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-muted-foreground">Attendees</p>
              <p className="font-medium text-foreground">{event.expectedAttendees}</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">Target Audience</p>
            <p className="font-medium text-foreground">{event.targetAudience}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sponsorship Tiers */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-display font-semibold">Sponsorship Tiers</h2>
          <div className="space-y-4">
            {event.sponsorshipTiers.map((tier) => (
              <Card
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`p-6 cursor-pointer transition-all ${
                  selectedTier?.id === tier.id
                    ? 'border-accent bg-surface'
                    : 'border-border hover:border-accent'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                    <p className="text-3xl font-bold text-accent mt-2">${tier.amount.toLocaleString()}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    {tier.availableSlots - tier.filledSlots} available
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Benefits Included:</p>
                  <ul className="space-y-2">
                    {(tier.benefits || []).map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground">
                        <span className="text-accent">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Proposal Form */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border p-6 sticky top-24 space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Send Proposal</h3>

            <div className="space-y-3">
              <div>
                <Label className="text-foreground font-medium">Selected Tier</Label>
                <p className="mt-1 text-sm font-medium text-accent">
                  {selectedTier?.name} - ${selectedTier?.amount}
                </p>
              </div>

              <div>
                <Label htmlFor="customAmount" className="text-foreground font-medium">
                  Custom Amount (Optional)
                </Label>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="mt-2 bg-surface border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave blank to use tier amount
                </p>
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground font-medium">
                  Message to Organizer
                </Label>
                <textarea
                  id="message"
                  placeholder="Tell them why you're interested in sponsoring..."
                  value={proposalMessage}
                  onChange={(e) => setProposalMessage(e.target.value)}
                  className="mt-2 w-full p-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted-foreground"
                  rows={4}
                />
              </div>
            </div>

            <Button
              onClick={handleSubmitProposal}
              disabled={isSubmitting}
              className="w-full bg-secondary hover:bg-yellow-600 text-secondary-foreground"
            >
              {isSubmitting ? 'Sending...' : 'Send Proposal'}
              {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              The event organizer will review your proposal and contact you within 48 hours
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
