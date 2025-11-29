"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";
import OAuthGoogleButton from "../components/oauth-google-button";
import SignupForm from "../components/sign-up-form";
import LineSeparator from "../components/line-separator";
import SignUpHeader from "../components/sign-up-header";
import VerifyOtpForm from "../components/verify-otp-form";
import { useState } from "react";
import { Role, ROLE_VALUES } from "@/lib/constants";

export default function SignUpView() {
  const [role, setRole] = useQueryState<Role>(
    "role",
    parseAsStringEnum(ROLE_VALUES).withDefault("client")
  );

  const [step, setStep] = useState<"REGISTER" | "VERIFY">("REGISTER");

  return (
    <>
      {step === "REGISTER" && (
        <>
          <SignUpHeader role={role} />
          <OAuthGoogleButton />
          <LineSeparator />
          <div>
            <SignupForm role={role} setStep={setStep} />
          </div>
        </>
      )}

      {step === "VERIFY" && (
        <VerifyOtpForm
          setStep={setStep}
          role={role as "client" | "talent"}
          email="henrym.718@gmail.com"
        />
      )}
    </>
  );
}
