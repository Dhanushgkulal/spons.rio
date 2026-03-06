// User Types
export type UserRole = 'organizer' | 'sponsor';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  website?: string;
  verificationLevel?: 'unverified' | 'verified' | 'trusted';
  createdAt: Date;
}

// Event Types
export interface SponsorshipTier {
  id: string;
  name: string;
  amount: number;
  currency: string;
  benefits: string[];
  availableSlots: number;
  filledSlots: number;
}

export interface Event {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  eventType: string;
  date: Date;
  location: string;
  expectedAttendees: number;
  targetAudience: string;
  sponsorshipTiers: SponsorshipTier[];
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Proposal Types
export interface Proposal {
  id: string;
  eventId: string;
  sponsorId: string;
  tierId?: string;
  customAmount?: number;
  requestedBenefits?: string[];
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating' | 'agreed';
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export interface MessageThread {
  id: string;
  participantIds: string[];
  eventId: string;
  proposalId?: string;
  lastMessage?: Message;
  lastMessageAt: Date;
  createdAt: Date;
}

// Deal Types
export interface Deal {
  id: string;
  proposalId: string;
  eventId: string;
  sponsorId: string;
  organizerId: string;
  agreedAmount: number;
  agreedBenefits: string[];
  counterOffers: CounterOffer[];
  status: 'negotiating' | 'agreed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CounterOffer {
  id: string;
  offeredBy: string; // userId
  amount: number;
  benefits: string[];
  message?: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

// Review Types
export interface Review {
  id: string;
  eventId: string;
  reviewerId: string;
  reviewerRole: UserRole;
  targetUserId: string;
  rating: number;
  categories: {
    communication: number;
    professionalism: number;
    reliability: number;
    value: number;
  };
  comment: string;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'proposal' | 'message' | 'deal' | 'review' | 'event' | 'general';
  title: string;
  message: string;
  read: boolean;
  relatedId?: string;
  createdAt: Date;
}

// Analytics Types
export interface SponsorAnalytics {
  totalSpent: number;
  activeDeals: number;
  completedDeals: number;
  averageRating: number;
  eventsByMonth: Array<{ month: string; count: number }>;
  spendByCategory: Array<{ category: string; amount: number }>;
}

export interface OrganizerAnalytics {
  totalRaised: number;
  eventsHosted: number;
  averageRating: number;
  sponsorsReached: number;
  dealsCompleted: number;
  revenueTrend: Array<{ month: string; revenue: number }>;
}
