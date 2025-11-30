"use server";
import { Resend } from "resend";

import { createAdminClient } from "@/lib/supabase/client";
import { EMAIL_FROM, Role } from "@/lib/constants";

import { resendError } from "../../lib/errors/resendError";
import { supabaseError } from "../../lib/errors/supabaseError";
import { OTP_Template } from "./templates/verify-email";

type Response =
  | { success: true; error: null }
  | { success: false; error: string };

interface Payload {
  full_name: string;
  email: string;
  password: string;
  role: Role;
}

export async function signupWithPassword(input: Payload): Promise<Response> {
  const { full_name, email, password, role } = input;

  // ✅ Criterios de aceptación:
  // - Se inicializa correctamente el cliente de Supabase y Resend
  // - Ambos deben estar configurados con credenciales válidas
  const supabaseAdmin = createAdminClient();
  const resend = new Resend(process.env.RESEND_API_KEY);

  // ✅ Criterios de aceptación:
  // - Se genera un link de signup en Supabase
  // - El usuario queda registrado con full_name y role en metadata pero no verificado
  // - Si falla, se retorna { success: false, error: <mensaje mapeado> }
  const authResult = await supabaseAdmin.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: {
      data: { full_name, role },
    },
  });

  if (authResult.error) {
    return {
      success: false,
      error: supabaseError(authResult.error.message),
    };
  }

  // ✅ Criterios de aceptación:
  // - Se envía un correo con el OTP generado por Supabase
  // - El subject debe ser "Verificacion de cuenta"
  // - Si falla, se retorna { success: false, error: <mensaje mapeado> }
  const emailResult = await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Verificacion de cuenta",
    react: <OTP_Template otp={authResult.data.properties.email_otp} />,
  });

  if (emailResult.error) {
    return {
      success: false,
      error: resendError(emailResult.error.message),
    };
  }

  // ✅ Criterios de aceptación:
  // - Si Supabase y Resend completan sin errores
  // - Se retorna { success: true, error: null }
  return { success: true, error: null };
}
