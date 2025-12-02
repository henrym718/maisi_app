"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, X, Check } from "lucide-react";

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

export default function CitySelector() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]); // Estado principal
  const [anyCity, setAnyCity] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ESTADO TEMPORAL: Almacena selecciones solo mientras el modal está abierto
  const [tempSelectedCities, setTempSelectedCities] = useState<string[]>([]);

  // --- LÓGICA GENERAL ---

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
        return [...prev, id];
      }
    });
  };

  // Lógica para mostrar ciudades en el Grid Principal
  const ciudadesParaMostrar = useMemo(() => {
    const base = [...CIUDADES_POPULARES];

    // Filtra las ciudades seleccionadas que no son populares por defecto
    const extras = selectedCities
      .map((id) => TODAS_LAS_CIUDADES.find((c) => c.id === id))
      .filter((city) => city && !base.find((b) => b.id === city.id));

    // Muestra las extra al inicio
    return [...(extras as typeof CIUDADES_POPULARES), ...base];
  }, [selectedCities]);

  const canContinue = selectedCities.length > 0 || anyCity;

  // --- LÓGICA DEL MODAL ---

  // Efecto: Inicializar el estado temporal cuando se abre el modal
  useEffect(() => {
    if (isModalOpen) {
      setTempSelectedCities(selectedCities);
      setSearchQuery(""); // Limpiar búsqueda al abrir
    }
  }, [isModalOpen, selectedCities]);

  // Toggle para el estado TEMPORAL (sin efecto visual ni de estado principal)
  const toggleTempCitySelection = (id: string) => {
    setTempSelectedCities((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cityId) => cityId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Filtrado para el modal
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
        {/* ... Título y Switch (sin cambios) ... */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
          ¿Dónde necesitas el servicio?
        </h1>

        <div
          onClick={toggleAnyCity}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl mb-8 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-medium text-gray-800">
            Buscar en cualquier ciudad
          </span>
          <div
            className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${anyCity ? "bg-black" : "bg-gray-300"}`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${anyCity ? "translate-x-6" : "translate-x-0"}`}
            />
          </div>
        </div>

        {/* 3. CARDS DE CIUDADES (GRID DINÁMICO) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {ciudadesParaMostrar.map((city) => {
            const isSelected = selectedCities.includes(city.id);
            return (
              <div
                key={city.id}
                onClick={() => toggleCitySelection(city.id)}
                className={`
                  cursor-pointer rounded-xl p-4 text-center font-semibold text-sm transition-all duration-200 border relative
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

        {/* 4. LINK "MOSTRAR MÁS" */}
        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-black font-semibold underline underline-offset-4 hover:text-gray-700 text-sm"
          >
            Mostrar más ciudades
          </button>
        </div>

        {/* 5. BOTÓN DE CONTINUAR GENERAL */}
        <button
          disabled={!canContinue}
          className={`
            w-full py-4 rounded-xl text-lg font-bold transition-all
            ${
              canContinue
                ? "bg-black text-white hover:bg-gray-800 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continuar
        </button>
      </div>

      {/* --- MODAL (Buscador completo con Checkbox sin estilo) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden h-full max-h-[80vh] flex flex-col">
            {/* Modal Header (Sin cambios) */}
            <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
              <h3 className="font-bold text-lg">Seleccionar ciudades</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Search (Sin cambios) */}
            <div className="p-4 bg-gray-50 border-b flex-shrink-0">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Escribe para buscar..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Modal List con Checkboxes (Sin estilo de selección) */}
            <div className="overflow-y-auto p-2 flex-1">
              {filteredCities.map((city) => {
                // USA ESTADO TEMPORAL para saber si está chequeado
                const isChecked = tempSelectedCities.includes(city.id);
                return (
                  <div
                    key={city.id}
                    // Usa la función TEMPORAL para el click
                    onClick={() => toggleTempCitySelection(city.id)}
                    // NO HAY ESTILOS DE SELECCIÓN EN LA FILA
                    className={`
                      flex items-center justify-between p-4 mb-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                    `}
                  >
                    <span className="text-base text-gray-700">{city.name}</span>

                    {/* Checkbox Visual: Solo el checkbox reacciona visualmente */}
                    <div
                      className={`
                        w-6 h-6 rounded border flex items-center justify-center transition-all
                        ${isChecked ? "bg-black border-black" : "bg-white border-gray-300"}
                    `}
                    >
                      {isChecked && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                );
              })}
              {filteredCities.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No encontramos esa ciudad
                </div>
              )}
            </div>

            {/* Modal Footer (Limpiar y Continuar) */}
            <div className="p-4 border-t bg-white flex-shrink-0 flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-3 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Limpiar filtro
              </button>
              <button
                // Botón de COMMIT
                onClick={handleModalContinue}
                className="flex-1 py-3 rounded-xl font-bold bg-black text-white hover:bg-gray-800 transition-colors shadow-lg"
              >
                Continuar ({tempSelectedCities.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
