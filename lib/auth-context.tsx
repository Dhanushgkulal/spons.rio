'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from './types';
import { findMockAccount } from './mock-accounts';

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('sb_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Check if account exists in mock accounts
      const mockAccount = findMockAccount(email, password);
      
      const newUser: UserProfile = mockAccount
        ? {
            id: mockAccount.id,
            email: mockAccount.email,
            name: mockAccount.name,
            role: mockAccount.role,
            verificationLevel: 'verified',
            createdAt: new Date(),
          }
        : {
            id: `user_${Date.now()}`,
            email,
            name: email.split('@')[0],
            role,
            verificationLevel: 'unverified',
            createdAt: new Date(),
          };

      setUser(newUser);
      localStorage.setItem('sb_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        email,
        name,
        role,
        verificationLevel: 'unverified',
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem('sb_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sb_user');
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...profile };
      setUser(updated);
      localStorage.setItem('sb_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
