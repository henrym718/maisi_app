"use client";

import React, { useState, useMemo } from "react";
import { ArrowRight, Check, X } from "lucide-react";

// --- TIPOS DE DATOS ---

interface Canton {
  id: string;
  nombre: string;
}

interface Provincia {
  id: string;
  nombre: string;
  cantones: Canton[];
}

type PasoWizard = 1 | 2 | 3; // 1: Provincia, 2: Cantón, 3: Listo

// --- DATA FICTICIA (Ecuador) ---
const UBICACIONES: Provincia[] = [
  {
    id: "p_guayas",
    nombre: "Guayas",
    cantones: [
      { id: "c_gye", nombre: "Guayaquil" },
      { id: "c_tri", nombre: "El Triunfo" },
      { id: "c_sam", nombre: "Samborondón" },
      { id: "c_dau", nombre: "Daule" },
      { id: "c_mil", nombre: "Milagro" },
      { id: "c_dur", nombre: "Durán" },
      { id: "c_bal", nombre: "Balao" },
      { id: "c_nar", nombre: "Naranjal" },
    ],
  },
  {
    id: "p_pichincha",
    nombre: "Pichincha",
    cantones: [
      { id: "c_uio", nombre: "Quito" },
      { id: "c_cay", nombre: "Cayambe" },
      { id: "c_rum", nombre: "Rumiñahui" },
      { id: "c_mej", nombre: "Mejía" },
      { id: "c_ped", nombre: "Pedro Moncayo" },
    ],
  },
  {
    id: "p_azuay",
    nombre: "Azuay",
    cantones: [
      { id: "c_cue", nombre: "Cuenca" },
      { id: "c_gua", nombre: "Gualaceo" },
      { id: "c_pau", nombre: "Paute" },
      { id: "c_sig", nombre: "Sigsig" },
    ],
  },
  {
    id: "p_manabi",
    nombre: "Manabí",
    cantones: [
      { id: "c_por", nombre: "Portoviejo" },
      { id: "c_man", nombre: "Manta" },
      { id: "c_cho", nombre: "Chone" },
      { id: "c_mon", nombre: "Montecristi" },
    ],
  },
  {
    id: "p_loja",
    nombre: "Loja",
    cantones: [
      { id: "c_loj", nombre: "Loja" },
      { id: "c_cat", nombre: "Catamayo" },
    ],
  },
];

