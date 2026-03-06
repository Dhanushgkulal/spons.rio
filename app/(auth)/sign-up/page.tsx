'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, isLoading } = useAuth();

  const initialRole = (searchParams.get('role') as UserRole) || 'organizer';
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !name || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(email, password, name, role);
      router.push(role === 'organizer' ? '/organizer' : '/sponsor');
    } catch (err) {
      setError((err as Error).message || 'Signup failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setRole('organizer')}
          className={`p-4 rounded-lg border-2 transition-all ${
            role === 'organizer'
              ? 'border-accent bg-surface'
              : 'border-border hover:border-accent'
          }`}
        >
          <div className="font-semibold text-sm">Event Organizer</div>
          <div className="text-xs text-muted-foreground">Post & manage events</div>
        </button>
        <button
          onClick={() => setRole('sponsor')}
          className={`p-4 rounded-lg border-2 transition-all ${
            role === 'sponsor'
              ? 'border-accent bg-surface'
              : 'border-border hover:border-accent'
          }`}
        >
          <div className="font-semibold text-sm">Sponsor</div>
          <div className="text-xs text-muted-foreground">Find events to sponsor</div>
        </button>
      </div>

      {/* Sign Up Form */}
      <Card className="bg-card border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 bg-surface border-border text-foreground"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-surface border-border text-foreground"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-surface border-border text-foreground"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 bg-surface border-border text-foreground"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-yellow-600 text-secondary-foreground"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>
      </Card>

      {/* Sign In Link */}
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-accent hover:underline font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
