export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          avatar_url: string
          role: 'student' | 'parent' | 'teacher' | 'admin'
          age: number | null
          gender: string | null
          language: string | null
          village: string | null
          district: string | null
          mobile: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name: string
          avatar_url?: string
          role?: 'student' | 'parent' | 'teacher' | 'admin'
          age?: number | null
          gender?: string | null
          language?: string | null
          village?: string | null
          district?: string | null
          mobile?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
          role?: 'student' | 'parent' | 'teacher' | 'admin'
          age?: number | null
          gender?: string | null
          language?: string | null
          village?: string | null
          district?: string | null
          mobile?: string | null
          updated_at?: string | null
        }
      }
      education: {
        Row: {
          id: string
          user_id: string
          level: string
          passing_year: string
          institution: string
          percentage: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          level: string
          passing_year: string
          institution: string
          percentage: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          level?: string
          passing_year?: string
          institution?: string
          percentage?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          skill: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill?: string
          created_at?: string
        }
      }
      user_interests: {
        Row: {
          id: string
          user_id: string
          interest: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          interest: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          interest?: string
          created_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          organization: string
          location: string
          type: 'scholarship' | 'internship' | 'job' | 'workshop'
          deadline: string
          requirements: string[]
          contact_email: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          organization: string
          location: string
          type: 'scholarship' | 'internship' | 'job' | 'workshop'
          deadline: string
          requirements: string[]
          contact_email: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          organization?: string
          location?: string
          type?: 'scholarship' | 'internship' | 'job' | 'workshop'
          deadline?: string
          requirements?: string[]
          contact_email?: string
        }
      }
      opportunity_tags: {
        Row: {
          id: string
          opportunity_id: string
          tag: string
          created_at: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          tag: string
          created_at?: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          tag?: string
          created_at?: string
        }
      }
      opportunity_requirements: {
        Row: {
          id: string
          opportunity_id: string
          requirement: string
          created_at: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          requirement: string
          created_at?: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          requirement?: string
          created_at?: string
        }
      }
      success_stories: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          author_id: string
          image_url: string | null
          tags: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          author_id: string
          image_url?: string | null
          tags?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          author_id?: string
          image_url?: string | null
          tags?: string[]
        }
      }
      parents_guides: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          content: string
          image: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          content: string
          image: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          content?: string
          image?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
