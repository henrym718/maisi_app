"use server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { redirect } from "next/navigation";

export async function signInWithPassword(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function sendWelcomeEmail(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Gracias por registrarte",
    html: `<p>Gracias por registrarte ${email}</p>
           <p>Por favor, confirma tu correo electrónico para iniciar sesión.</p>`,
  });
  if (error) throw error;
}

export async function signInAndSendEmail(email: string, password: string) {
  await signInWithPassword(email, password);
  await sendWelcomeEmail(email);
  redirect("/");
}