const TalentLocationSelector: React.FC = () => {
  const [paso, setPaso] = useState<PasoWizard>(1);
  const [provinciaSelec, setProvinciaSelec] = useState<Provincia | null>(null);
  const [cantonSelec, setCantonSelec] = useState<Canton | null>(null);
  const [busqueda, setBusqueda] = useState<string>("");

  // --- LÓGICA DE FILTRADO ---
  const opcionesFiltradas = useMemo<(Provincia | Canton)[]>(() => {
    const texto = busqueda.toLowerCase();

    if (paso === 1) {
      return UBICACIONES.filter((p) => p.nombre.toLowerCase().includes(texto));
    }

    if (paso === 2 && provinciaSelec) {
      return provinciaSelec.cantones.filter((c) =>
        c.nombre.toLowerCase().includes(texto)
      );
    }

    return [];
  }, [paso, provinciaSelec, busqueda]);

  // --- MANEJADORES ---

  const seleccionarProvincia = (provincia: Provincia): void => {
    setProvinciaSelec(provincia);
    setCantonSelec(null);
    setBusqueda("");
    setPaso(2);
  };

  const seleccionarCanton = (canton: Canton): void => {
    setCantonSelec(canton);
    setBusqueda("");
  };

  const reiniciar = (): void => {
    setPaso(1);
    setProvinciaSelec(null);
    setCantonSelec(null);
    setBusqueda("");
  };

  const irAPaso1 = (): void => {
    setPaso(1);
    setBusqueda("");
  };

  const finalizar = (): void => {
    if (provinciaSelec && cantonSelec) {
      setPaso(3);
      // Usar alert es solo para el ejemplo. En prod, se haría una navegación/API call.
      alert(
        `¡Listo! Guardado: ${provinciaSelec.nombre} - ${cantonSelec.nombre}`
      );
    }
  };

  const listaOpciones = opcionesFiltradas;
  const isFinalizarDisabled = !provinciaSelec || (paso === 2 && !cantonSelec);

  return (
    <div className="flex flex-col p-8 md:p-16 bg-white justify-center">
      <div className="mb-10">
        <h2 className="text-3xl lg:text-4xl text-gray-900 leading-snug font-semibold tracking-tight">
          Vas a ofrecer tus servicios en <br />
          {/* Provincia Seleccionada */}
          <span
            className={`pb-0.5 transition-opacity duration-300 cursor-pointer ${
              provinciaSelec
                ? "text-teal-500 border-b-2 border-teal-500 hover:opacity-80" // styles.textoResaltado
                : "text-gray-300 border-b-2 border-gray-200" // styles.textoPlaceholder
            }`}
            onClick={irAPaso1}
            title="Cambiar provincia"
          >
            {provinciaSelec ? provinciaSelec.nombre : "________"}
          </span>
          {provinciaSelec && (
            <>
              , {/* Cantón Seleccionado */}
              <span
                className={`pb-0.5 transition-opacity duration-300 ${
                  cantonSelec
                    ? "text-teal-500 border-b-2 border-teal-500 hover:opacity-80 cursor-pointer" // styles.textoResaltado
                    : "text-gray-300 border-b-2 border-gray-200 cursor-default" // styles.textoPlaceholder
                }`}
                onClick={() => provinciaSelec && setPaso(2)}
                title="Cambiar Cantón"
              >
                {cantonSelec ? cantonSelec.nombre : "________"}
              </span>
            </>
          )}
          .
        </h2>
      </div>

      {/* Cuerpo del Wizard */}
      {paso < 3 ? (
        <>
          {/* Buscador */}
          {/* Reemplaza styles.buscadorContainer y inputBuscador */}
          <div className="mb-5">
            <input
              type="text"
              placeholder={`Buscar ${paso === 1 ? "provincia" : "cantón"}...`}
              className="w-full py-4 text-base border-b border-gray-200 outline-none bg-transparent text-gray-700 transition-colors focus:border-teal-500"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              autoFocus
            />
          </div>

          {/* Lista Scrollable (Extraído a un componente para limpieza) */}
          <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {listaOpciones.length > 0 ? (
                listaOpciones.map((item) => {
                  const esSeleccionado =
                    (paso === 1 && provinciaSelec?.id === item.id) ||
                    (paso === 2 && cantonSelec?.id === item.id);

                  return (
                    // Reemplaza styles.item y itemActivo
                    <div
                      key={item.id}
                      className={`
                                    p-4 rounded-lg cursor-pointer text-base font-medium transition-all flex items-center justify-between
                                    ${
                                      esSeleccionado
                                        ? "bg-teal-50 text-teal-800 border border-teal-500"
                                        : "bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200"
                                    }
                                `}
                      onClick={() =>
                        paso === 1
                          ? seleccionarProvincia(item as Provincia)
                          : seleccionarCanton(item as Canton)
                      }
                    >
                      {item.nombre}
                      {esSeleccionado && (
                        <Check size={18} className="text-teal-500 ml-2" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-400 py-5 col-span-full">
                  No encontramos "{busqueda}". Intenta con otro nombre.
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Paso 3: Confirmación */
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center text-4xl mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Todo listo
          </h3>
          <p className="text-gray-500 text-center max-w-sm">
            Has configurado tu zona de cobertura en{" "}
            <strong>
              {cantonSelec?.nombre}, {provinciaSelec?.nombre}
            </strong>
            .
          </p>
        </div>
      )}

      {/* Footer */}
      {/* Reemplaza styles.footer, botonTexto, botonSiguiente, botonDisabled */}
      <div className="mt-10 flex justify-between items-center pt-5 border-t border-gray-100">
        <button
          onClick={reiniciar}
          className="bg-transparent border-none text-gray-400 text-sm font-medium cursor-pointer hover:text-gray-600 transition-colors"
        >
          <X size={16} className="inline-block mr-1" />
          Cancelar y Reiniciar
        </button>

        {paso < 3 && (
          <button
            onClick={finalizar}
            disabled={isFinalizarDisabled}
            className={`py-3 px-8 rounded-lg text-base font-semibold transition-all shadow-md active:scale-[0.98] flex items-center gap-2 ${
              isFinalizarDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-teal-500 text-white hover:bg-teal-600 shadow-teal-300/50"
            }`}
          >
            {paso === 2 && cantonSelec
              ? "Finalizar Configuración"
              : "Continuar"}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TalentLocationSelector;
