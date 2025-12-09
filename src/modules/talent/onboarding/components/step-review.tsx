"use client";

import { useOnboardingStore } from "../store/use-onboarding-store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Extracted component to avoid re-render issues
const SectionHeader = ({ title, stepIdx, onEdit }: { title: string, stepIdx: number, onEdit: (idx: number) => void }) => (
    <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-500" />
            {title}
        </h4>
        <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-black h-8 px-2"
            onClick={() => onEdit(stepIdx)}
        >
            <Pencil size={14} className="mr-1" />
            Editar
        </Button>
    </div>
);

export default function StepReview() {
  const { formData, setStep } = useOnboardingStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-6">
        <p className="text-green-800 font-medium">
            ¡Estás a un paso! Revisa que todo esté correcto antes de publicar.
        </p>
      </div>

      {/* 1. SECTOR Y CATEGORIA */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="pt-6">
            <SectionHeader title="Categoría Profesional" stepIdx={1} onEdit={setStep} />
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Grupo</span>
                    <span className="font-semibold">{formData.groupId.replace('g_', '').toUpperCase()}</span>
                    {/* Mock processing of ID to name roughly */}
                </div>
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Especialidad</span>
                    <span className="font-semibold">{formData.categoryId.replace('c_', '').toUpperCase()}</span>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* 2. IDENTIDAD */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="pt-6">
            <SectionHeader title="Identidad" stepIdx={2} onEdit={setStep} />
            <div className="space-y-3">
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Título</span>
                    <h3 className="text-lg font-bold">{formData.title}</h3>
                </div>
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Bio</span>
                    <p className="text-gray-700 text-sm italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                        &quot;{formData.aboutMe}&quot;
                    </p>
                </div>
                <div className="flex gap-6 pt-2">
                    <div>
                        <span className="block text-gray-500 text-xs uppercase tracking-wider">Experiencia</span>
                        <span className="font-semibold">{formData.experienceYears} Años</span>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-xs uppercase tracking-wider">Modalidad</span>
                        <Badge variant="outline" className="uppercase">{formData.modality}</Badge>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* 3. POLÍTICA Y DISPONIBILIDAD */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="pt-6">
            <SectionHeader title="Condiciones" stepIdx={3} onEdit={setStep} /> {/* Jumping to 3 allows editing Commerical & Availability usually nearby */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Precio Ref.</span>
                    <span className="font-semibold">{formData.referencePrice}</span>
                </div>
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Costo Visita</span>
                    <span className="font-semibold">{formData.visitCost}</span>
                </div>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-1 gap-4">
                 <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Horario</span>
                    <span className="font-medium text-sm">{formData.serviceHours}</span>
                </div>
                <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-2">Zonas de Cobertura</span>
                    <div className="flex flex-wrap gap-2">
                        {formData.serviceAreas.map(city => (
                            <Badge key={city} variant="secondary" className="bg-gray-100 text-gray-600">
                                {city}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* 4. MEDIA */}
      <Card className="shadow-sm border-gray-200">
         <CardContent className="pt-6">
            <SectionHeader title="Multimedia" stepIdx={5} onEdit={setStep} />
            <div className="flex items-center gap-4">
                 <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    {formData.coverImageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={formData.coverImageUrl} className="w-full h-full object-cover" alt="Cover" />
                    )}
                 </div>
                 <div className="overflow-hidden">
                    <span className="block text-gray-500 text-xs uppercase tracking-wider">Video URL</span>
                    <a href={formData.introVideoUrl} target="_blank" className="text-blue-600 text-sm truncate block underline">
                        {formData.introVideoUrl || "No especificado"}
                    </a>
                 </div>
            </div>
         </CardContent>
      </Card>

    </div>
  );
}
