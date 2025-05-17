import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase-types';

type SuccessStory = Database['public']['Tables']['success_stories']['Row'];
type NewSuccessStory = Database['public']['Tables']['success_stories']['Insert'];

export const successStoriesService = {
  async getAllStories() {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*, users(full_name, avatar_url)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getStoryById(id: string) {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*, users(full_name, avatar_url)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createStory(story: NewSuccessStory) {
    const { data, error } = await supabase
      .from('success_stories')
      .insert([story])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStory(id: string, updates: Partial<SuccessStory>) {
    const { data, error } = await supabase
      .from('success_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteStory(id: string) {
    const { error } = await supabase
      .from('success_stories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getStoriesByTag(tag: string) {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*, users(full_name, avatar_url)')
      .contains('tags', [tag])
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
}; 