
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase-types';

type UserProfile = Database['public']['Tables']['users']['Row'];
type Education = Database['public']['Tables']['education']['Row'];
type UserSkill = Database['public']['Tables']['user_skills']['Row'];
type UserInterest = Database['public']['Tables']['user_interests']['Row'];

export const ProfileService = {
  // Get user profile data
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', userId)
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  // Get user education data
  getUserEducation: async (userId: string) => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return data as Education | null;
  },

  // Get user skills
  getUserSkills: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_skills')
      .select('skill')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(item => item.skill);
  },

  // Get user interests
  getUserInterests: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_interests')
      .select('interest')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(item => item.interest);
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
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({
          name: personalInfo.name,
          age: personalInfo.age,
          gender: personalInfo.gender,
          language: personalInfo.language,
          village: personalInfo.village,
          district: personalInfo.district,
          mobile: personalInfo.mobile,
          updated_at: new Date().toISOString(),
        })
        .eq('auth_id', userId)
        .select();

      if (error) throw error;
      return data[0];
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            auth_id: userId,
            name: personalInfo.name,
            age: personalInfo.age,
            gender: personalInfo.gender,
            language: personalInfo.language,
            village: personalInfo.village,
            district: personalInfo.district,
            mobile: personalInfo.mobile,
          }
        ])
        .select();

      if (error) throw error;
      return data[0];
    }
  },

  // Save education information
  saveEducationInfo: async (userId: string, educationInfo: {
    level: string;
    passing_year: string;
    institution: string;
    percentage: string;
  }) => {
    // Get user database ID from auth ID
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (!userData) {
      throw new Error('User not found');
    }

    // Check if education record already exists
    const { data: existingEducation } = await supabase
      .from('education')
      .select('id')
      .eq('user_id', userData.id)
      .single();

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

      if (error) throw error;
      return data[0];
    } else {
      // Create new education record
      const { data, error } = await supabase
        .from('education')
        .insert([
          {
            user_id: userData.id,
            level: educationInfo.level,
            passing_year: educationInfo.passing_year,
            institution: educationInfo.institution,
            percentage: educationInfo.percentage,
          }
        ])
        .select();

      if (error) throw error;
      return data[0];
    }
  },

  // Save skills
  saveSkills: async (userId: string, skills: string[]) => {
    // Get user database ID from auth ID
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (!userData) {
      throw new Error('User not found');
    }

    // Delete existing skills
    const { error: deleteError } = await supabase
      .from('user_skills')
      .delete()
      .eq('user_id', userData.id);

    if (deleteError) throw deleteError;

    // Add new skills
    if (skills.length > 0) {
      const skillsToInsert = skills.map(skill => ({
        user_id: userData.id,
        skill
      }));

      const { error } = await supabase
        .from('user_skills')
        .insert(skillsToInsert);

      if (error) throw error;
    }

    return true;
  },

  // Save interests and career goals
  saveInterests: async (
    userId: string, 
    interests: string[], 
    careerGoals: string, 
    digitalAccess: string, 
    relocation: string
  ) => {
    // Get user database ID from auth ID
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', userId)
      .single();

    if (!userData) {
      throw new Error('User not found');
    }

    // Update user record with career goals, digital access, and relocation preferences
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({
        career_goals: careerGoals,
        digital_access: digitalAccess,
        relocation: relocation,
      })
      .eq('id', userData.id);

    if (userUpdateError) throw userUpdateError;

    // Delete existing interests
    const { error: deleteError } = await supabase
      .from('user_interests')
      .delete()
      .eq('user_id', userData.id);

    if (deleteError) throw deleteError;

    // Add new interests
    if (interests.length > 0) {
      const interestsToInsert = interests.map(interest => ({
        user_id: userData.id,
        interest
      }));

      const { error } = await supabase
        .from('user_interests')
        .insert(interestsToInsert);

      if (error) throw error;
    }

    return true;
  },
};

export default ProfileService;
