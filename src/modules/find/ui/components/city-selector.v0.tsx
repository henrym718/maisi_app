"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { MapPin, X, Check, ChevronDown } from "lucide-react";

// --- DATA ---
const CITIES = [
  "Todo Ecuador",
  "Quito",
  "Guayaquil",
  "Cuenca",
  "Manta",
  "Ambato",
  "Loja",
  "Santo Domingo",
  "Portoviejo",
  "Machala",
  "Riobamba",
  "Ibarra",
  "Esmeraldas",
];

export default function CitySelectorClean({
  onApply,
}: {
  onApply?: (cities: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(["Todo Ecuador"]);
  const [temp, setTemp] = useState<string[]>(["Todo Ecuador"]);
  const ref = useRef<HTMLDivElement>(null);

  // Lógica para cerrar el dropdown al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Restaurar la búsqueda y cerrar
        setSearch("");
        setOpen(false);
      }
    }
    // Solo si el dropdown está abierto, se añade el listener
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleTemp = (city: string) => {
    if (city === "Todo Ecuador") return setTemp(["Todo Ecuador"]);
    let next = temp.includes(city)
      ? temp.filter((c) => c !== city)
      : [...temp.filter((c) => c !== "Todo Ecuador"), city];
    if (next.length === 0) next = ["Todo Ecuador"];
    setTemp(next);
  };

  const toggleSelectedBadge = (city: string) => {
    if (city === "Todo Ecuador") return;
    let next = selected.filter((c) => c !== city);
    if (next.length === 0) next = ["Todo Ecuador"];
    setSelected(next);
  };

  const handleContinue = () => {
    setSelected(temp);
    setOpen(false);
    setSearch("");
    onApply?.(temp);
  };

  const handleClear = () => {
    setSearch("");
    setTemp(["Todo Ecuador"]);
  };

  const handleOpen = () => {
    if (!open) {
      setTemp(selected);
      setOpen(true);
    }
  };

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO (Corregida) ---
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    // 1. Aplicar filtro de búsqueda si existe
    const searchFiltered = CITIES.filter((c) => c.toLowerCase().includes(q));

    if (q) {
      // Si hay búsqueda, se muestra el resultado filtrado sin orden especial
      return searchFiltered;
    }

    // 2. Si no hay búsqueda, aplicar orden por selección CONFIRMADA (estado `selected`)

    // Ciudades seleccionadas (confirmadas al presionar Continuar)
    const confirmedSelected = selected.filter((c) => c !== "Todo Ecuador");

    // Ciudades no seleccionadas (que no están en la lista confirmada, excluyendo 'Todo Ecuador')
    const notSelected = searchFiltered.filter(
      (c) => c !== "Todo Ecuador" && !confirmedSelected.includes(c)
    );

    // 3. Reconstruir la lista ordenada
    let orderedList = [];

    // Siempre "Todo Ecuador" al principio
    if (CITIES.includes("Todo Ecuador")) {
      orderedList.push("Todo Ecuador");
    }

    // Luego las seleccionadas confirmadas (en el orden en que fueron seleccionadas)
    // Usamos el array `selected` para mantener el orden original de selección si es posible.
    // Aunque el orden exacto de `selected` no está garantizado para reflejar siempre el orden de clic,
    // se ordena en base a si *están* seleccionadas.

    // Ordenamos las ciudades seleccionadas confirmadas según su posición en `CITIES` para mantener un orden consistente al abrir.
    const orderedConfirmed = confirmedSelected.sort(
      (a, b) => CITIES.indexOf(a) - CITIES.indexOf(b)
    );

    orderedList.push(...orderedConfirmed);

    // Finalmente, el resto de ciudades no seleccionadas
    orderedList.push(...notSelected);

    // Nota: El uso de `selected` como dependencia en `useMemo` asegura que la lista se reordene
    // **solamente** después de que `handleContinue` actualice el estado `selected`.
    return orderedList;
  }, [search, selected]); // Cambiada la dependencia a `selected` (la selección confirmada)
  // ------------------------------------------------------------------

  const showBadges = !selected.includes("Todo Ecuador");

  return (
    // Contenedor principal con position: relative para que el dropdown se posicione correctamente
    <div className="relative w-full max-w-lg mx-auto font-sans" ref={ref}>
      {/* Contenedor del INPUT y el DROPDOWN (Z-Index alto para garantizar la superposición) */}
      <div className="relative z-50">
        {/* 1. INPUT PRINCIPAL */}
        <div
          className={`flex items-center w-full bg-white border rounded-xl shadow-md p-3 cursor-pointer transition-all duration-200 ${
            open
              ? "border-black ring-2 ring-black/30"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => !open && handleOpen()}
        >
          <MapPin size={20} className="text-gray-500 shrink-0 mx-2" />

          <input
            type="text"
            className="w-full text-base font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            placeholder={
              showBadges
                ? `${selected.length} ciudades seleccionadas...`
                : "Busca o selecciona tu ubicación..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleOpen}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />

          {open ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSearch("");
              }}
              className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          ) : (
            <ChevronDown size={20} className="text-gray-500 ml-2" />
          )}
        </div>

        {/* 2. DROPDOWN LISTADO (Vuelve a ser ABSOLUTO y usa z-50) */}
        {open && (
          <div
            // Restaurado position: absolute para que flote sobre el contenido
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 p-4 animate-in fade-in"
          >
            <div className="max-h-60 overflow-y-auto pb-2">
              <h4 className="text-xs font-semibold text-gray-600 mb-2 tracking-wider">
                {search ? "Resultados de búsqueda" : "Todas las ciudades"}
              </h4>

              {filtered.length > 0 ? (
                filtered.map((city) => (
                  <div
                    key={city}
                    onClick={() => toggleTemp(city)}
                    className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm">
                      {city}
                    </span>

                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        temp.includes(city)
                          ? "bg-black border-black"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {temp.includes(city) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No hay resultados.
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={handleClear}
                className="text-sm font-medium text-black hover:opacity-70 transition-colors py-2 px-3 rounded-lg"
              >
                Limpiar
              </button>

              <button
                onClick={handleContinue}
                className="py-2 px-6 rounded-lg text-white font-semibold text-sm bg-black hover:bg-gray-800"
              >
                Continuar ({temp.includes("Todo Ecuador") ? 1 : temp.length})
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Fin del contenedor con z-50 */}

      {/* 3. BADGES SELECCIONADOS (Estos quedan en el flujo normal, debajo del input) */}
      {showBadges && (
        <div className="mt-3 flex flex-wrap gap-2 p-1">
          {selected.map((city) => (
            <div
              key={city}
              onClick={() => toggleSelectedBadge(city)}
              className="flex items-center gap-1 p-1 px-3 rounded-full text-sm font-medium border border-gray-300 bg-white shadow-sm cursor-pointer hover:bg-gray-100"
            >
              <MapPin size={14} className="text-gray-500" />
              {city}
              <X size={12} className="text-gray-500" />
            </div>
          ))}
        </div>
      )}

      {/* Mensaje de Todo Ecuador */}
      {!showBadges && (
        <div className="mt-3 p-2 text-sm text-gray-500 flex items-center gap-1">
          <Check size={14} className="text-green-500" /> Selección actual: Todo
          Ecuador
        </div>
      )}

      {/* Botón final */}
      <button
        className="w-full mt-5 py-3 rounded-xl bg-teal-500 text-white font-bold text-lg hover:bg-gray-800"
        onClick={() => onApply?.(selected)}
      >
        Continuar
      </button>
    </div>
  );
}
