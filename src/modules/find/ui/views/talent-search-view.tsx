import { Button } from "@/components/ui/button";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import TalentSearchInput from "../components/talent-search-Input";
import Image from "next/image";

interface Props {
  setStep: Dispatch<SetStateAction<1 | 2>>;
}

export default function TalentSearchView({ setStep }: Props) {
  return (
    // Contenedor principal: Mantiene la estructura base limpia
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 gap-35">
      {/* === COLUMNA IZQUIERDA: IMAGEN SIMPLE === */}
      <div className="hidden lg:flex justify-end items-center">
        <Image
          src="/step1.webp"
          alt="Buscando al talento ideal"
          width={550}
          height={550}
          className="rounded-3xl shadow-xl"
        />
      </div>

      {/* === COLUMNA DERECHA: Foco total en el Título y la Búsqueda === */}
      <div className="flex">
        <div className="relative max-w-lg flex justify-center items-center flex-col">
          <div className="absolute top-60 left-0 size-10 border bg-black text-white text-extrabold flex items-center justify-center rounded-md">
            M
          </div>
          {/* 2. LA FRASE DE IMPACTO */}
          <h1 className="font-sans text-3xl md:text-4xl font-extrabold leading-tight mt-4">
            Encuentra al profesional ideal para tu proyecto
            <br />
            <span className="font-normal text-lg block mt-2">
              Elige entre especialistas confiables preparados para atender
              hogares, negocios y cualquier necesidad técnica.
            </span>
          </h1>

          {/* 3. TU COMPONENTE SEARCH */}
          <div className="w-full mb-6 mt-6">
            <span className="font-semibold text-sm block mb-2">
              ¿Qué servicio necesitas ahora?
            </span>
            <TalentSearchInput />
          </div>

          {/* 4. BOTÓN DE ACCIÓN (CTA) */}
          <Button
            className="w-full h-12 text-base font-semibold rounded-md border border-black shadow-md hover:shadow-lg transition-all"
            onClick={() => setStep(2)}
          >
            Buscar
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>

          {/* 5. LINK SECUNDARIO */}
          <div className="mt-6">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 text-sm font-medium underline underline-offset-4 transition-colors"
            >
              Explorar todos los talentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
