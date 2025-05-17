import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase-types';

type Opportunity = Database['public']['Tables']['opportunities']['Row'];
type NewOpportunity = Database['public']['Tables']['opportunities']['Insert'];

export const opportunitiesService = {
  async getAllOpportunities() {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOpportunityById(id: string) {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createOpportunity(opportunity: NewOpportunity) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([opportunity])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOpportunity(id: string, updates: Partial<Opportunity>) {
    const { data, error } = await supabase
      .from('opportunities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteOpportunity(id: string) {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getOpportunitiesByType(type: Opportunity['type']) {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
}; 