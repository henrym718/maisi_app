"use client";

import React from "react";
import { useOnboardingStore } from "../store/use-onboarding-store"; // UPDATED IMPORT
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";

// Placeholder components for steps (will be replaced as we build them)
import StepCategory from "./step-category";
import StepIdentity from "./step-identity";
import StepCommercial from "./step-commercial";
import StepAvailability from "./step-availability";
import StepMedia from "./step-media";
import StepReview from "./step-review";

const TOTAL_STEPS = 6;

// --- STEP CONFIGURATION ---
const STEP_INFO = [
  {
    id: 1,
    title: "Categoría",
    description: "Define tu área de experticia.",
    tipTitle: "¿Sabías qué?",
    tipContent: "Los perfiles con una categoría bien definida reciben 3x más visitas porque los clientes encuentran exactamente lo que buscan.",
    tipIcon: "💡"
  },
  {
    id: 2,
    title: "Identidad",
    description: "Tu carta de presentación.",
    tipTitle: "El poder de una buena historia",
    tipContent: "Un título atractivo y una descripción honesta generan confianza inmediata. Sé breve pero contundente.",
    tipIcon: "✍️"
  },
  {
    id: 3,
    title: "Política Comercial",
    description: "Claridad ante todo.",
    tipTitle: "Transparencia = Ventas",
    tipContent: "Mostrar precios de referencia reduce la fricción y filtra a clientes que no encajan con tu presupuesto.",
    tipIcon: "💰"
  },
  {
    id: 4,
    title: "Disponibilidad",
    description: "¿Cuándo y dónde?",
    tipTitle: "Organiza tu tiempo",
    tipContent: "Definir zonas y horarios claros evita malentendidos y te ayuda a mantener un balance vida-trabajo saludable.",
    tipIcon: "📍"
  },
  {
    id: 5,
    title: "Multimedia",
    description: "Muestra tu trabajo.",
    tipTitle: "Una imagen vale más...",
    tipContent: "Los perfiles con video de introducción y fotos de alta calidad tienen una tasa de conversión del 80%.",
    tipIcon: "📸"
  },
  {
    id: 6,
    title: "Revisión",
    description: "Todo listo para brillar.",
    tipTitle: "¡Casi listo!",
    tipContent: "Revisa cada detalle. Este es el perfil que verán miles de clientes potenciales. ¡Haz que cuente!",
    tipIcon: "🚀"
  },
];

export default function WizardShell() {
  // UPDATED HOOK USAGE
  const { step, direction, nextStep, prevStep, isStepValid } = useOnboardingStore();
  const currentStepInfo = STEP_INFO[step - 1];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white overflow-hidden">

      {/* === LEFT COLUMN: FORM AREA === */}
      <div className="flex-1 flex flex-col relative">

        {/* PROGRESS BAR (Mobile/Desktop) */}
        <div className="w-full h-2 bg-gray-100">
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* HEADER NAV */}
        <header className="px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 text-xs">
                    {step}
                </span>
                <span className="uppercase tracking-wider">de {TOTAL_STEPS}</span>
            </div>

            {/* LOGO or BRAND (Optional) */}
            <div className="font-bold text-xl tracking-tighter">maısı.</div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-4xl mx-auto w-full pb-20">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {currentStepInfo.title}
                </h1>
                <p className="text-lg text-gray-500 font-medium">
                    {currentStepInfo.description}
                </p>
            </div>

            {/* STEP CONTENT WRAPPER */}
            <div className="relative min-h-[300px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full"
                    >
                        {step === 1 && <StepCategory />}
                        {step === 2 && <StepIdentity />}
                        {step === 3 && <StepCommercial />}
                        {step === 4 && <StepAvailability />}
                        {step === 5 && <StepMedia />}
                        {step === 6 && <StepReview />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>

        {/* BOTTOM NAV BAR */}
        <footer className="px-6 md:px-12 lg:px-24 py-6 border-t border-gray-100 flex items-center justify-between bg-white z-10">
            <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
                className="text-gray-500 hover:text-black gap-2 pl-0"
            >
                <ArrowLeft size={18} />
                Atrás
            </Button>

            <Button
                onClick={step === TOTAL_STEPS ? () => {} : nextStep} // Final submit logic in StepReview
                disabled={!isStepValid()}
                className={cn(
                    "rounded-full px-8 h-12 text-base font-semibold transition-all duration-300",
                    isStepValid() ? "shadow-lg shadow-black/20 hover:shadow-xl" : "opacity-50"
                )}
            >
                {step === TOTAL_STEPS ? "Crear Perfil" : "Continuar"}
                {step === TOTAL_STEPS ? <Rocket className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
        </footer>

      </div>

      {/* === RIGHT COLUMN: INTELLECTUAL CONTEXT (Helper) === */}
      <div className="hidden lg:flex w-[400px] bg-gray-50 border-l border-gray-200 flex-col p-10 justify-center">
         <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
                <div className="text-4xl mb-4">{currentStepInfo.tipIcon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {currentStepInfo.tipTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {currentStepInfo.tipContent}
                </p>

                {/* Decorative Element */}
                <div className="mt-6 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    ))}
                </div>
            </motion.div>
         </AnimatePresence>

         <div className="mt-auto pt-10 text-center">
            <p className="text-xs text-gray-400 font-medium">
                Maısı Talent Onboarding &copy; {new Date().getFullYear()}
            </p>
         </div>
      </div>

    </div>
  );
}
