import { supabase } from '../lib/supabaseClient';
import type { Profile } from '../types';

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, full_name, created_at')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Profile;
}
