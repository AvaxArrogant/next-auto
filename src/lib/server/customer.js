import { supabase } from '@/lib/server/supabase';
import { createCustomer } from '@/lib/server/stripe';

export const createPaymentAccount = async (email, customerId) => {
  const paymentAccount = await createCustomer(email);
  await supabase.from('customer_payment').insert({
    customer_id: customerId,
    email,
    payment_id: paymentAccount.id,
  });
};

export const getPayment = async (email) => {
  const { data, error } = await supabase
    .from('customer_payment')
    .select('*')
    .eq('email', email)
    .single();
  if (error) return null;
  return data;
};

export const updateSubscription = async (customerId, subscriptionType) => {
  await supabase
    .from('customer_payment')
    .update({ subscription_type: subscriptionType })
    .eq('customer_id', customerId);
};
