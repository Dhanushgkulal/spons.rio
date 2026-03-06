'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, AlertCircle, Award } from 'lucide-react';

export default function SponsorDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Active Sponsorships',
      value: 3,
      icon: Award,
    },
    {
      label: 'Total Spent',
      value: '$35,000',
      icon: TrendingUp,
    },
    {
      label: 'Pending Proposals',
      value: 2,
      icon: AlertCircle,
    },
    {
      label: 'ROI Tracked',
      value: '142%',
      icon: Target,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Discover sponsorship opportunities and manage your partnerships</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-card border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-accent opacity-20" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/sponsor/discover-events">
            <Card className="bg-card border-border p-6 hover:border-accent cursor-pointer transition-colors">
              <Compass className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground">Discover Events</h3>
              <p className="text-sm text-muted-foreground mt-1">Find new sponsorship opportunities</p>
            </Card>
          </Link>

          <Link href="/sponsor/my-sponsorships">
            <Card className="bg-card border-border p-6 hover:border-accent cursor-pointer transition-colors">
              <Award className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground">My Sponsorships</h3>
              <p className="text-sm text-muted-foreground mt-1">Track your active partnerships</p>
            </Card>
          </Link>

          <Link href="/sponsor/analytics">
            <Card className="bg-card border-border p-6 hover:border-accent cursor-pointer transition-colors">
              <TrendingUp className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground">Analytics</h3>
              <p className="text-sm text-muted-foreground mt-1">Measure ROI and impact</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { title: 'Proposal Accepted', desc: 'Your proposal for TechConf 2024 was accepted', time: '2 hours ago' },
            { title: 'New Event Posted', desc: 'New sponsorship opportunity: Innovation Summit 2024', time: '1 day ago' },
            { title: 'Proposal Sent', desc: 'You sent a proposal for WebDev Expo', time: '3 days ago' },
          ].map((activity, idx) => (
            <Card key={idx} className="bg-card border-border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-foreground">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Compass } from 'lucide-react';
