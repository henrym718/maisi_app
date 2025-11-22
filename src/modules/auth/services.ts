import { createClient } from "@/lib/supabase/client";

export async function verifyOtp(email: string, otp: string) {}

export async function signInCredentials(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpCredentials(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function updatePassword(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}
