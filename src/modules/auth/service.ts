import { createClient } from "@/lib/supabase/client";
import { supabaseError } from "../../lib/errors/supabaseError";

const supabase = createClient();

// ✅ Criterios de aceptación:
// - Se intenta iniciar sesión en Supabase con email y password.
// - Si Supabase retorna error:
//    - Se devuelve { success: false, error: <mensaje mapeado> }.
// - Si la autenticación es exitosa:
//    - Se devuelve { success: true, error: null }.
export async function signInWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      error: supabaseError(error.message),
    };
  }
  return { success: true, error: null };
}

// ✅ Criterios de aceptación:
// - Se intenta verificar el OTP en Supabase.
// - Si Supabase retorna error:
//    - Se devuelve { success: false, error: <mensaje mapeado> }.
// - Si la verificación es exitosa:
//    - Se devuelve { success: true, error: null }.
export async function verifyOtp(email: string, otp: string) {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "signup",
  });

  if (error)
    return {
      success: false,
      error: supabaseError(error.message),
    };

  return {
    success: true,
    error: null,
  };
}

// ✅ Criterios de aceptación:
// - Se intenta cerrar sesión en Supabase.
// - Si Supabase retorna error:
//    - Se devuelve { success: false, error: <mensaje mapeado> }.
// - Si el cierre de sesión es exitoso:
//    - Se devuelve { success: true, error: null }.
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error)
    return {
      success: false,
      error: supabaseError(error.message),
    };

  return {
    success: true,
    error: null,
  };
}

// ✅ Criterios de aceptación:
// - Se intenta actualizar la contraseña en Supabase.
// - Si Supabase retorna error:
//    - Se devuelve { success: false, error: <mensaje mapeado> }.
// - Si la actualización es exitosa:
//    - Se devuelve { success: true, error: null }.
export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error)
    return {
      success: false,
      error: supabaseError(error.message),
    };

  return {
    success: true,
    error: null,
  };
}

// ✅ Criterios de aceptación:
// - Se intenta reenviar el OTP en Supabase.
// - Si Supabase retorna error:
//    - Se devuelve { success: false, error: <mensaje mapeado> }.
// - Si el reenvío es exitoso:
//    - Se devuelve { success: true, error: null }.
export async function resendOtp(email: string) {
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error)
    return {
      success: false,
      error: supabaseError(error.message),
    };

  return {
    success: true,
    error: null,
  };
}
