import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase-types';

type UserProfile = Database['public']['Tables']['users']['Row'];
type Education = Database['public']['Tables']['education']['Row'];
type UserSkill = Database['public']['Tables']['user_skills']['Row'];
type UserInterest = Database['public']['Tables']['user_interests']['Row'];

export const ProfileService = {
  // Get user profile data
  getUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      return data as UserProfile;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      throw error;
    }
  },

  // Get user education data
  getUserEducation: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching education:', error);
        throw error;
      }
      return data as Education | null;
    } catch (error) {
      console.error('Error in getUserEducation:', error);
      throw error;
    }
  },

  // Get user skills
  getUserSkills: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('skill')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching skills:', error);
        throw error;
      }
      return data.map(item => item.skill);
    } catch (error) {
      console.error('Error in getUserSkills:', error);
      throw error;
    }
  },

  // Get user interests
  getUserInterests: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_interests')
        .select('interest')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching interests:', error);
        throw error;
      }
      return data.map(item => item.interest);
    } catch (error) {
      console.error('Error in getUserInterests:', error);
      throw error;
    }
  },

  // Save personal information
  savePersonalInfo: async (userId: string, personalInfo: {
    name: string;
    age: number;
    gender: string;
    language: string;
    village: string;
    district: string;
    mobile: string;
  }) => {
    try {
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing user:', checkError);
        throw checkError;
      }

      if (existingUser) {
        // Update existing user
        const { data, error } = await supabase
          .from('users')
          .update({
            full_name: personalInfo.name,
            age: personalInfo.age,
            gender: personalInfo.gender,
            language: personalInfo.language,
            village: personalInfo.village,
            district: personalInfo.district,
            mobile: personalInfo.mobile,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)
          .select();

        if (error) {
          console.error('Error updating user:', error);
          throw error;
        }
        return data[0];
      } else {
        // Create new user
        const { data, error } = await supabase
          .from('users')
          .insert([
            {
              id: userId,
              full_name: personalInfo.name,
              age: personalInfo.age,
              gender: personalInfo.gender,
              language: personalInfo.language,
              village: personalInfo.village,
              district: personalInfo.district,
              mobile: personalInfo.mobile,
            }
          ])
          .select();

        if (error) {
          console.error('Error creating user:', error);
          throw error;
        }
        return data[0];
      }
    } catch (error) {
      console.error('Error in savePersonalInfo:', error);
      throw error;
    }
  },

  // Save education information
  saveEducationInfo: async (userId: string, educationInfo: {
    level: string;
    passing_year: string;
    institution: string;
    percentage: string;
  }) => {
    try {
      // Check if education record already exists
      const { data: existingEducation, error: checkError } = await supabase
        .from('education')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing education:', checkError);
        throw checkError;
      }

      if (existingEducation) {
        // Update existing education
        const { data, error } = await supabase
          .from('education')
          .update({
            level: educationInfo.level,
            passing_year: educationInfo.passing_year,
            institution: educationInfo.institution,
            percentage: educationInfo.percentage,
          })
          .eq('id', existingEducation.id)
          .select();

        if (error) {
          console.error('Error updating education:', error);
          throw error;
        }
        return data[0];
      } else {
        // Create new education record
        const { data, error } = await supabase
          .from('education')
          .insert([
            {
              user_id: userId,
              level: educationInfo.level,
              passing_year: educationInfo.passing_year,
              institution: educationInfo.institution,
              percentage: educationInfo.percentage,
            }
          ])
          .select();

        if (error) {
          console.error('Error creating education:', error);
          throw error;
        }
        return data[0];
      }
    } catch (error) {
      console.error('Error in saveEducationInfo:', error);
      throw error;
    }
  },

  // Save skills
  saveSkills: async (userId: string, skills: string[]) => {
    try {
      // Delete existing skills
      const { error: deleteError } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        console.error('Error deleting skills:', deleteError);
        throw deleteError;
      }

      // Add new skills
      if (skills.length > 0) {
        const skillsToInsert = skills.map(skill => ({
          user_id: userId,
          skill
        }));

        const { error } = await supabase
          .from('user_skills')
          .insert(skillsToInsert);

        if (error) {
          console.error('Error inserting skills:', error);
          throw error;
        }
      }

      return true;
    } catch (error) {
      console.error('Error in saveSkills:', error);
      throw error;
    }
  },

  // Save interests
  saveInterests: async (userId: string, interests: string[]) => {
    try {
      // Delete existing interests
      const { error: deleteError } = await supabase
        .from('user_interests')
        .delete()
        .eq('user_id', userId);

      if (deleteError) {
        console.error('Error deleting interests:', deleteError);
        throw deleteError;
      }

      // Add new interests
      if (interests.length > 0) {
        const interestsToInsert = interests.map(interest => ({
          user_id: userId,
          interest
        }));

        const { error } = await supabase
          .from('user_interests')
          .insert(interestsToInsert);

        if (error) {
          console.error('Error inserting interests:', error);
          throw error;
        }
      }

      return true;
    } catch (error) {
      console.error('Error in saveInterests:', error);
      throw error;
    }
  }
};

export default ProfileService;
