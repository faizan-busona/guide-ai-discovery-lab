
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          avatar: string | null
          is_admin: boolean
          blocked: boolean
          created_at: string
        }
        Insert: {
          id: string
          name: string
          avatar?: string | null
          is_admin?: boolean
          blocked?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string | null
          is_admin?: boolean
          blocked?: boolean
          created_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          name: string
          logo: string
          one_liner: string
          description: string
          tags: string[]
          price: string
          external_link: string
          video_link: string | null
          view_count: number
          featured: boolean
          hidden: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo: string
          one_liner: string
          description: string
          tags: string[]
          price: string
          external_link: string
          video_link?: string | null
          view_count?: number
          featured?: boolean
          hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          one_liner?: string
          description?: string
          tags?: string[]
          price?: string
          external_link?: string
          video_link?: string | null
          view_count?: number
          featured?: boolean
          hidden?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          linked_tags: string[]
          hidden: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          linked_tags: string[]
          hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          linked_tags?: string[]
          hidden?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          rating: number
          text: string
          hidden: boolean
          hidden_by: string | null
          hidden_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          rating: number
          text: string
          hidden?: boolean
          hidden_by?: string | null
          hidden_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          rating?: number
          text?: string
          hidden?: boolean
          hidden_by?: string | null
          hidden_at?: string | null
          created_at?: string
        }
      }
      tool_categories: {
        Row: {
          id: string
          tool_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          category_id?: string
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
