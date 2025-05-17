import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase-types';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client with error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection and log any errors
const testConnection = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Supabase connection error:', error.message);
      throw error;
    }
    console.log('Supabase connected successfully');
    return session;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    throw error;
  }
};

// Initialize connection
testConnection().catch(console.error);

// Auth helpers with better error handling
export const signUp = async (email: string, password: string) => {
  try {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
  const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
  return { error };
  }
};

export const getCurrentUser = async () => {
  try {
  const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
  return { 
    user: data?.session?.user || null,
      error: null 
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return { 
      user: null,
    error 
  };
  }
};

export const createCareerGuidanceSession = async (sessionData: {
  user_id: string;
  date: string;
  time: string;
  topic: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}) => {
  const { data, error } = await supabase
    .from('career_guidance_sessions')
    .insert([sessionData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserCareerGuidanceSessions = async (userId: string) => {
  const { data, error } = await supabase
    .from('career_guidance_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) throw error;
  return data;
};
