import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  LayoutDashboard,
  Search,
  Users,
  Wallet,
  ArrowRight,
  ShieldCheck, // <--- Nuevo icono importado
} from "lucide-react";

const ClientOnboardingIntro = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* --- HEADER SIMPLE (Solo Logo) --- */}
      <header className="py-6 px-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-gray-900">
          TuLogo<span className="text-teal-600">.</span>
        </div>
        <div className="text-sm text-gray-500 hidden sm:block">
          Creando cuenta de Cliente
        </div>
      </header>

      {/* --- HERO SECTION: Explicación del Rol --- */}
      <section className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* COLUMNA IZQUIERDA: La Promesa */}
          <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-semibold rounded-full mb-2">
              Perfil de Cliente
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Todo listo para gestionar tus contrataciones.
            </h1>
            <p className="text-lg text-gray-600">
              Al crear tu cuenta de Cliente, obtendrás acceso inmediato a
              herramientas diseñadas para encontrar, filtrar y contratar
              profesionales sin barreras.
            </p>

            {/* PASOS: El flujo de trabajo interno */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                Tu flujo de trabajo será así:
              </h3>

              <div className="relative border-l-2 border-gray-200 ml-3 space-y-10 pb-2">
                {/* Paso 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-teal-600 border-2 border-white ring-2 ring-teal-100"></span>
                  <h4 className="font-bold text-gray-900">
                    1. Publica Ofertas (Gratis)
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Define qué necesitas. Podrás crear tantas ofertas de trabajo
                    como requieras sin costo alguno.
                  </p>
                </div>
                {/* Paso 2 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gray-300 border-2 border-white"></span>
                  <h4 className="font-bold text-gray-900">
                    2. Filtra Talentos
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Usa tu dashboard para ver postulantes o usa el buscador para
                    contactar perfiles directamente según sus habilidades.
                  </p>
                </div>
                {/* Paso 3 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gray-300 border-2 border-white"></span>
                  <h4 className="font-bold text-gray-900">
                    3. Contrata y Gestiona
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Aprueba el trabajo y realiza pagos seguros desde tu panel de
                    control centralizado.
                  </p>
                </div>
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN (Continuar al Formulario) */}
            <div className="pt-4 hidden lg:block">
              {" "}
              {/* Oculto en móvil aquí para priorizar el scroll */}
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-teal-600 hover:bg-teal-700 w-full md:w-auto shadow-lg shadow-teal-600/20 group text-white"
              >
                Continuar y crear mi perfil
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs text-gray-400 mt-3 text-left">
                Siguiente paso: Tus datos personales y de empresa.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Visualización del Dashboard (Imagen "Apilada") */}
          <div className="flex-1 w-full flex justify-center relative">
            <div className="relative w-full max-w-[500px] aspect-[4/3]">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-blue-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>

              {/* Imagen Principal: Representación del Dashboard que van a recibir */}
              <div className="relative z-10 w-full h-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Header falso del dashboard */}
                <div className="h-12 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                {/* Contenido falso del dashboard */}
                <div className="p-6 flex-1 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-8 w-48 bg-gray-900 rounded"></div>
                    </div>
                    <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <LayoutDashboard className="text-teal-600 w-5 h-5" />
                    </div>
                  </div>
                  {/* Lista de candidatos simulada */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div className="flex-1">
                          <div className="h-3 w-24 bg-gray-200 rounded mb-1"></div>
                          <div className="h-2 w-16 bg-gray-100 rounded"></div>
                        </div>
                        <div className="h-8 w-20 bg-teal-50 rounded text-teal-600 text-xs flex items-center justify-center font-bold">
                          Contratar
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tooltip Flotante */}
                <div className="absolute bottom-8 right-8 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="text-green-400 w-4 h-4" />
                    <span className="font-bold text-sm">
                      Dashboard Activado
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Podrás gestionar ofertas y pagos desde aquí.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE CARDS: Detalle de funcionalidades --- */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
            Lo que incluye tu cuenta de Cliente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Wallet size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Publicaciones Gratis
                </h3>
                <p className="text-sm text-gray-600">
                  No pagas por publicar. Crea ofertas detalladas para atraer
                  talento y paga solo cuando contrates.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  <Search size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Buscador Inteligente
                </h3>
                <p className="text-sm text-gray-600">
                  Acceso a filtros por categoría, grupo profesional y
                  habilidades para encontrar perfiles específicos.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Selección de Talento
                </h3>
                <p className="text-sm text-gray-600">
                  Revisa perfiles completos, portafolios y calificaciones de
                  otros clientes antes de decidir.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Gestión Centralizada
                </h3>
                <p className="text-sm text-gray-600">
                  Tu propio dashboard para chatear, recibir entregables y
                  controlar el estado de tus proyectos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN FINAL DE ACCIÓN (NUEVO) --- */}
      <section className="bg-teal-900 py-16 text-white mt-auto">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para encontrar a tu próximo experto?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Solo te falta completar los datos de tu empresa. El proceso es
            rápido, seguro y te dará acceso inmediato al buscador de talentos.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-12 text-lg bg-white text-teal-900 hover:bg-gray-100 font-bold w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1"
            >
              Completar mi perfil ahora
            </Button>
            <p className="text-sm text-teal-400/80 mt-4 flex items-center gap-2">
              <ShieldCheck size={16} /> Tus datos están encriptados y
              protegidos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientOnboardingIntro;
