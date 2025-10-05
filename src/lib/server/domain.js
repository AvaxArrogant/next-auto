import { supabase } from '@/lib/server/supabase';

export const createDomain = async (userId, email, workspaceSlug, domainName, apexName, verified, verification) => {
  const { error } = await supabase.from('domains').insert({
    user_id: userId,
    email,
    workspace_slug: workspaceSlug,
    domain_name: domainName,
    apex_name: apexName,
    verified,
    verification,
  });
  if (error) throw error;
};

export const deleteDomain = async (id, email, slug, name) => {
  const { error } = await supabase
    .from('domains')
    .delete()
    .eq('user_id', id)
    .eq('email', email)
    .eq('workspace_slug', slug)
    .eq('domain_name', name);
  if (error) throw error;
};

export const getDomains = async (slug) => {
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .eq('workspace_slug', slug);
  if (error) return [];
  return data;
};

export const verifyDomain = async (id, email, slug, name, verified) => {
  const { error } = await supabase
    .from('domains')
    .update({ verified })
    .eq('user_id', id)
    .eq('email', email)
    .eq('workspace_slug', slug)
    .eq('domain_name', name);
  if (error) throw error;
};
