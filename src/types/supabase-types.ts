
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
          name: string
          age: number | null
          gender: string | null
          language: string | null
          village: string | null
          district: string | null
          mobile: string | null
          created_at: string
          updated_at: string | null
          auth_id: string | null
        }
        Insert: {
          id?: string
          name: string
          age?: number | null
          gender?: string | null
          language?: string | null
          village?: string | null
          district?: string | null
          mobile?: string | null
          created_at?: string
          updated_at?: string | null
          auth_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          age?: number | null
          gender?: string | null
          language?: string | null
          village?: string | null
          district?: string | null
          mobile?: string | null
          created_at?: string
          updated_at?: string | null
          auth_id?: string | null
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
        }
        Insert: {
          id?: string
          user_id: string
          level: string
          passing_year: string
          institution: string
          percentage: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          level?: string
          passing_year?: string
          institution?: string
          percentage?: string
          created_at?: string
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
          title: string
          organization: string
          location: string
          category: string
          description: string
          deadline: string
          application_url: string
          email: string
          phone: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          organization: string
          location: string
          category: string
          description: string
          deadline: string
          application_url: string
          email: string
          phone: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          organization?: string
          location?: string
          category?: string
          description?: string
          deadline?: string
          application_url?: string
          email?: string
          phone?: string
          created_at?: string
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
          name: string
          age: number
          location: string
          image: string
          story: string
          occupation: string
          background: string
          journey: string
          advice: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          location: string
          image: string
          story: string
          occupation: string
          background: string
          journey: string
          advice: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          location?: string
          image?: string
          story?: string
          occupation?: string
          background?: string
          journey?: string
          advice?: string
          created_at?: string
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
