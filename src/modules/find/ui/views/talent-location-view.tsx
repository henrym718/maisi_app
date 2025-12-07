import { ArrowLeft } from "lucide-react";
import TalentCitySelector from "../components/talent-city-selector";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface Props {
  setStep: Dispatch<SetStateAction<1 | 2>>;
}
export default function TalentLocationView({ setStep }: Props) {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* === COLUMNA IZQUIERDA: Imagen de fondo === */}
      <div className="hidden lg:flex items-center justify-center bg-red-50 relative">
        <ArrowLeft
          className="absolute top-10 left-10 text-gray-800 cursor-pointer"
          size={20}
          onClick={() => setStep(1)}
        />
        <Image
          src="/pin.webp"
          alt="pin"
          width={280}
          height={280}
          className="object-contain"
        />
      </div>

      {/* === COLUMNA DERECHA: Selector de ciudades === */}
      <div className="flex items-center justify-center">
        <div className="max-w-md">
          <h1 className="font-sans text-3xl md:text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
            ¿De que ciudad te gustaría buscar servicios?
          </h1>
          <TalentCitySelector />
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1974&auto=format&fit=crop"
            alt="Buscando al profesional ideal"
            className="w-full h-[550px] object-cover rounded-3xl shadow-xl"
          />
        </div>

        
        <div className="flex flex-col w-full justify-center items-center text-center lg:text-left">
          <CitySelector />
        </div> */
}
