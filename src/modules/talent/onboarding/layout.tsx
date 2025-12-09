
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crea tu Perfil Profesional | Maısı",
  description: "Únete a la red de talentos más confiable.",
};

export default function TalentOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {children}
    </div>
  );
}
