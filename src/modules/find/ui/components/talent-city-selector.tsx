"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";

// --- IMPORTACIONES DE SHADCN UI ---
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// --- DATA: CIUDADES ---
const CIUDADES_POPULARES = [
  { id: "c_uio", name: "Quito" },
  { id: "c_gye", name: "Guayaquil" },
  { id: "c_cue", name: "Cuenca" },
  { id: "c_man", name: "Manta" },
  { id: "c_amb", name: "Ambato" },
  { id: "c_mac", name: "Machala" },
  { id: "c_por", name: "Portoviejo" },
  { id: "c_loj", name: "Loja" },
];

const TODAS_LAS_CIUDADES = [
  ...CIUDADES_POPULARES,
  { id: "c_iba", name: "Ibarra" },
  { id: "c_rio", name: "Riobamba" },
  { id: "c_esm", name: "Esmeraldas" },
  { id: "c_san", name: "Santo Domingo" },
  { id: "c_lat", name: "Latacunga" },
  { id: "c_tul", name: "Tulcán" },
];

export default function TalentCitySelector() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [anyCity, setAnyCity] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ESTADO TEMPORAL
  const [tempSelectedCities, setTempSelectedCities] = useState<string[]>([]);

  // --- LÓGICA GENERAL ---

  // Lógica para inicializar el estado temporal al abrir el modal
  useEffect(() => {
    if (isModalOpen) {
      setTempSelectedCities(selectedCities);
      setSearchQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const toggleAnyCity = () => {
    const newState = !anyCity;
    setAnyCity(newState);
    if (newState) {
      setSelectedCities([]);
    }
  };

  const toggleCitySelection = (id: string) => {
    setAnyCity(false);

    setSelectedCities((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cityId) => cityId !== id);
      } else {
        // En el grid principal, la selección debería ser única o se desactiva
        // Manteniendo la lógica multiselección del grid por si acaso.
        return [...prev, id];
      }
    });
  };

  // Lógica para mostrar ciudades en el Grid Principal
  const ciudadesParaMostrar = useMemo(() => {
    const base = [...CIUDADES_POPULARES];

    const extras = selectedCities
      .map((id) => TODAS_LAS_CIUDADES.find((c) => c.id === id))
      .filter((city) => city && !base.find((b) => b.id === city.id));

    return [...(extras as typeof CIUDADES_POPULARES), ...base];
  }, [selectedCities]);

  const canContinue = selectedCities.length > 0 || anyCity;

  // --- LÓGICA DEL MODAL TEMPORAL ---

  // Toggle para el estado TEMPORAL
  const toggleTempCitySelection = (id: string) => {
    setTempSelectedCities((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cityId) => cityId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredCities = TODAS_LAS_CIUDADES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Acción: Limpiar filtros temporales
  const handleClearFilters = () => setTempSelectedCities([]);

  // Acción: Aplicar cambios y cerrar modal (COMMIT)
  const handleModalContinue = () => {
    // 1. Aplicar cambios al estado principal
    setSelectedCities(tempSelectedCities);
    // 2. Cerrar modal
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-2xl">
        {/* 1. TÍTULO GRANDE Y NEGRITA */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
          ¿Dónde necesitas el servicio?
        </h1>

        {/* 2. RECTÁNGULO CON SWITCH */}
        <div
          onClick={toggleAnyCity}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl mb-8 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-medium text-gray-800">
            Buscar en cualquier ciudad
          </span>
          {/* Custom Toggle Switch (Manteniendo el tuyo) */}
          <div
            className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${anyCity ? "bg-black" : "bg-gray-300"}`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${anyCity ? "translate-x-6" : "translate-x-0"}`}
            />
          </div>
        </div>

        {/* 3. CARDS DE CIUDADES (Usando Card de Shadcn) */}
        {/* 3. CARDS DE CIUDADES (GRID DINÁMICO) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {ciudadesParaMostrar.map((city) => {
            const isSelected = selectedCities.includes(city.id);
            return (
              <div
                key={city.id}
                onClick={() => toggleCitySelection(city.id)}
                className={`
                  flex items-center justify-center cursor-pointer rounded-xl p-4 text-center font-semibold text-sm transition-all duration-200 border relative overflow-hidden whitespace-nowrap text-ellipsis
                  ${
                    isSelected
                      ? "border-black bg-gray-100 shadow-inner"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }
                `}
              >
                {city.name}
              </div>
            );
          })}
        </div>

        {/* 4. LINK "MOSTRAR MÁS" (Usando DialogTrigger) */}
        <div className="mb-8">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="text-black font-semibold underline underline-offset-4 hover:text-gray-700 text-sm">
                Mostrar más ciudades
              </button>
            </DialogTrigger>

            {/* --- MODAL (Usando DialogContent) --- */}
            <DialogContent className="p-0 border-none sm:max-w-lg h-[70vh] flex flex-col overflow-hidden">
              <DialogHeader className="p-4 border-b shrink-0">
                <DialogTitle>Seleccionar ciudades</DialogTitle>
              </DialogHeader>

              {/* Modal Search (Usando Input de Shadcn) */}
              <div className="p-4 bg-gray-50 border-b shrink-0">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Escribe para buscar..."
                    className="w-full pl-10 pr-4 py-3 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              {/* Modal List con Checkboxes */}
              <div className="overflow-y-auto p-2 flex-1">
                {filteredCities.map((city) => {
                  const isChecked = tempSelectedCities.includes(city.id);
                  return (
                    <div
                      key={city.id}
                      onClick={() => toggleTempCitySelection(city.id)}
                      className={`
                                    flex items-center justify-between p-4 mb-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                `}
                    >
                      <span className="text-base text-gray-700">
                        {city.name}
                      </span>

                      {/* Checkbox de Shadcn */}
                      <Checkbox
                        checked={isChecked}
                        className="h-5 w-5 data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white data-[state=checked]:font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTempCitySelection(city.id);
                        }}
                      />
                    </div>
                  );
                })}
                {filteredCities.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No encontramos esa ciudad
                  </div>
                )}
              </div>

              {/* Modal Footer (Usando Button de Shadcn) */}
              <div className="p-4 border-t bg-white flex-shrink-0 flex gap-3">
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="flex-1"
                >
                  Limpiar filtro
                </Button>
                <Button onClick={handleModalContinue} className="flex-1 ">
                  Continuar ({tempSelectedCities.length})
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 5. BOTÓN DE CONTINUAR GENERAL (Usando Button de Shadcn) */}
        <Button
          variant="default"
          disabled={!canContinue}
          className={`w-full py-4 text-lg font-bold transition-all h-auto`}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
