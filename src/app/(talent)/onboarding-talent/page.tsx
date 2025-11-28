import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Coins,
  LayoutDashboard,
  Globe2,
  Handshake, // Icono para trato directo
  ArrowRight,
  Bell,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

const TalentOnboardingIntro = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* --- HEADER SIMPLE (Sticky) --- */}
      <header className="py-6 px-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-gray-900">
          TuLogo<span className="text-teal-500">.</span>
        </div>
        <div className="text-sm text-gray-500 hidden sm:block">
          Configurando cuenta de Talento
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-4 py-10 md:py-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* COLUMNA IZQUIERDA: La Promesa y los Pasos */}
          <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-semibold rounded-full mb-2">
              Perfil de Talento
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Todo lo que necesitas para conectar con clientes y crecer.
            </h1>
            <p className="text-lg text-gray-600">
              Con tu cuenta en Talento tendrás visibilidad ante miles de
              clientes y podrás impulsar tu carrera sin intermediarios.
            </p>

            {/* PASOS: El flujo de trabajo interno */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                Tu camino al éxito:
              </h3>

              <div className="relative border-l-2 border-gray-200 ml-3 space-y-10 pb-2">
                {/* Paso 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-teal-500 border-2 border-white ring-2 ring-teal-100"></span>
                  <h4 className="font-bold text-gray-900">
                    1. Regístrate y Configura
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Crea tu perfil de talento, elige tu grupo y categoría
                    profesional. Define tu ubicación y detalles para destacar.
                  </p>
                </div>
                {/* Paso 2: EL GANCHO DE LAS MONEDAS */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gray-300 border-2 border-white"></span>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    2. Recibe tu Bono{" "}
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-bold">
                      100 Monedas
                    </span>
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Obtén <strong>100 monedas gratis</strong> en tu billetera
                    automáticamente. Úsalas para aplicar a tus primeras ofertas
                    sin pagar nada.
                  </p>
                </div>
                {/* Paso 3 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gray-300 border-2 border-white"></span>
                  <h4 className="font-bold text-gray-900">
                    3. Conecta y Cobra Directo
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Aplica a ofertas, consigue clientes y cobra por tus
                    servicios directamente con ellos. ¡Tú eres tu propio jefe!
                  </p>
                </div>
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN (Oculto en móvil) */}
            <div className="pt-4 hidden lg:block">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-teal-500 hover:bg-teal-600 text-white w-full md:w-auto shadow-lg shadow-teal-500/20 group transition-all"
              >
                Configurar mi perfil ahora{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs text-gray-400 mt-3 text-left">
                Registro gratuito. Sin comisiones por contratación.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Visualización CSS del Dashboard */}
          <div className="flex-1 w-full flex justify-center relative">
            <div className="relative w-full max-w-[480px] aspect-[4/3]">
              {/* Fondo decorativo inclinado */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-50 rounded-3xl transform rotate-6 scale-95 -z-10"></div>

              {/* EL DASHBOARD CONSTRUIDO CON CÓDIGO */}
              <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
                {/* Barra superior del dashboard */}
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-500">
                        YO
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="h-2 w-20 bg-gray-200 rounded mb-1"></div>
                    </div>
                  </div>
                  <Bell size={18} className="text-gray-400" />
                </div>

                {/* Cuerpo del dashboard */}
                <div className="p-6 flex-1 bg-gray-50 flex flex-col gap-4">
                  {/* WIDGET: Billetera Virtual Destacada */}
                  <div className="bg-gray-900 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2">
                      <Coins size={80} />
                    </div>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">
                      Tu Saldo Inicial
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-teal-400">
                        100
                      </span>
                      <span className="text-sm text-gray-300">Monedas</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <div className="px-2 py-1 rounded bg-white/10 text-[10px] border border-white/10">
                        Bono Bienvenida
                      </div>
                      <div className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 text-[10px] border border-teal-500/20 flex items-center gap-1">
                        <CheckCircle2 size={10} /> Listo para aplicar
                      </div>
                    </div>
                  </div>

                  {/* WIDGET: Visitas al Perfil (Nuevo Widget solicitado) */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-gray-500 font-medium uppercase">
                          Visitas al Perfil
                        </span>
                        <div className="text-2xl font-bold text-gray-900 mt-1">
                          24{" "}
                          <span className="text-xs font-normal text-green-600 bg-green-50 px-1 rounded">
                            +12%
                          </span>
                        </div>
                      </div>
                      <Globe2 className="text-teal-500 opacity-20" size={32} />
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-2/3 bg-teal-400 rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                      Tu perfil está siendo visto por clientes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Elemento Flotante: Conexión Directa */}
              <div className="absolute -right-4 top-10 bg-white p-3 rounded-lg shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[150px]">
                <div className="flex items-center gap-2">
                  <Handshake size={20} className="text-teal-500" />
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Trato Directo
                    </p>
                    <p className="text-[9px] text-gray-500 leading-tight">
                      Negocia libremente con el cliente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE CARDS --- */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
            Tu cuenta Gratuita incluye:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                  <Coins size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100 Monedas</h3>
                <p className="text-sm text-gray-600">
                  Empieza sin invertir. Te regalamos saldo suficiente para
                  aplicar a tus primeras ofertas de trabajo.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2: Algoritmo */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Ofertas a Medida
                </h3>
                <p className="text-sm text-gray-600">
                  Nuestro algoritmo te muestra trabajos basados exactamente en
                  tu categoría y grupo profesional.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3: Control Perfil */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Control Total</h3>
                <p className="text-sm text-gray-600">
                  Edita tu ubicación, sube detalles de tu experiencia y mira
                  quién visita tu perfil en tiempo real.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4: Sin Intermediarios (Lo que pediste) */}
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                  <Handshake size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Sin Intermediarios
                </h3>
                <p className="text-sm text-gray-600">
                  Tu perfil es público. Los clientes pueden contactarte
                  directamente para contratarte sin barreras.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN FINAL DE ACCIÓN (CTA) --- */}
      <section className="bg-teal-900 py-16 text-white mt-auto">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para conseguir tu primer cliente?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Configura tus habilidades en menos de 3 minutos. Al crear tu cuenta
            hoy, cargamos tu billetera virtual para que puedas aplicar a ofertas
            sin pagar nada.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-12 text-lg bg-white text-teal-900 hover:bg-gray-100 font-bold w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1"
            >
              Completar mi perfil ahora
            </Button>
            <p className="text-sm text-teal-400/80 mt-4 flex items-center gap-2">
              <ShieldCheck size={16} /> Tus datos personales están seguros.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentOnboardingIntro;
