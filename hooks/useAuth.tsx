import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User as AppUser } from '../types';
import { useNotification } from './useNotification';

// Mock user data for when the user is "logged in"
const MOCK_USER: AppUser = {
  uid: 'mock-user-123',
  displayName: 'Praia User',
  email: 'user@praia.ai',
  photoURL: 'https://i.imgur.com/83dv4n8.png',
};

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAdmin: boolean;
  login: (from?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(false); // No initial loading without Firebase
  const [isAdmin, setIsAdmin] = useState(false);
  const { addNotification } = useNotification();

  const login = async (from: string = '/') => {
    setLoading(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(MOCK_USER);
    // A mock admin for testing purposes
    const adminEmail = process.env.ADMIN_EMAIL;
    setIsAdmin(!!adminEmail && MOCK_USER.email === adminEmail);
    sessionStorage.setItem('authRedirectPath', from);
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
    addNotification('You have been logged out.', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
