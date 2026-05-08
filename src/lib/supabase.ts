import { createClient } from '@supabase/supabase-js';
import { cookieStorage } from '@fit-legacy/auth/cookieStorage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fsoevzostulbtoxcqqdh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_o4TKqt_cncmL-nRoIm2Ozw_4s6kD07e';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing in .env, using hardcoded fallback');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: cookieStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
