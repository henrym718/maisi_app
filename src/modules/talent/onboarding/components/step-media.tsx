"use client";

import { useOnboardingStore } from "../store/use-onboarding-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Video, Link as LinkIcon, ExternalLink } from "lucide-react";

export default function StepMedia() {
  const { formData, updateFormData } = useOnboardingStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* 1. IMAGEN DE PORTADA */}
      <div className="space-y-3">
        <Label htmlFor="coverImg" className="text-base font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon size={18} />
            Imagen de Portada (URL)
        </Label>

        <div className="flex gap-2">
             <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                    id="coverImg"
                    placeholder="https://..."
                    value={formData.coverImageUrl}
                    onChange={(e) => updateFormData({ coverImageUrl: e.target.value })}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                />
            </div>
        </div>

        {/* Preview Container */}
        <div className="w-full h-48 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center relative group">
            {formData.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={formData.coverImageUrl}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Error+Loading+Image";
                    }}
                />
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <ImageIcon size={48} className="mb-2 opacity-20" />
                    <span className="text-sm font-medium">Vista previa de tu imagen</span>
                </div>
            )}
        </div>
        <p className="text-sm text-gray-500">
            Una foto profesional, de tu equipo o de un trabajo realizado. (Usa una URL pública por ahora).
        </p>
      </div>

      {/* 2. VIDEO DE INTRODUCCIÓN */}
      <div className="space-y-3">
        <Label htmlFor="videoUrl" className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Video size={18} />
            Video de Presentación (URL)
        </Label>

        <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input
                id="videoUrl"
                placeholder="https://youtube.com/..."
                value={formData.introVideoUrl}
                onChange={(e) => updateFormData({ introVideoUrl: e.target.value })}
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
            />
        </div>

        {formData.introVideoUrl && (
             <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center gap-2">
                <ExternalLink size={16} />
                <a href={formData.introVideoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 font-medium">
                    Probar enlace del video
                </a>
             </div>
        )}

        <p className="text-sm text-gray-500">
            Sube un video corto (30-60s) presentándote a ti mismo. Esto genera mucha confianza.
        </p>
      </div>

    </div>
  );
}
