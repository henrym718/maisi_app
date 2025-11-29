"use server";

import { createAdminClient } from "@/lib/supabase/client";
import { sendEmail } from "./send-email";
import { OTP_Template } from "../templates/verify-email";

export async function signupWithPassword(
  full_name: string,
  email: string,
  password: string,
  role: "talent" | "client"
) {
  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: {
      data: {
        full_name,
        role,
      },
    },
  });

  if (error) return { success: false, error: error.message };

  const { error: errorMail } = await sendEmail({
    to: email,
    subject: "Verificacion de cuenta",
    react: <OTP_Template otp={data.properties.email_otp} />,
  });

  if (errorMail) return { success: false, error: errorMail.message };

  return { success: true, error: null };
}
