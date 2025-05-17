import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        console.log('Fetching session...');
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error.message);
          throw error;
        }
        console.log('Session data:', data);
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error: any) {
        console.error('Error fetching session:', error.message);
        toast({
          title: "Session Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth state changed: ${event}`, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Sign in error:', error.message);
        throw error;
      }
      console.log('Sign in successful:', data);
      toast({
        title: "Welcome back!",
        description: "Welcome back to NammaDisha!",
      });
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting sign up...');
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Sign up error:', error.message);
        throw error;
      }
      console.log('Sign up successful:', data);
      toast({
        title: "Registration successful",
        description: "Please check your email for verification",
      });
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      console.log('Attempting sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error.message);
        throw error;
      }
      console.log('Sign out successful');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      console.error('Sign out error:', error.message);
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
