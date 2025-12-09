"use client";

import { useOnboardingStore } from "../store/use-onboarding-store"; // UPDATED IMPORT
import { cn } from "@/lib/utils";
import { Check, Hammer, Home, Monitor, Zap } from "lucide-react";
import { motion } from "framer-motion";

// --- MOCKED DATA ---
const GROUPS = [
  { id: "g_home", name: "Servicios del Hogar", icon: Home, description: "Mantenimiento y mejoras para casas." },
  { id: "g_tech", name: "Tecnología", icon: Monitor, description: "Soporte, redes y desarrollo." },
  { id: "g_construction", name: "Construcción", icon: Hammer, description: "Obras civiles y remodelaciones mayores." },
  { id: "g_pro", name: "Servicios Profesionales", icon: Zap, description: "Consultoría, legal y contabilidad." },
];

const CATEGORIES: Record<string, { id: string; name: string }[]> = {
  "g_home": [
    { id: "c_plumber", name: "Plomería" },
    { id: "c_electrician", name: "Electricidad" },
    { id: "c_cleaning", name: "Limpieza" },
    { id: "c_gardening", name: "Jardinería" },
  ],
  "g_tech": [
    { id: "c_support", name: "Soporte Técnico" },
    { id: "c_networks", name: "Redes y Cableado" },
  ],
  "g_construction": [
    { id: "c_masonry", name: "Albañilería" },
    { id: "c_architect", name: "Arquitectura" },
  ],
  "g_pro": [
    { id: "c_accountant", name: "Contador" },
    { id: "c_lawyer", name: "Abogado" },
  ]
};

export default function StepCategory() {
  // UPDATED HOOK
  const { formData, updateFormData } = useOnboardingStore();

  const handleGroupSelect = (groupId: string) => {
    // If changing group, clear category
    if (formData.groupId !== groupId) {
      updateFormData({ groupId, categoryId: "" });
    }
  };

  const currentCategories = formData.groupId ? CATEGORIES[formData.groupId] || [] : [];

  return (
    <div className="space-y-8">
      {/* 1. SELECCIÓN DE GRUPO */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Elige tu sector</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GROUPS.map((group) => {
            const isSelected = formData.groupId === group.id;
            const Icon = group.icon;

            return (
              <div
                key={group.id}
                onClick={() => handleGroupSelect(group.id)}
                className={cn(
                  "cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex items-start gap-4 hover:shadow-md",
                  isSelected
                    ? "border-black bg-gray-50 ring-1 ring-black/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "p-3 rounded-full shrink-0 transition-colors",
                  isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-500"
                )}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className={cn("font-bold text-base", isSelected ? "text-black" : "text-gray-700")}>
                    {group.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 leading-snug">
                    {group.description}
                  </p>
                </div>
                {isSelected && (
                    <div className="ml-auto text-black">
                        <Check size={20} strokeWidth={3} />
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SELECCIÓN DE CATEGORÍA (Animada) */}
      {formData.groupId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
           <h3 className="text-lg font-semibold text-gray-900 mb-4">2. ¿Cuál es tu especialidad principal?</h3>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentCategories.map((cat) => {
                 const isSelected = formData.categoryId === cat.id;
                 return (
                    <div
                        key={cat.id}
                        onClick={() => updateFormData({ categoryId: cat.id })}
                        className={cn(
                            "cursor-pointer px-4 py-3 rounded-lg text-sm font-medium text-center border transition-all",
                            isSelected
                                ? "bg-black text-white border-black shadow-lg shadow-black/20 transform scale-105"
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                        )}
                    >
                        {cat.name}
                    </div>
                 )
              })}
           </div>
        </motion.div>
      )}
    </div>
  );
}
