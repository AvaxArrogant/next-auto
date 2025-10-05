import { supabase } from '@/lib/server/supabase';

export const getSiteWorkspace = async (slug, isCustomDomain) => {
  if (isCustomDomain) {
    // Lookup by custom domain
    const { data, error } = await supabase
      .from('domains')
      .select('*, workspace:workspaces(*)')
      .eq('domain_name', slug)
      .single();
    if (error || !data) return null;
    return {
      ...data.workspace,
      domains: [data],
    };
  } else {
    // Lookup by workspace slug
    const { data, error } = await supabase
      .from('workspaces')
      .select('*, domains:domains(*)')
      .eq('slug', slug)
      .single();
    if (error || !data) return null;
    return {
      ...data,
      domains: data.domains || [],
    };
  }
};

export const getWorkspacePaths = async () => {
  const { data, error } = await supabase
    .from('workspaces')
    .select('slug');
  if (error || !data) return [];
  return data.map(ws => ({ params: { site: ws.slug } }));
};
