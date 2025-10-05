import { supabase } from '@/lib/server/supabase';

export const getMember = async (id) => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
};

export const getMembers = async (slug) => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('workspace_slug', slug);
  if (error) return [];
  return data;
};

export const getPendingInvitations = async (email) => {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('email', email)
    .eq('status', 'pending');
  if (error) return [];
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase
    .from('memberships')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const toggleRole = async (id, teamRole) => {
  const { error } = await supabase
    .from('memberships')
    .update({ team_role: teamRole })
    .eq('id', id);
  if (error) throw error;
};

export const updateStatus = async (id, status) => {
  const { error } = await supabase
    .from('invitations')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
};
