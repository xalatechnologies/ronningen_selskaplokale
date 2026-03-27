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
      event_types: {
        Row: {
          id: string
          slug: string
          name_no: string
          name_en: string
          description_no: string
          description_en: string
          image_url: string | null
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          slug: string
          name_no: string
          name_en: string
          description_no: string
          description_en: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          slug?: string
          name_no?: string
          name_en?: string
          description_no?: string
          description_en?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
        }
      }
      inquiries: {
        Row: {
          id: string
          created_at: string
          event_type_id: string | null
          preferred_date: string | null
          flexible_date: boolean
          guest_count: number | null
          language: string
          package_id: string | null
          budget_range: string | null
          needs_catering: boolean
          needs_decoration: boolean
          needs_staffing: boolean
          needs_viewing: boolean
          name: string
          email: string
          phone: string | null
          company_name: string | null
          message: string | null
          status: string
          internal_notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          event_type_id?: string | null
          preferred_date?: string | null
          flexible_date?: boolean
          guest_count?: number | null
          language: string
          package_id?: string | null
          budget_range?: string | null
          needs_catering?: boolean
          needs_decoration?: boolean
          needs_staffing?: boolean
          needs_viewing?: boolean
          name: string
          email: string
          phone?: string | null
          company_name?: string | null
          message?: string | null
          status?: string
          internal_notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          event_type_id?: string | null
          preferred_date?: string | null
          flexible_date?: boolean
          guest_count?: number | null
          language?: string
          package_id?: string | null
          budget_range?: string | null
          needs_catering?: boolean
          needs_decoration?: boolean
          needs_staffing?: boolean
          needs_viewing?: boolean
          name?: string
          email?: string
          phone?: string | null
          company_name?: string | null
          message?: string | null
          status?: string
          internal_notes?: string | null
        }
      }
    }
  }
}
