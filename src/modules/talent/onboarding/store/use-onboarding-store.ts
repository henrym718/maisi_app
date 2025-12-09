import { create } from "zustand";

// --- TYPES BASED ON DB SCHEMA ---
export type Modality = "on-site" | "remote" | "hybrid";

export interface TalentOnboardingData {
  // Step 1: Category
  groupId: string;
  categoryId: string;

  // Step 2: Identity
  title: string;
  aboutMe: string;
  modality: Modality;
  experienceYears: number;

  // Step 3: Commercial
  referencePrice: string;
  visitCost: string;
  warrantyDescription: string;

  // Step 4: Availability
  serviceHours: string;
  handlesEmergencies: boolean;
  serviceAreas: string[]; // List of City Names or IDs

  // Step 5: Media
  coverImageUrl: string;
  introVideoUrl: string;
}

const INITIAL_DATA: TalentOnboardingData = {
  groupId: "",
  categoryId: "",
  title: "",
  aboutMe: "",
  modality: "on-site",
  experienceYears: 0,
  referencePrice: "",
  visitCost: "",
  warrantyDescription: "",
  serviceHours: "",
  handlesEmergencies: false,
  serviceAreas: [],
  coverImageUrl: "",
  introVideoUrl: "",
};

interface OnboardingState {
  step: number;
  direction: number;
  formData: TalentOnboardingData;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<TalentOnboardingData>) => void;
  isStepValid: () => boolean;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  step: 1,
  direction: 0,
  formData: INITIAL_DATA,

  setStep: (newStep) => {
    const { step } = get();
    set({
      step: newStep,
      direction: newStep > step ? 1 : -1,
    });
  },

  nextStep: () => {
    const { step } = get();
    set({
      step: Math.min(step + 1, 6),
      direction: 1,
    });
  },

  prevStep: () => {
    const { step } = get();
    set({
      step: Math.max(step - 1, 1),
      direction: -1,
    });
  },

  updateFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  isStepValid: () => {
    const { step, formData } = get();
    switch (step) {
      case 1:
        return !!formData.groupId && !!formData.categoryId;
      case 2:
        return !!formData.title && !!formData.aboutMe && formData.experienceYears >= 0;
      case 3:
        // Loose check, at least reference price
        return !!formData.referencePrice;
      case 4:
        return !!formData.serviceHours && formData.serviceAreas.length > 0;
      case 5:
        // Require at least cover image
        return !!formData.coverImageUrl;
      default:
        return true;
    }
  },
}));
