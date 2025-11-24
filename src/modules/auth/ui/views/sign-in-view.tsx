import SignInForm from "@/modules/auth/ui/components/sign-in-form";
import OAuthGoogleButton from "@/modules/auth/ui/components/oauth-google-button";
import LineSeparator from "@/modules/auth/ui/components/line-separator";
import SignInHeader from "../components/sign-in-header";

export default function SignInView() {
  return (
    <div>
      <SignInHeader />
      <OAuthGoogleButton />
      <LineSeparator />
      <SignInForm />
    </div>
  );
}
