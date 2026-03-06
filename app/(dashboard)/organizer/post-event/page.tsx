'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event, SponsorshipTier } from '@/lib/types';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

export default function PostEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [expectedAttendees, setExpectedAttendees] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tiers, setTiers] = useState<Partial<SponsorshipTier>[]>([
    { name: '', amount: 0, currency: 'USD', benefits: [], availableSlots: 1, filledSlots: 0 },
  ]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTier = () => {
    setTiers([
      ...tiers,
      { name: '', amount: 0, currency: 'USD', benefits: [], availableSlots: 1, filledSlots: 0 },
    ]);
  };

  const handleRemoveTier = (idx: number) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter((_, i) => i !== idx));
    }
  };

  const handleTierChange = (idx: number, field: string, value: any) => {
    const updated = [...tiers];
    updated[idx] = { ...updated[idx], [field]: value };
    setTiers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !eventType || !date || !location) {
      setError('Please fill in all required fields');
      return;
    }

    if (tiers.some((t) => !t.name || !t.amount)) {
      setError('All sponsorship tiers must have a name and amount');
      return;
    }

    try {
      setIsSubmitting(true);

      const tiersWithIds = tiers.map((t) => ({
        ...t,
        id: `tier_${Date.now()}_${Math.random()}`,
      } as SponsorshipTier));

      const newEvent: Event = {
        id: `event_${Date.now()}`,
        organizerId: 'current_user',
        title,
        description,
        eventType,
        date: new Date(date),
        location,
        expectedAttendees: parseInt(expectedAttendees) || 0,
        targetAudience,
        sponsorshipTiers: tiersWithIds,
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to localStorage
      const existing = localStorage.getItem('organizer_events');
      const events = existing ? JSON.parse(existing) : [];
      events.push(newEvent);
      localStorage.setItem('organizer_events', JSON.stringify(events));

      router.push('/organizer/my-events');
    } catch (err) {
      setError((err as Error).message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Post New Event</h1>
        <p className="text-muted-foreground">Create a sponsorship opportunity for your event</p>
      </div>

      <Card className="bg-card border-border p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-semibold text-foreground">Event Details</h2>

            <div>
              <Label htmlFor="title" className="text-foreground font-medium">
                Event Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Tech Conference 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 bg-surface border-border text-foreground"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-foreground font-medium">
                Description *
              </Label>
              <textarea
                id="description"
                placeholder="Describe your event, target audience, and sponsorship value..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full p-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted-foreground"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventType" className="text-foreground font-medium">
                  Event Type *
                </Label>
                <Input
                  id="eventType"
                  placeholder="e.g., Conference, Meetup, Festival"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="mt-2 bg-surface border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-foreground font-medium">
                  Event Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 bg-surface border-border text-foreground"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-foreground font-medium">
                Location *
              </Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 bg-surface border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="attendees" className="text-foreground font-medium">
                  Expected Attendees
                </Label>
                <Input
                  id="attendees"
                  type="number"
                  placeholder="e.g., 500"
                  value={expectedAttendees}
                  onChange={(e) => setExpectedAttendees(e.target.value)}
                  className="mt-2 bg-surface border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="audience" className="text-foreground font-medium">
                  Target Audience
                </Label>
                <Input
                  id="audience"
                  placeholder="e.g., Tech professionals, startup founders"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="mt-2 bg-surface border-border text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Sponsorship Tiers */}
          <div className="space-y-6 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-semibold text-foreground">Sponsorship Tiers</h2>
              <Button
                type="button"
                onClick={handleAddTier}
                variant="outline"
                className="border-accent text-accent hover:bg-surface"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tier
              </Button>
            </div>

            {tiers.map((tier, idx) => (
              <Card key={idx} className="bg-surface border-border p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-foreground">Tier {idx + 1}</h3>
                  {tiers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTier(idx)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground font-medium">Tier Name</Label>
                    <Input
                      placeholder="e.g., Gold Sponsor"
                      value={tier.name || ''}
                      onChange={(e) => handleTierChange(idx, 'name', e.target.value)}
                      className="mt-2 bg-card border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Sponsorship Amount</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={tier.amount || ''}
                      onChange={(e) => handleTierChange(idx, 'amount', parseInt(e.target.value) || 0)}
                      className="mt-2 bg-card border-border text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-foreground font-medium">Benefits (comma-separated)</Label>
                  <textarea
                    placeholder="e.g., Booth space, Logo placement, Speaking slot"
                    value={(tier.benefits || []).join(', ')}
                    onChange={(e) =>
                      handleTierChange(
                        idx,
                        'benefits',
                        e.target.value.split(',').map((b) => b.trim())
                      )
                    }
                    className="mt-2 w-full p-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-foreground font-medium">Available Slots</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 3"
                    value={tier.availableSlots || ''}
                    onChange={(e) => handleTierChange(idx, 'availableSlots', parseInt(e.target.value) || 1)}
                    className="mt-2 bg-card border-border text-foreground"
                  />
                </div>
              </Card>
            ))}
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-8">
            <Button
              type="submit"
              className="bg-secondary hover:bg-yellow-600 text-secondary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Event'}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-border text-foreground hover:bg-surface"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
