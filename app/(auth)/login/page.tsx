'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('organizer');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password, role);
      router.push(role === 'organizer' ? '/organizer' : '/sponsor');
    } catch (err) {
      setError((err as Error).message || 'Login failed');
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
          <div className="text-xs text-muted-foreground">Sign in as organizer</div>
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
          <div className="text-xs text-muted-foreground">Sign in as sponsor</div>
        </button>
      </div>

      {/* Login Form */}
      <Card className="bg-card border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLoading ? 'Signing In...' : 'Sign In'}
            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>
      </Card>

      {/* Sign Up Link */}
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link
          href={`/sign-up?role=${role}`}
          className="text-accent hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
