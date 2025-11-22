"use client";

import AuthForm from "@/modules/auth/ui/components/auth-form";
import SignInForm from "@/modules/auth/ui/components/sign-in-form";
import OAuthButton from "@/modules/auth/ui/components/oauth-button";

export default function SignInView() {
  return (
    <AuthForm title="Iniciar sesión" description="Bienvenido de nuevo">
      <OAuthButton />
      <SignInForm />
    </AuthForm>
  );
}
