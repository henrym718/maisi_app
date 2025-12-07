"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  Briefcase,
  ChevronRight,
  Filter,
  Star,
  Send,
  // Iconos para homogeneidad visual
  HardHat, // Usaremos este para Profesionales / Especialidades
  Code,
  ArrowDown,
  ChevronDown, // Usaremos este para Servicios / Búsquedas Populares
} from "lucide-react";

// --- DATA SIMULADA (MANTENIDA) ---
const PROFESIONES_LIST = [
  { id: 1, name: "Instalador de Aire Acondicionado" },
  { id: 2, name: "Electricista" },
  { id: 3, name: "Plomero" },
  { id: 4, name: "Pintor" },
  { id: 5, name: "Carpintero" },
  { id: 6, name: "Cerrajero" },
  { id: 7, name: "Gasista" },
  { id: 8, name: "Herrero" },
  { id: 9, name: "Albañil" },
];

const SERVICIOS_TAGS = [
  { id: 101, tag: "Instalación de aires" },
  { id: 102, tag: "Reparación de calentador de agua" },
  { id: 103, tag: "Pintar habitación interior" },
  { id: 104, tag: "Cableado nuevo para casa" },
];

const PERSONAS_RESULTADOS = [
  {
    id: 201,
    name: "Juan Cárdenas",
    category: "Electricista Certificado",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 202,
    name: "María Gómez",
    category: "Instaladora de A/C",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 203,
    name: "Pedro Pérez",
    category: "Pintor Interior",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 204,
    name: "Ana López",
    category: "Electricista",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 205,
    name: "Luis Rodríguez",
    category: "Plomero",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 206,
    name: "Javier Solís",
    category: "Cerrajero",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 207,
    name: "Elena Torres",
    category: "Gasista",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
];

type FilterType = "All" | "Professionals" | "Services" | "People";

// --- COMPONENTE PRINCIPAL ---
const HeroMinimalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Lógica para cerrar el dropdown de resultados al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsFocused(false);
        if (query.length === 0) {
          setSelectedFilter("All");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Lógica de filtrado de resultados (Search Input)
  const getFilteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    const results = {
      professions: [] as { id: number; name: string }[],
      services: [] as { id: number; tag: string }[],
      people: [] as typeof PERSONAS_RESULTADOS, // Usar el tipo del arreglo original
      totalCount: 0,
    };

    if (q.length > 0) {
      // Solo filtramos si hay query
      results.professions = PROFESIONES_LIST.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
      results.services = SERVICIOS_TAGS.filter((s) =>
        s.tag.toLowerCase().includes(q)
      );

      // Búsqueda de Personas solo por 'name' (nombre del profesional)
      results.people = PERSONAS_RESULTADOS.filter((p) =>
        p.name.toLowerCase().includes(q)
      );

      results.totalCount =
        results.professions.length +
        results.services.length +
        results.people.length;
    }

    return results;
  }, [query]);

  const filteredResults = getFilteredResults;
  const hasResults = filteredResults.totalCount > 0;

  const isPopularSearchState = isFocused && query.length === 0;
  const showResultsDropdown =
    isFocused && (query.length > 0 || isPopularSearchState);

  const handleClear = () => {
    setQuery("");
    setIsFocused(true);
    setSelectedFilter("All");
  };

  const handleSelect = (text: string) => {
    setQuery(text);
    setIsFocused(false);
    handleSearchSubmit(text);
  };

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
    setIsFocused(true);
  };

  const handleSearchSubmit = (searchQuery = query) => {
    if (searchQuery) {
      console.log(`Iniciando búsqueda total para: ${searchQuery}`);
      setIsFocused(false);
    }
  };

  const showSearchFooter = query.length > 0 && hasResults;

  // Lógica para mostrar los resultados según el filtro seleccionado
  const visibleResults = useMemo(() => {
    const { professions, services, people } = filteredResults;

    if (query.length === 0)
      return { professions: [], services: [], people: [] };

    switch (selectedFilter) {
      case "Professionals":
        return { professions, services: [], people: [] };
      case "Services":
        return { professions: [], services, people: [] };
      case "People":
        return { professions: [], services: [], people };
      case "All":
      default:
        return { professions, services, people };
    }
  }, [selectedFilter, filteredResults, query]);

  // Se separan los resultados que se renderizarán como listado (Profesiones y Servicios)
  const listResults = useMemo(() => {
    return [
      ...visibleResults.professions.map((p) => ({
        ...p,
        type: "profession",
        icon: HardHat,
        name: p.name,
      })),
      ...visibleResults.services.map((s) => ({
        ...s,
        type: "service",
        icon: Briefcase,
        name: s.tag,
      })),
    ];
  }, [visibleResults]);

  // Los resultados de 'People' (Talentos) se usan directamente de visibleResults
  const talentResults = visibleResults.people;
  const hasListResults = listResults.length > 0;
  const hasTalentResults = talentResults.length > 0;

  return (
    <div className="lex flex-col items-center">
      <div className="w-full relative">
        {/* Contenedor principal de Búsqueda y Dropdowns */}
        <div ref={wrapperRef} className="relative">
          {/* --- BARRA DE BÚSQUEDA MINIMALISTA --- */}
          <div
            className={`
              w-full bg-white border border-gray-300 rounded-lg shadow
              transition-all duration-200 z-30 relative flex items-center py-2 pl-4
            `}
          >
            {/* 1. Input de Búsqueda */}
            <div className="flex items-center flex-1 p-1">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsFocused(true);
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Busca por Nombre, Especialidad o Servicio..."
                className="w-full text-base font-medium text-gray-900 outline-none bg-transparent placeholder:text-base"
              />

              <ChevronDown size={22} className="text-gray-500 mx-3 shrink-0" />
            </div>
          </div>

          {/* 💥 --- DROPDOWN DE RESULTADOS DE BÚSQUEDA (ESTILO PESTAÑAS) --- 💥 */}
          {showResultsDropdown && (
            <div className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-20 px-3 animate-in slide-in-from-top-2 fade-in duration-200">
              {/* FILTROS / PESTAÑAS (Solo visibles si hay query o es estado popular) */}
              {(query.length > 0 || isPopularSearchState) && (
                <div className="border-b border-gray-100 px-1 py-2 flex items-center justify-start text-sm gap-4 overflow-x-auto whitespace-nowrap mb-3">
                  <FilterPill
                    label="Todos"
                    count={filteredResults.totalCount}
                    isActive={selectedFilter === "All"}
                    onClick={() => handleFilterClick("All")}
                    isSearchMode={query.length > 0}
                  />
                  <FilterPill
                    label="Especialidades"
                    count={filteredResults.professions.length}
                    isActive={selectedFilter === "Professionals"}
                    onClick={() => handleFilterClick("Professionals")}
                    isSearchMode={query.length > 0}
                  />
                  <FilterPill
                    label="Servicios"
                    count={filteredResults.services.length}
                    isActive={selectedFilter === "Services"}
                    onClick={() => handleFilterClick("Services")}
                    isSearchMode={query.length > 0}
                  />
                  <FilterPill
                    label="Talento"
                    count={filteredResults.people.length}
                    isActive={selectedFilter === "People"}
                    onClick={() => handleFilterClick("People")}
                    isSearchMode={query.length > 0}
                  />
                </div>
              )}

              <div className="max-h-60 overflow-y-auto">
                {/* 1. MUESTRA ESTADO DE NO RESULTADOS */}
                {query.length > 0 && !hasResults && (
                  <NoResultsState query={query} filter={selectedFilter} />
                )}

                {/* 2. MUESTRA RESULTADOS POPULARES (SI NO HAY QUERY) */}
                {isPopularSearchState && (
                  <div className="pb-3">
                    {/* Título simple sin ícono, solo texto */}
                    <div className="px-3 pt-2 mb-1">
                      <span className="text-xs font-semibold text-gray-600 tracking-wider">
                        BÚSQUEDAS POPULARES
                      </span>
                    </div>
                    {SERVICIOS_TAGS.slice(0, 3).map((item) => (
                      <ResultItemSimple
                        key={item.id}
                        name={item.tag}
                        icon={Code} // Icono para búsquedas populares (simuladas como servicios)
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                )}

                {/* 3. MUESTRA RESULTADOS DE BÚSQUEDA (SI HAY QUERY Y RESULTADOS) */}
                {query.length > 0 && hasResults && (
                  <>
                    {/* Renderiza Especialidades/Profesionales y Servicios como lista vertical */}
                    {(hasListResults ||
                      selectedFilter === "Professionals" ||
                      selectedFilter === "Services") &&
                      selectedFilter !== "People" && (
                        <div className="pb-3">
                          {listResults.map((item) => (
                            <ResultItemSimple
                              key={item.id}
                              name={item.name}
                              icon={item.icon}
                              onSelect={handleSelect}
                            />
                          ))}
                        </div>
                      )}

                    {/* Renderiza Talento (Personas) en carrusel horizontal */}
                    {hasTalentResults &&
                      (selectedFilter === "All" ||
                        selectedFilter === "People") && (
                        <TalentResultsSection
                          people={talentResults}
                          onSelect={handleSelect}
                          isSeparated={
                            hasListResults && selectedFilter === "All"
                          }
                        />
                      )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE SECCIÓN DE TALENTOS (Diseño Horizontal Solicitado) ---

interface TalentResultsSectionProps {
  people: { id: number; name: string; category: string; avatarUrl: string }[];
  onSelect: (text: string) => void;
  isSeparated: boolean; // Para saber si necesita un border-top
}

const TalentResultsSection: React.FC<TalentResultsSectionProps> = ({
  people,
  onSelect,
  isSeparated,
}) => {
  if (people.length === 0) return null;

  return (
    <div className={`pt-3 ${isSeparated ? "border-t border-gray-100" : ""}`}>
      {/* Título de sección simple: "Talentos" */}
      <div className="px-3 mb-2">
        <span className="text-xs font-semibold text-gray-600 tracking-wider">
          Talentos
        </span>
      </div>

      {/* Carrusel Horizontal (flex-wrap para mostrar en una sola línea y permitir scroll) */}
      <div className="flex overflow-x-auto space-x-2 pb-2 px-3">
        {people.map((person) => (
          <TalentCarouselItem
            key={person.id}
            name={person.name}
            avatarUrl={person.avatarUrl}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

// --- ITEM INDIVIDUAL DEL CARRUSEL DE TALENTOS ---

interface TalentCarouselItemProps {
  name: string;
  avatarUrl: string;
  onSelect: (text: string) => void;
}

const TalentCarouselItem: React.FC<TalentCarouselItemProps> = ({
  name,
  avatarUrl,
  onSelect,
}) => {
  // Mostrar el nombre completo
  return (
    <div
      onClick={() => onSelect(name)}
      className="flex items-center gap-2 p-1 pr-3 rounded-full bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer shrink-0 border border-gray-100"
    >
      {/* Avatar (Usando img de la URL proporcionada) */}
      <div
        className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shrink-0`}
      >
        <img
          src={avatarUrl}
          alt={`Avatar de ${name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nombre en la misma línea (milea) */}
      <span className="text-sm font-medium text-gray-800 line-clamp-1">
        {name}
      </span>
    </div>
  );
};

// --- COMPONENTE DE ESTADO DE NO RESULTADOS (ZERO STATE) ---

interface NoResultsStateProps {
  query: string;
  filter: FilterType;
}

const NoResultsState: React.FC<NoResultsStateProps> = ({ query, filter }) => {
  let suggestionText = `Intenta con términos más generales o cambia el filtro.`;

  if (filter === "Professionals") {
    suggestionText = `¿Seguro que escribiste bien la especialidad? Ej: "Electricista" o "Plomero"`;
  } else if (filter === "Services") {
    suggestionText = `Prueba con servicios comunes, como "pintura" o "reparación de calentador".`;
  } else if (filter === "People") {
    suggestionText = `Recuerda buscar por el nombre completo del profesional, no por su especialidad.`;
  } else if (query.length > 1) {
    suggestionText = `Intenta buscar por servicio, como "pintura" o "plomería"`;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="p-4 bg-gray-100 rounded-full mb-4">
        <Search size={32} className="text-gray-400" />
      </div>

      <h4 className="text-base font-semibold text-gray-800 mb-1">
        No encontramos resultados para "{query}"
      </h4>

      <p className="text-sm text-gray-500 max-w-sm">{suggestionText}</p>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
  isSearchMode: boolean;
}

// Componente FilterPill (Pestaña) con conteo
const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  onClick,
  count,
  isSearchMode,
}) => {
  const shouldShowCount = isSearchMode && count > 0;

  return (
    <button
      onClick={onClick}
      className={`
                flex items-center text-sm font-medium p-1 transition-colors relative 
                ${
                  isActive
                    ? "text-gray-900 border-b-2 border-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-800"
                }
            `}
    >
      <span className="shrink-0">{label}</span>
      {/* Badge de conteo */}
      {shouldShowCount && (
        <span
          className={`
                      ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold 
                      ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                      }
                  `}
        >
          {count}
        </span>
      )}
    </button>
  );
};

interface ResultItemSimpleProps {
  name: string;
  onSelect: (text: string) => void;
  icon: React.ElementType;
}

// ResultItemSimple con icono sutil para homogeneidad
const ResultItemSimple: React.FC<ResultItemSimpleProps> = ({
  name,
  onSelect,
  icon: Icon,
}) => (
  <div
    onClick={() => onSelect(name)}
    className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
  >
    <div className="flex items-center gap-3">
      {/* Contenedor de icono sutil */}
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-gray-500" />
      </div>
      <span className="font-medium text-gray-800 text-sm">{name}</span>
    </div>
    <ChevronRight
      size={14}
      className="text-gray-300 group-hover:text-gray-500"
    />
  </div>
);

export default HeroMinimalSearch;
