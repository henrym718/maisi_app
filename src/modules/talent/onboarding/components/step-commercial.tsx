"use client";

import { useOnboardingStore } from "../store/use-onboarding-store"; // UPDATED IMPORT
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, ShieldCheck, MapPin } from "lucide-react";

export default function StepCommercial() {
  // UPDATED HOOK
  const { formData, updateFormData } = useOnboardingStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* 1. PRECIO DE REFERENCIA */}
      <div className="space-y-3">
        <Label htmlFor="refPrice" className="text-base font-bold text-gray-900">
          Precio de Referencia
        </Label>
        <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
                id="refPrice"
                placeholder="Ej: Desde $40 por hora / A convenir"
                value={formData.referencePrice}
                onChange={(e) => updateFormData({ referencePrice: e.target.value })}
                className="pl-10 h-14 text-lg bg-gray-50 border-gray-200 focus:bg-white transition-all"
            />
        </div>
        <p className="text-sm text-gray-500">
          No es un precio final, pero ayuda al cliente a saber si estás en su presupuesto.
        </p>
      </div>

      {/* 2. COSTO DE VISITA */}
      <div className="space-y-3">
        <Label htmlFor="visitCost" className="text-base font-bold text-gray-900">
          Costo de Visita / Diagnóstico
        </Label>
        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
                id="visitCost"
                placeholder="Ej: $15 (Deducibles si se hace el trabajo) / Gratis"
                value={formData.visitCost}
                onChange={(e) => updateFormData({ visitCost: e.target.value })}
                className="pl-10 h-14 text-lg bg-gray-50 border-gray-200 focus:bg-white transition-all"
            />
        </div>
        <p className="text-sm text-gray-500">
          Define si cobras por ir a evaluar el trabajo.
        </p>
      </div>

      {/* 3. GARANTÍA */}
      <div className="space-y-3">
        <Label htmlFor="warranty" className="text-base font-bold text-gray-900 flex items-center gap-2">
          Garantía <ShieldCheck size={16} className="text-green-600" />
        </Label>
        <Textarea
          id="warranty"
          placeholder="Ej: 30 días de garantía en mano de obra. Si falla, vuelvo sin costo."
          value={formData.warrantyDescription}
          onChange={(e) => updateFormData({ warrantyDescription: e.target.value })}
          className="min-h-[100px] text-base bg-gray-50 border-gray-200 focus:bg-white transition-all resize-none p-4"
        />
        <p className="text-sm text-gray-500">
          Ofrecer garantía aumenta tu tasa de contratación en un 40%.
        </p>
      </div>

    </div>
  );
}
