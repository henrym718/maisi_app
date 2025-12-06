import CitySelector from "../components/talent-city-selector";

export default function TalentLocationView() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full gap-12 lg:gap-24 items-center">
        {/* === COLUMNA IZQUIERDA: Imagen de fondo === */}
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1974&auto=format&fit=crop"
            alt="Buscando al profesional ideal"
            className="w-full h-[550px] object-cover rounded-3xl shadow-xl"
          />
        </div>

        {/* === COLUMNA DERECHA: Foco total en el Título y la Búsqueda === */}
        <div className="flex flex-col w-full justify-center lg:items-start items-center text-center lg:text-left">
          <div className="w-full mb-6">
            <CitySelector />
          </div>
        </div>
      </div>
    </div>
  );
}
