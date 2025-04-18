
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
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
