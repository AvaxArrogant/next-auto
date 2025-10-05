import { supabase } from '@/lib/server/supabase';

export const getUser = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
};

export const deactivate = async (id) => {
  const { error } = await supabase
    .from('users')
    .update({ active: false })
    .eq('id', id);
  if (error) throw error;
};

export const updateEmail = async (id, email, previousEmail) => {
  const { error } = await supabase
    .from('users')
    .update({ email })
    .eq('id', id)
    .eq('email', previousEmail);
  if (error) throw error;
};

export const updateName = async (id, name) => {
  const { error } = await supabase
    .from('users')
    .update({ name })
    .eq('id', id);
  if (error) throw error;
};
