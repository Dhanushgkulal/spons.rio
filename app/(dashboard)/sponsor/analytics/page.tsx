'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Award, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const spendData = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 8000 },
  { month: 'Mar', amount: 6500 },
  { month: 'Apr', amount: 9000 },
  { month: 'May', amount: 7500 },
  { month: 'Jun', amount: 11000 },
];

const roiData = [
  { month: 'Jan', roi: 120 },
  { month: 'Feb', roi: 135 },
  { month: 'Mar', roi: 128 },
  { month: 'Apr', roi: 150 },
  { month: 'May', roi: 142 },
  { month: 'Jun', roi: 165 },
];

const categoryData = [
  { name: 'Tech Conferences', value: 35000 },
  { name: 'Trade Shows', value: 28000 },
  { name: 'Sports Events', value: 18000 },
  { name: 'Community Events', value: 12000 },
];

const COLORS = ['#F59E0B', '#1F6FEB', '#6E40AA', '#10B981'];

export default function AnalyticsPage() {
  const stats = [
    {
      label: 'Total Invested',
      value: '$93,500',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      label: 'Active Partnerships',
      value: '8',
      change: '+2',
      icon: Award,
    },
    {
      label: 'Avg ROI',
      value: '142%',
      change: '+15%',
      icon: TrendingUp,
    },
    {
      label: 'Brand Reach',
      value: '125K+',
      change: '+32K',
      icon: Target,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">Analytics & ROI</h1>
        <p className="text-muted-foreground">Track your sponsorship performance and impact</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-card border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <p className="text-xs text-accent mt-2">{stat.change}</p>
                </div>
                <Icon className="w-8 h-8 text-accent opacity-20" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="month" stroke="#8B949E" />
              <YAxis stroke="#8B949E" />
              <Tooltip
                contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D' }}
                labelStyle={{ color: '#E8EAED' }}
              />
              <Bar dataKey="amount" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* ROI Trend */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">ROI Trend (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="month" stroke="#8B949E" />
              <YAxis stroke="#8B949E" />
              <Tooltip
                contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D' }}
                labelStyle={{ color: '#E8EAED' }}
              />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#1F6FEB"
                strokeWidth={2}
                dot={{ fill: '#1F6FEB' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value / 1000}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D' }}
                labelStyle={{ color: '#E8EAED' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Event Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'TechConf 2024', roi: '185%', budget: '$15,000', reach: '8,500' },
              { name: 'WebDev Expo', roi: '142%', budget: '$12,000', reach: '6,200' },
              { name: 'StartupPitch', roi: '125%', budget: '$8,500', reach: '3,100' },
            ].map((event, idx) => (
              <div key={idx} className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{event.name}</h4>
                  <span className="text-sm font-bold text-accent">{event.roi}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="text-foreground">{event.budget}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Est. Reach</p>
                    <p className="text-foreground">{event.reach}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
