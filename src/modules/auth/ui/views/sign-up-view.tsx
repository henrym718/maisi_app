"use client";

import { useQueryState } from "nuqs";
import OAuthGoogleButton from "../components/oauth-google-button";
import SignupForm from "../components/sign-up-form";
import LineSeparator from "../components/line-separator";
import SignUpHeader from "../components/sign-up-header";

export default function SignUpView() {
  const [role] = useQueryState("role");

  return (
    <>
      <SignUpHeader role={role as "client" | "talent"} />
      <OAuthGoogleButton />
      <LineSeparator />
      <div>
        <SignupForm />
      </div>
    </>
  );
}
