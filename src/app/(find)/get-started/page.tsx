import { Button } from "@/components/ui/button";
import ProfessionalSearch from "@/modules/home/ui/components/professional-search";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    // Contenedor principal: Mantiene la estructura base limpia
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full gap-12 lg:gap-24 items-center">
        {/* === COLUMNA IZQUIERDA: IMAGEN SIMPLE === */}
        <div className="hidden lg:block relative">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1974&auto=format&fit=crop"
              alt="Buscando al profesional ideal"
              className="w-full h-[550px] object-cover"
            />
          </div>
        </div>

        {/* === COLUMNA DERECHA: Foco total en el Título y la Búsqueda === */}
        <div className="flex flex-col w-full justify-center lg:items-start items-center text-center lg:text-left">
          {/* 2. LA FRASE DE IMPACTO */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-12 max-w-lg">
            ¿Qué problema vamos a resolver hoy?
          </h1>

          {/* 3. TU COMPONENTE SEARCH */}
          <div className="w-full mb-6">
            <ProfessionalSearch />
          </div>

          {/* 4. BOTÓN DE ACCIÓN (CTA) */}
          <Button className="w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
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
