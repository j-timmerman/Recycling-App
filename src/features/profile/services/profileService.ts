import { supabase } from '../../../lib/supabaseClient';
import type { Profile } from '../../../types/database';

export const profileService = {
  async getByAuthUserId(authUserId: string) {
    const { data, error } = await supabase
      .from('recycling_app_user_profiles')
      .select('*')
      .eq('auth_user_id', authUserId)
      .maybeSingle();
    if (error) throw error;
    return data as Profile | null;
  },

  async getByUsername(username: string) {
    const { data, error } = await supabase
      .from('recycling_app_user_profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async updateProfile(profileId: string, updates: Partial<Pick<Profile, 'username'>>) {
    const { data, error } = await supabase
      .from('recycling_app_user_profiles')
      .update(updates)
      .eq('id', profileId)
      .select()
      .single();
    if (error) throw error;
    return data as Profile;
  },
};
