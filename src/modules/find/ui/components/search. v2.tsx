"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  MapPin,
  X,
  User,
  Briefcase,
  ChevronRight,
  Filter,
  Users,
  Star,
  Check,
  ChevronDown,
  Send,
} from "lucide-react";

// --- DATA SIMULADA ---
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
  { id: 201, name: "Juan Cárdenas", category: "Electricista Certificado" },
  { id: 202, name: "María Gómez", category: "Instaladora de A/C" },
];

const ECUADOR_CITIES = [
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
];

type FilterType = "All" | "Professionals" | "Services" | "People";

// --- COMPONENTE PRINCIPAL ---
const HeroMinimalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "Todo Ecuador",
  ]);
  const [citySearchQuery, setCitySearchQuery] = useState("");

  // wrapperRef: Contenedor de la barra de búsqueda y el dropdown de resultados
  const wrapperRef = useRef<HTMLDivElement>(null);
  // cityRef: Contenedor del botón y el dropdown de ciudades
  const cityRef = useRef<HTMLDivElement>(null);

  // Lógica para cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // 1. Manejar el cierre del dropdown de resultados (isFocused)
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        (!cityRef.current || !cityRef.current.contains(target))
      ) {
        setIsFocused(false);
        if (query.length === 0) {
          setSelectedFilter("All");
        }
      }

      // 2. Manejar el cierre del dropdown de ciudades (showCityDropdown)
      if (cityRef.current && !cityRef.current.contains(target)) {
        setShowCityDropdown(false);
        setCitySearchQuery(""); // Limpiar búsqueda de ciudades al cerrar
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Lógica para seleccionar/deseleccionar ciudades
  const handleCityToggle = (city: string) => {
    if (city === "Todo Ecuador") {
      setSelectedCities(["Todo Ecuador"]);
    } else if (selectedCities.includes("Todo Ecuador")) {
      setSelectedCities([city]);
    } else if (selectedCities.includes(city)) {
      const newCities = selectedCities.filter((c) => c !== city);
      setSelectedCities(newCities.length > 0 ? newCities : ["Todo Ecuador"]);
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  // Genera el texto de la ciudad
  const cityDisplayText = useMemo(() => {
    if (selectedCities.includes("Todo Ecuador")) return "Todo Ecuador";
    if (selectedCities.length === 1) return selectedCities[0];
    return `${selectedCities.length} ciudades`;
  }, [selectedCities]);

  // Lógica de filtrado de CIUDADES
  const filteredCities = useMemo(() => {
    const search = citySearchQuery.toLowerCase().trim();
    if (!search) return ECUADOR_CITIES;
    return ECUADOR_CITIES.filter((city) => city.toLowerCase().includes(search));
  }, [citySearchQuery]);

  // Lógica de filtrado de resultados (Search Input)
  const getFilteredResults = useMemo(() => {
    const q = query.toLowerCase();
    const results = {
      professions: [] as { id: number; name: string }[],
      services: [] as { id: number; tag: string }[],
      people: [] as { id: number; name: string; category: string }[],
    };

    if (selectedFilter === "All" || selectedFilter === "Professionals") {
      results.professions = PROFESIONES_LIST.filter((p) =>
        p.name.toLowerCase().includes(q)
      );
    }
    if (selectedFilter === "All" || selectedFilter === "Services") {
      results.services = SERVICIOS_TAGS.filter((s) =>
        s.tag.toLowerCase().includes(q)
      );
    }
    if (
      (selectedFilter === "All" && q.length >= 1) ||
      selectedFilter === "People"
    ) {
      results.people = PERSONAS_RESULTADOS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return results;
  }, [query, selectedFilter]);

  const filteredResults = getFilteredResults;
  const hasResults =
    filteredResults.professions.length > 0 ||
    filteredResults.services.length > 0 ||
    filteredResults.people.length > 0;

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
    if (selectedFilter === filter) {
      // Si ya está activo, y la búsqueda está vacía, lo reseteamos a All
      if (query.length === 0) {
        setSelectedFilter("All");
      }
    } else {
      setSelectedFilter(filter);
    }
    setIsFocused(true);
  };

  const handleSearchSubmit = (searchQuery = query) => {
    if (searchQuery) {
      console.log(
        `Iniciando búsqueda total para: ${searchQuery} en ciudades: ${selectedCities.join(
          ", "
        )} con filtro: ${selectedFilter}`
      );
      setIsFocused(false);
      setShowCityDropdown(false);
    }
  };

  const getCityButtonClasses = () => {
    const base =
      "flex items-center gap-1 p-2 rounded-xl text-gray-600 transition-colors cursor-pointer text-sm";

    if (selectedCities.includes("Todo Ecuador")) {
      return `${base} bg-gray-100 hover:bg-gray-200 font-medium`;
    }

    return `${base} bg-white text-gray-900 border border-gray-900 shadow-sm font-semibold hover:bg-gray-50`;
  };

  // Condición para mostrar el pie de página
  const showSearchFooter = query.length > 0 && hasResults;

  return (
    <div className="bg-white py-20 lg:py-32 flex flex-col items-center font-sans">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 max-w-2xl text-center">
        Encuentra tu Profesional de confianza. 👷‍♂️
      </h1>

      <div className="w-full max-w-4xl px-4 relative">
        {/* Contenedor principal de Búsqueda y Dropdowns */}
        <div ref={wrapperRef} className="relative">
          {/* --- BARRA DE BÚSQUEDA INTEGRADA: INPUT + CITIES + BUTTON --- */}
          <div
            className={`
              w-full bg-white border border-gray-300 rounded-2xl shadow-xl
              ${isFocused ? "ring-2 ring-blue-500/50" : "hover:border-gray-400"}
              transition-all duration-200 z-30 relative flex items-center p-2
            `}
          >
            {/* 1. Input de Búsqueda */}
            <div className="flex items-center flex-grow p-1">
              <Search size={22} className="text-gray-500 mx-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsFocused(true);
                  setShowCityDropdown(false);
                }}
                onFocus={() => {
                  setIsFocused(true);
                  setShowCityDropdown(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Busca profesión, servicio, o el nombre de un profesional..."
                className="w-full text-lg font-medium text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition-colors shrink-0 ml-2"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* 2. Botón/Pastilla de Ubicación Múltiple (cityRef) */}
            <div
              ref={cityRef}
              className="relative shrink-0 border-l border-gray-200 h-8 flex items-center ml-2 mr-2"
            >
              <button
                onClick={() => {
                  setShowCityDropdown((prev) => !prev);
                  setIsFocused(false);
                }}
                className={getCityButtonClasses()}
                aria-expanded={showCityDropdown}
                aria-haspopup="listbox"
              >
                <MapPin size={18} className="text-gray-500" />
                <span className="text-sm font-medium line-clamp-1 max-w-[120px]">
                  {cityDisplayText}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {/* 💥 DROPDOWN DE CIUDADES MÚLTIPLES 💥 */}
              {showCityDropdown && (
                <div className="absolute top-[calc(100%+12px)] right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-40 p-4 animate-in slide-in-from-top-2 fade-in duration-200">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 tracking-wider flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    Selecciona Ubicación
                  </h3>

                  {/* Input de Búsqueda de Ciudad */}
                  <div className="relative mb-3">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Filtrar ciudades..."
                      value={citySearchQuery}
                      onChange={(e) => setCitySearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onFocus={() => setIsFocused(false)}
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto border-t border-gray-100 pt-2">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <CityCheckboxItem
                          key={city}
                          city={city}
                          isSelected={selectedCities.includes(city)}
                          onToggle={handleCityToggle}
                        />
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500 text-sm">
                        No hay ciudades que coincidan con "{citySearchQuery}".
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Botón de Búsqueda/Enviar */}
            <button
              onClick={() => handleSearchSubmit()}
              disabled={!query}
              className={`
                shrink-0 p-3 rounded-xl transition-all duration-200
                ${
                  query
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
              `}
              aria-label="Iniciar búsqueda"
            >
              <Send size={20} />
            </button>
          </div>

          {/* 💥 --- DROPDOWN DE RESULTADOS DE BÚSQUEDA (ESTILO MEJORADO) --- 💥 */}
          {showResultsDropdown && (
            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-20 p-3 animate-in slide-in-from-top-2 fade-in duration-200">
              {/* FILTROS */}
              <div className="border-b border-gray-100 px-1 py-2 flex items-center justify-start text-sm gap-2 overflow-x-auto whitespace-nowrap mb-3">
                <Filter size={16} className="text-gray-500 shrink-0 ml-1" />
                <FilterPill
                  label="Todos"
                  isActive={selectedFilter === "All"}
                  onClick={() => handleFilterClick("All")}
                />
                <FilterPill
                  label="Especialidad"
                  isActive={selectedFilter === "Professionals"}
                  onClick={() => handleFilterClick("Professionals")}
                />
                <FilterPill
                  label="Servicios"
                  isActive={selectedFilter === "Services"}
                  onClick={() => handleFilterClick("Services")}
                />
                <FilterPill
                  label="Talento"
                  isActive={selectedFilter === "People"}
                  onClick={() => handleFilterClick("People")}
                />
              </div>

              <div className="max-h-80 overflow-y-auto">
                {/* 1. MUESTRA ESTADO DE NO RESULTADOS */}
                {query.length > 0 && !hasResults && (
                  <NoResultsState query={query} filter={selectedFilter} />
                )}

                {/* 2. MUESTRA RESULTADOS POPULARES (SI NO HAY QUERY) */}
                {isPopularSearchState && (
                  <div className="pb-3">
                    <SectionTitle icon={Star} title="Búsquedas Populares" />
                    {SERVICIOS_TAGS.slice(0, 3).map((item) => (
                      <ResultItemSimple
                        key={item.id}
                        name={item.tag}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                )}

                {/* 3. MUESTRA RESULTADOS DE BÚSQUEDA (SI HAY QUERY Y RESULTADOS) */}
                {query.length > 0 && hasResults && (
                  <>
                    {(selectedFilter === "All" ||
                      selectedFilter === "Professionals") &&
                      filteredResults.professions.length > 0 && (
                        <div className="mb-4">
                          <SectionTitle
                            icon={User}
                            title={`Especialidades (${filteredResults.professions.length})`}
                          />
                          {filteredResults.professions.map((item) => (
                            <ResultItemSimple
                              key={item.id}
                              name={item.name}
                              onSelect={handleSelect}
                            />
                          ))}
                        </div>
                      )}

                    {(selectedFilter === "All" ||
                      selectedFilter === "Services") &&
                      filteredResults.services.length > 0 && (
                        <div className="mb-4">
                          <SectionTitle
                            icon={Briefcase}
                            title={`Servicios (${filteredResults.services.length})`}
                          />
                          {filteredResults.services.map((item) => (
                            <ResultItemSimple
                              key={item.id}
                              name={item.tag}
                              onSelect={handleSelect}
                            />
                          ))}
                        </div>
                      )}

                    {(selectedFilter === "All" ||
                      selectedFilter === "People") &&
                      filteredResults.people.length > 0 && (
                        <div>
                          <SectionTitle
                            icon={Users}
                            title={`Profesionales por Nombre (${filteredResults.people.length})`}
                          />
                          {filteredResults.people.map((item) => (
                            <ResultItemPerson
                              key={item.id}
                              name={item.name}
                              category={item.category}
                              onSelect={handleSelect}
                            />
                          ))}
                        </div>
                      )}
                  </>
                )}
              </div>

              {/* 🚀 FOOTER DE BÚSQUEDA COMPLETA (Solo si hay query Y resultados) */}
              {showSearchFooter && (
                <div className="border-t border-gray-100 mt-3 pt-3 px-3">
                  <button
                    onClick={() => handleSearchSubmit()}
                    className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    Buscar todos los resultados para **"{query}"** en{" "}
                    {cityDisplayText}
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE ESTADO DE NO RESULTADOS (ZERO STATE) ---

interface NoResultsStateProps {
  query: string;
  filter: FilterType;
}

const NoResultsState: React.FC<NoResultsStateProps> = ({ query, filter }) => {
  // Definimos sugerencias basadas en el filtro para hacerlo más útil
  let suggestionText = `Intenta con términos más generales o cambia el filtro.`;

  if (filter === "Professionals") {
    suggestionText = `¿Seguro que escribiste bien la especialidad? Ej: "Electricista" o "Plomero"`;
  } else if (filter === "Services") {
    suggestionText = `Prueba con servicios comunes, como "pintura" o "reparación de calentador".`;
  } else if (filter === "People") {
    suggestionText = `¿Estás buscando un profesional específico? Intenta con su nombre completo o especialidad.`;
  } else if (query.length > 1) {
    suggestionText = `Intenta buscar por servicio, como "pintura" o "plomería"`;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      {/* Icono de Lupa Grande y Gris */}
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

interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 px-3 pt-2 mb-1">
    <Icon size={16} className="text-gray-500" />
    <span className="text-xs font-semibold text-gray-600 tracking-wider">
      {title}
    </span>
  </div>
);

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}
const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors shrink-0 ${
      isActive
        ? "bg-gray-900 text-white shadow-sm"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

interface ResultItemSimpleProps {
  name: string;
  onSelect: (text: string) => void;
}
const ResultItemSimple: React.FC<ResultItemSimpleProps> = ({
  name,
  onSelect,
}) => (
  <div
    onClick={() => onSelect(name)}
    className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
  >
    <div className="flex items-center gap-3">
      <span className="font-medium text-gray-800 text-sm">{name}</span>
    </div>
    <ChevronRight
      size={14}
      className="text-gray-300 group-hover:text-gray-500"
    />
  </div>
);

interface ResultItemPersonProps {
  name: string;
  category: string;
  onSelect: (text: string) => void;
}
const ResultItemPerson: React.FC<ResultItemPersonProps> = ({
  name,
  category,
  onSelect,
}) => (
  <div
    onClick={() => onSelect(name)}
    className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-full bg-blue-100 border border-blue-200`}>
        <User size={16} className="text-blue-600" />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-medium text-gray-800 text-sm">{name}</span>
        <span className="text-xs text-gray-500 line-clamp-1">{category}</span>
      </div>
    </div>
    <ChevronRight
      size={14}
      className="text-gray-300 group-hover:text-gray-500"
    />
  </div>
);

interface CityCheckboxItemProps {
  city: string;
  isSelected: boolean;
  onToggle: (city: string) => void;
}
const CityCheckboxItem: React.FC<CityCheckboxItemProps> = ({
  city,
  isSelected,
  onToggle,
}) => (
  <div
    onClick={() => onToggle(city)}
    className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
  >
    <span className="font-medium text-gray-800 text-sm">{city}</span>
    <div
      className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
        isSelected ? "bg-gray-900 border-gray-900" : "bg-white border-gray-300"
      }`}
    >
      {isSelected && <Check size={12} className="text-white" />}
    </div>
  </div>
);

export default HeroMinimalSearch;
