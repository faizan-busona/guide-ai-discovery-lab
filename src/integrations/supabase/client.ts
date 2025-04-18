
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase-types';

const SUPABASE_URL = "https://iiqvezuinxvitauapbvy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcXZlenVpbnh2aXRhdWFwYnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTcyMTMsImV4cCI6MjA2MDI5MzIxM30.Pw2I9ya2kDsNIMd1p34wxpYu3X7wyHcnGxCi9Wge8KE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
