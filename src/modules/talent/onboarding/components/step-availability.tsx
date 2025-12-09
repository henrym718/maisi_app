"use client";

import { useOnboardingStore } from "../store/use-onboarding-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Ambulance } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

// --- MOCKED CITIES FOR SELECTOR ---
const AVAILABLE_CITIES = [
  "Quito", "Guayaquil", "Cuenca", "Manta", "Ambato", "Machala",
  "Portoviejo", "Loja", "Ibarra", "Riobamba", "Santo Domingo"
];

export default function StepAvailability() {
  const { formData, updateFormData } = useOnboardingStore();
  const [cityInput, setCityInput] = useState("");

  const toggleEmergency = (checked: boolean) => {
    updateFormData({ handlesEmergencies: checked });
  };

  const handleAddCity = (city: string) => {
    if (!formData.serviceAreas.includes(city)) {
        updateFormData({ serviceAreas: [...formData.serviceAreas, city] });
    }
    setCityInput("");
  };

  const handleRemoveCity = (city: string) => {
    updateFormData({
        serviceAreas: formData.serviceAreas.filter(c => c !== city)
    });
  };

  const filteredCities = AVAILABLE_CITIES.filter(c =>
    c.toLowerCase().includes(cityInput.toLowerCase()) &&
    !formData.serviceAreas.includes(c)
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* 1. HORARIO DE ATENCIÓN */}
      <div className="space-y-3">
        <Label htmlFor="hours" className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Clock size={18} />
            Horario de Atención
        </Label>
        <Input
          id="hours"
          placeholder="Ej: Lunes a Viernes 8:00 - 18:00, Sábados medio día"
          value={formData.serviceHours}
          onChange={(e) => updateFormData({ serviceHours: e.target.value })}
          className="h-14 text-lg bg-gray-50 border-gray-200 focus:bg-white transition-all"
        />
        <p className="text-sm text-gray-500">
          Define cuándo estás disponible para recibir trabajos.
        </p>
      </div>

      {/* 2. URGENCIAS */}
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
        <div className="flex gap-4 items-center">
            <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                formData.handlesEmergencies ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-400"
            )}>
                <Ambulance size={24} />
            </div>
            <div>
                <Label className="text-base font-bold text-gray-900 cursor-pointer" onClick={() => toggleEmergency(!formData.handlesEmergencies)}>
                    Atiendo Emergencias 24/7
                </Label>
                <p className="text-sm text-gray-500 max-w-xs leading-tight mt-1">
                    Activa esto si estás dispuesto a salir fuera de horario (con tarifa extra).
                </p>
            </div>
        </div>
        <Switch
            checked={formData.handlesEmergencies}
            onCheckedChange={toggleEmergency}
        />
      </div>

      {/* 3. ZONAS DE COBERTURA (City Multi-Select) */}
      <div className="space-y-3">
         <Label className="text-base font-bold text-gray-900 flex items-center gap-2">
            <MapPin size={18} />
            Zonas de Cobertura
         </Label>

         {/* Input Buscador */}
         <div className="relative">
            <Input
                placeholder="Escribe una ciudad y selecciona..."
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="h-12 text-base bg-white border-gray-200"
            />
            {/* Dropdown de sugerencias */}
            {cityInput.length > 0 && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-10 max-h-40 overflow-y-auto">
                    {filteredCities.map(city => (
                        <div
                            key={city}
                            onClick={() => handleAddCity(city)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            {city}
                        </div>
                    ))}
                </div>
            )}
         </div>

         {/* Badges de ciudades seleccionadas */}
         <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-2 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            {formData.serviceAreas.length === 0 && (
                <span className="text-gray-400 text-sm italic p-1">No has seleccionado ninguna ciudad aún.</span>
            )}
            {formData.serviceAreas.map(city => (
                <Badge key={city} variant="secondary" className="px-3 py-1 text-sm font-medium bg-white border border-gray-200 text-gray-800 shadow-sm gap-2">
                    {city}
                    <X
                        size={14}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveCity(city)}
                    />
                </Badge>
            ))}
         </div>
         <p className="text-sm text-gray-500">
             Selecciona las ciudades principales donde puedes movilizarte.
         </p>
      </div>

    </div>
  );
}
