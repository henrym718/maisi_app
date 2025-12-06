"use client";

import TalentCitySelector from "@/modules/find/ui/components/talent-city-selector";
import TalentSearchView from "@/modules/find/ui/views/talent-search-view";
import { useState } from "react";

export default function GetStartedPage() {
  const [step, setStep] = useState<1 | 2>(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <TalentSearchView setStep={setStep} />;
      case 2:
        return <TalentCitySelector />;
    }
  };

  return renderStep();
}
