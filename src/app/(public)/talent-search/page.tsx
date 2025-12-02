"use client";

import TalentLocationView from "@/modules/home/ui/view/talent-location-view";
import TalentSearchView from "@/modules/home/ui/view/talent-search-view";
import { useState } from "react";

type WizardStep = 1 | 2;

export default function SearchPage() {
  const [step, setStep] = useState<WizardStep>(1);

  const renderContent = () => {
    switch (step) {
      case 1:
        return <TalentSearchView setStep={setStep} />;
      case 2:
        return <TalentLocationView />;
      default:
        return <p>Error en el flujo.</p>;
    }
  };

  return renderContent();
}
