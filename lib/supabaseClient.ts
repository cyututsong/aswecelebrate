import { createClient } from '@supabase/supabase-js';

export interface WishRow {
  id: string;
  created_at: string;
  celebrant_email: string;
  guest_name: string;
  message: string;
  image_url: string | null;
}

export type Database = {
  public: {
    Tables: {
      wishes: {
        Row: WishRow;
        Insert: {
          id?: string;
          created_at?: string;
          celebrant_email: string;
          guest_name: string;
          message: string;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          celebrant_email?: string;
          guest_name?: string;
          message?: string;
          image_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Debug check: Verify variables are loading in the browser
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase client error: Missing environment variables!', {
    supabaseUrl,
    supabaseAnonKey,
  });
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
//export const supabase = createClient<any>(supabaseUrl!, supabaseAnonKey!);