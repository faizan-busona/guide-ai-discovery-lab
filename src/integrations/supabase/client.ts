
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase-types';

const supabaseUrl = "https://iiqvezuinxvitauapbvy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcXZlenVpbnh2aXRhdWFwYnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTcyMTMsImV4cCI6MjA2MDI5MzIxM30.Pw2I9ya2kDsNIMd1p34wxpYu3X7wyHcnGxCi9Wge8KE";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== 'undefined' ? localStorage : undefined
  }
});
