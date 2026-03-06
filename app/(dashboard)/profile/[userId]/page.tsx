'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, MessageCircle, Globe, Star } from 'lucide-react';
import Link from 'next/link';

export default function PublicProfilePage({ params }: { params: { userId: string } }) {
  // Mock user data
  const mockUser = {
    id: params.userId,
    name: 'TechCorp Sponsors',
    role: 'sponsor',
    avatar: null,
    bio: 'Leading technology sponsor committed to supporting innovation through strategic partnerships.',
    website: 'https://techcorp.com',
    verificationLevel: 'verified' as const,
    rating: 4.8,
    reviewCount: 24,
    dealCount: 12,
    joinDate: '2023-06-15',
  };

  const mockReviews = [
    {
      id: '1',
      reviewer: 'John Smith',
      role: 'organizer' as const,
      rating: 5,
      title: 'Excellent Partner',
      comment: 'Great communication and followed through on all commitments.',
      date: '2024-01-15',
    },
    {
      id: '2',
      reviewer: 'Sarah Johnson',
      role: 'organizer' as const,
      rating: 4,
      title: 'Professional & Reliable',
      comment: 'Professional team and well-organized sponsorship.',
      date: '2024-01-10',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <Link href="/" className="text-accent hover:underline text-sm">
        ← Back
      </Link>

      {/* Profile Header */}
      <Card className="bg-card border-border p-8">
        <div className="flex items-start gap-8 mb-6">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <User className="w-12 h-12 text-accent" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold">{mockUser.name}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                ✓ {mockUser.verificationLevel}
              </span>
            </div>

            <p className="text-muted-foreground capitalize mb-4">{mockUser.role} Account</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <p className="text-muted-foreground text-sm">Member Since</p>
                <p className="font-semibold text-foreground">
                  {new Date(mockUser.joinDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Completed Deals</p>
                <p className="font-semibold text-foreground">{mockUser.dealCount}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(mockUser.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground ml-1">
                  {mockUser.rating} ({mockUser.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p className="text-foreground mb-6">{mockUser.bio}</p>

            <div className="flex gap-3">
              {mockUser.website && (
                <a href={mockUser.website} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-surface"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                </a>
              )}
              <Button className="bg-secondary hover:bg-yellow-600 text-secondary-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold">Reviews & Ratings</h2>

        {mockReviews.map((review) => (
          <Card key={review.id} className="bg-card border-border p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{review.title}</p>
                <p className="text-sm text-muted-foreground">
                  by {review.reviewer} • {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-foreground">{review.comment}</p>
          </Card>
        ))}
      </div>

      {/* About Section */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-muted-foreground text-sm">Verification Status</p>
            <p className="font-semibold text-foreground capitalize mt-1">
              {mockUser.verificationLevel}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Average Rating</p>
            <p className="font-semibold text-accent text-lg mt-1">{mockUser.rating}/5.0</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
