import { supabase } from '@/lib/server/supabase';

export const createWorkspace = async (creatorId, email, name, slug) => {
  const { data, error } = await supabase.from('workspaces').insert({
    creator_id: creatorId,
    email,
    name,
    slug,
  });
  if (error) throw error;
  return data;
};

export const getWorkspace = async (id, email, slug) => {
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', id)
    .eq('email', email)
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
};

export const deleteWorkspace = async (id, email, slug) => {
  const { error } = await supabase
    .from('workspaces')
    .delete()
    .eq('id', id)
    .eq('email', email)
    .eq('slug', slug);
  if (error) throw error;
};
