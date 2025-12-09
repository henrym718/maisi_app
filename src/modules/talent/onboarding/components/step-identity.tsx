"use client";

import { useOnboardingStore, Modality } from "../store/use-onboarding-store"; // UPDATED IMPORT
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Briefcase, Globe, Laptop } from "lucide-react";

export default function StepIdentity() {
  // UPDATED HOOK
  const { formData, updateFormData } = useOnboardingStore();

  const handleModalityChange = (value: Modality) => {
    updateFormData({ modality: value });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* 1. TÍTULO PROFESIONAL */}
      <div className="space-y-3">
        <Label htmlFor="title" className="text-base font-bold text-gray-900">
          Título Profesional
        </Label>
        <Input
          id="title"
          placeholder="Ej: Plomero Certificado 24/7, Experto en React, Abogado Penalista..."
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="h-14 text-lg bg-gray-50 border-gray-200 focus:bg-white transition-all"
        />
        <p className="text-sm text-gray-500">
          Este es el primer texto que verán los clientes. Hazlo corto y descriptivo (Max 50 caracteres).
        </p>
      </div>

      {/* 2. SOBRE MÍ */}
      <div className="space-y-3">
        <Label htmlFor="aboutMe" className="text-base font-bold text-gray-900">
          Acerca de ti
        </Label>
        <Textarea
          id="aboutMe"
          placeholder="Cuéntales sobre tu experiencia, tu forma de trabajar y por qué deberían elegirte..."
          value={formData.aboutMe}
          onChange={(e) => updateFormData({ aboutMe: e.target.value })}
          className="min-h-[140px] text-base bg-gray-50 border-gray-200 focus:bg-white transition-all resize-none p-4 leading-relaxed"
        />
      </div>

      {/* 3. AÑOS DE EXPERIENCIA */}
      <div className="space-y-3">
         <Label htmlFor="experience" className="text-base font-bold text-gray-900">
           Años de Experiencia
         </Label>
         <div className="flex items-center gap-4">
            <Input
              id="experience"
              type="number"
              min={0}
              max={60}
              value={formData.experienceYears}
              onChange={(e) => updateFormData({ experienceYears: parseInt(e.target.value) || 0 })}
              className="w-24 h-12 text-center text-lg font-semibold bg-gray-50"
            />
            <span className="text-gray-500">años demostrables en el sector.</span>
         </div>
      </div>

      {/* 4. MODALIDAD DE TRABAJO */}
      <div className="space-y-3">
        <Label className="text-base font-bold text-gray-900">Modalidad de Trabajo</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ModalityCard
                value="on-site"
                label="Presencial"
                icon={Briefcase}
                current={formData.modality}
                onClick={handleModalityChange}
            />
            <ModalityCard
                value="remote"
                label="Remoto"
                icon={Laptop}
                current={formData.modality}
                onClick={handleModalityChange}
            />
            <ModalityCard
                value="hybrid"
                label="Híbrido"
                icon={Globe}
                current={formData.modality}
                onClick={handleModalityChange}
            />
        </div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTE: Modality Card ---
interface ModalityCardProps {
    value: Modality;
    label: string;
    icon: React.ElementType;
    current: Modality;
    onClick: (v: Modality) => void;
}

function ModalityCard({ value, label, icon: Icon, current, onClick }: ModalityCardProps) {
    const isSelected = value === current;
    return (
        <div
            onClick={() => onClick(value)}
            className={cn(
                "cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2 hover:bg-gray-50",
                isSelected ? "border-black bg-gray-50 text-black" : "border-gray-200 text-gray-500"
            )}
        >
            <Icon size={24} className={isSelected ? "text-black" : "text-gray-400"} />
            <span className="font-semibold text-sm">{label}</span>
        </div>
    )
}
