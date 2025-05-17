
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase-types';

// Default values for development - these will be used if env vars aren't set
const DEFAULT_SUPABASE_URL = 'https://iiydujuzoaidwmjzpgvr.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpeWR1anV6b2FpZHdtanpwZ3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NTIzMDQsImV4cCI6MjAzMTUyODMwNH0.teewdIB3VN-t7D4P_h1V-fdW7Jdf7SQFZG6ltTJ2TbM';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Check for missing values and log warnings
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Using default Supabase credentials. For production, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { 
    user: data?.session?.user || null,
    error 
  };
};
