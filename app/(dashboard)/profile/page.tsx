'use client';

import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Link as LinkIcon, FileText, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        website: user.website || '',
      });
    }
  }, [user, isAuthenticated, router]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateProfile({
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        website: formData.website,
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      {/* Profile Overview */}
      <Card className="bg-card border-border p-8 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-border">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="w-10 h-10 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{user.name}</h2>
            <p className="text-muted-foreground capitalize mt-1">{user.role} Account</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.verificationLevel === 'verified'
                  ? 'bg-green-500/20 text-green-400'
                  : user.verificationLevel === 'trusted'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {user.verificationLevel || 'unverified'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Member Since</p>
            <p className="text-lg font-semibold text-foreground mt-1">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Account Status</p>
            <p className="text-lg font-semibold text-accent mt-1">Active</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Verification</p>
            <p className="text-lg font-semibold text-foreground mt-1 capitalize">
              {user.verificationLevel || 'Pending'}
            </p>
          </div>
        </div>
      </Card>

      {/* Edit Profile Form */}
      <Card className="bg-card border-border p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-display font-semibold">Edit Profile</h3>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="border-accent text-accent hover:bg-surface"
            >
              Edit
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="mt-2 bg-surface border-border text-foreground disabled:opacity-50"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="mt-2 bg-surface border-border text-foreground disabled:opacity-50"
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-foreground font-medium flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Website
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              disabled={!isEditing}
              className="mt-2 bg-surface border-border text-foreground disabled:opacity-50"
            />
          </div>

          <div>
            <Label htmlFor="bio" className="text-foreground font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Bio
            </Label>
            <textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              className="mt-2 w-full p-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted-foreground disabled:opacity-50"
              rows={4}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-secondary hover:bg-yellow-600 text-secondary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-surface"
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Security Section */}
      <Card className="bg-card border-border p-8 space-y-4">
        <h3 className="text-xl font-display font-semibold">Security</h3>
        <p className="text-muted-foreground text-sm">Manage your account security settings</p>
        <Button variant="outline" className="border-border text-foreground hover:bg-surface">
          Change Password
        </Button>
      </Card>
    </div>
  );
}
