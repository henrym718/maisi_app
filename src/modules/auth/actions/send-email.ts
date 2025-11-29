"use server";

import { JSX } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  react: JSX.Element;
}

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  return await resend.emails.send({
    from: "Maisi <onboarding@resend.dev>",
    to,
    subject,
    react,
  });
}
