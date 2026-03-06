'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, BarChart3, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-accent">SponsorBridge</div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-border text-foreground hover:bg-surface">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-balance leading-tight">
              Connect Events with Brands
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              SponsorBridge is the premier marketplace connecting event organizers with sponsorship opportunities and brands seeking meaningful partnerships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up?role=organizer">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-secondary-foreground"
                >
                  I'm an Organizer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-up?role=sponsor">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-accent text-accent hover:bg-surface"
                >
                  I'm a Sponsor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">2,500+</div>
                <div className="text-sm text-muted-foreground">Active Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">1,800+</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">$50M+</div>
                <div className="text-sm text-muted-foreground">Deals Closed</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg p-12 aspect-square flex items-center justify-center overflow-hidden">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('/placeholder.jpg')" }}
              />
              {/* Overlay gradient for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40" />
              
              {/* Content */}
              <div className="relative z-10 text-center space-y-4">
                <Sparkles className="w-24 h-24 text-primary mx-auto drop-shadow-lg" />
                <p className="text-primary text-lg font-semibold drop-shadow">Premium Sponsorship Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">Why Choose SponsorBridge?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Organizers */}
            <Card className="bg-surface border-border p-8 hover:border-accent transition-colors">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-display font-semibold mb-3">For Organizers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Post events with custom sponsorship tiers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Manage sponsorship requests easily</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Negotiate deals directly in-app</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Access sponsor analytics</span>
                </li>
              </ul>
            </Card>

            {/* For Sponsors */}
            <Card className="bg-surface border-border p-8 hover:border-accent transition-colors">
              <BarChart3 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-display font-semibold mb-3">For Sponsors</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Discover curated event opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Custom proposals and negotiation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Track ROI and engagement metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Real-time deal management</span>
                </li>
              </ul>
            </Card>

            {/* Platform Benefits */}
            <Card className="bg-surface border-border p-8 hover:border-accent transition-colors">
              <Sparkles className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-display font-semibold mb-3">Platform Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Secure messaging & negotiations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Verified user profiles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Post-event reviews & ratings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>24/7 support & resources</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background border-t border-border py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-display font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of event organizers and sponsors already using SponsorBridge to create meaningful partnerships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up?role=organizer">
              <Button size="lg" className="bg-secondary hover:bg-yellow-600 text-secondary-foreground w-full sm:w-auto">
                Create Event <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/sign-up?role=sponsor">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-surface w-full sm:w-auto">
                Explore Events <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 SponsorBridge. All rights reserved. | Connecting events with brands.</p>
        </div>
      </footer>
    </main>
  );
}
