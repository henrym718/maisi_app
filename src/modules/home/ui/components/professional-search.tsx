"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, ChevronDown, MapPin } from "lucide-react";

// --- DATA HARDCODEADA (Para pruebas) ---
const PROFESIONES = [
  { id: 1, name: "Pintor", icon: "🎨" },
  { id: 2, name: "Electricista", icon: "💡" },
  { id: 3, name: "Gasfitero", icon: "🔧" },
  { id: 4, name: "Jardinero", icon: "🌿" },
  { id: 5, name: "Instalador de Gypsum", icon: "🏗️" },
  { id: 6, name: "Carpintero", icon: "🪚" },
];

const SUGERENCIAS_TAGS = [
  { id: 1, tag: "Instalación de calentador", category: "Gasfitería" },
  { id: 2, tag: "Reparación de tuberías", category: "Gasfitería" },
  { id: 3, tag: "Pintar fachada", category: "Pintor" },
  { id: 4, tag: "Impermeabilización", category: "Pintor" },
  { id: 5, tag: "Cableado estructurado", category: "Electricista" },
  { id: 6, tag: "Instalación de luces LED", category: "Electricista" },
];

type SearchMode = "keywords" | "profession";

const ProfessionalSearch = () => {
  const [mode, setMode] = useState<SearchMode>("keywords"); // 'keywords' | 'profession'
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        wrapperRef.current &&
        target &&
        !wrapperRef.current.contains(target)
      ) {
        setIsOpen(false);

        if (!target.closest("button")) {
          // Evitar cerrar si se hizo clic en el botón del selector
          setShowModeSelector(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lógica de filtrado simple
  const getResults = () => {
    if (mode === "profession") {
      if (!query) return PROFESIONES;
      return PROFESIONES.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      if (!query) return [];
      return SUGERENCIAS_TAGS.filter(
        (s) =>
          s.tag.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const results = getResults();

  const handleSelect = (text: string) => {
    setQuery(text);
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Contenedor Principal (Estilo Card Flotante) */}
      <div
        ref={wrapperRef}
        // Reducimos el padding de la Card de p-2 a p-1.5 para juntar
        className="relative w-full rounded-xl border border-black/90 p-1.5 transition-all duration-300"
      >
        <div className="flex flex-col px-3 pt-3 pb-1">
          {/* INPUT GRANDE */}
          <textarea
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              mode === "keywords"
                ? "Describe lo que necesitas (ej. pintar fachada)..."
                : "Elige una profesión o busca en la lista"
            }
            // Reducimos la altura de h-16 a h-12 (más compacto)
            className="w-full text-lg font-medium text-gray-900 placeholder:text-gray-400 outline-none resize-none bg-transparent overflow-hidden h-12 pt-1"
            rows={1}
          />

          {/* BARRA DE HERRAMIENTAS INFERIOR */}
          <div className="flex items-center justify-between mt-1">
            {/* Selector de Modo (Estilo Pill) */}
            <div className="relative">
              <button
                onClick={() => setShowModeSelector(!showModeSelector)}
                // Reducimos el padding de px-3 py-2 a px-2.5 py-1.5
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-full text-sm font-medium transition-colors"
              >
                <span>
                  {mode === "keywords" ? "Palabras Clave" : "Profesión"}{" "}
                  {/* Versión más corta */}
                </span>
                <ChevronDown
                  size={18} // Ícono ligeramente más pequeño
                  className={`text-gray-400 transition-transform duration-300 ${showModeSelector ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown del Selector de Modo */}
              {showModeSelector && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                  <div
                    onClick={() => {
                      setMode("keywords");
                      setShowModeSelector(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        Palabras Clave
                      </p>
                      <p className="text-xs text-gray-500">
                        Describe lo que necesitas
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setMode("profession");
                      setShowModeSelector(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-t border-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-800">Profesión</p>
                      <p className="text-xs text-gray-500">
                        Lista de profesiones
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Botón de Enviar */}
            <button
              // Reducimos el padding de p-3 a p-2.5 y el ícono de 20 a 18
              className="bg-gray-900 hover:bg-black text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center group"
            >
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* --- RESULTADOS / SUGERENCIAS (DROPDOWN) --- (El dropdown se mantiene similar) */}
        {isOpen && (results.length > 0 || mode === "profession") && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 p-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {results.length === 0 && mode === "keywords" && query && (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No encontramos sugerencias exactas. Prueba con otra palabra.
                </div>
              )}

              {mode === "profession" ? (
                // LISTADO DE PROFESIONES
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {results.map((prof: any) => (
                    <div
                      key={prof.id}
                      onClick={() => handleSelect(prof.name)}
                      className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors group"
                    >
                      <span className="text-xl">{prof.icon}</span>
                      <span className="font-medium text-gray-700 group-hover:text-blue-700">
                        {prof.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                // LISTADO DE TAGS / SUGERENCIAS
                <div className="flex flex-col">
                  {results.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.tag)}
                      className="flex items-center justify-between p-3 hover:bg-indigo-50 rounded-xl cursor-pointer transition-colors border-b last:border-0 border-gray-50 group"
                    >
                      <div className="flex items-center gap-3">
                        <Search
                          size={18}
                          className="text-gray-400 group-hover:text-indigo-500"
                        />
                        <span className="font-medium text-gray-700">
                          {item.tag}
                        </span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md group-hover:bg-white">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer del Dropdown (Opcional: Ubicación) */}
            <div className="border-t border-gray-100 mt-2 pt-2 px-2 pb-1">
              <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin size={14} />
                <span>Filtrar resultados cerca de mi ubicación</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalSearch;
