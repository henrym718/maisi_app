import { createClient } from "@/lib/supabase/client";

export async function verifyOtp(email: string, otp: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "signup",
  });

  if (error) throw error;
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
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

export async function resendOtp(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) throw error;
}
