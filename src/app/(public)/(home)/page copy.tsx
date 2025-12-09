"use client";

import { Input } from "@/components/ui/input";
import HeroMinimalSearch from "@/modules/find/ui/components/talent-search-Input";
import { Search } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    name: "Electricistas",
    img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
  },
  {
    name: "Plomeros",
    img: "https://images.unsplash.com/photo-1581091012184-5c1d55f1425c",
  },
  {
    name: "Gasistas",
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4",
  },
  {
    name: "Carpinteros",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  },
  {
    name: "Cerrajeros",
    img: "https://images.unsplash.com/photo-1527698266440-12104e498b76",
  },
  {
    name: "Pintores",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
  {
    name: "Jardineros",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
  {
    name: "Albañiles",
    img: "https://images.unsplash.com/photo-1603112579126-47dde8c4eafc",
  },
  {
    name: "Niñeras",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    name: "Mascotas",
    img: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
  },
  {
    name: "Tecnicos",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    name: "Limpieza",
    img: "https://images.unsplash.com/photo-1598514982849-808fa5e0353b",
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-extrabold text-blue-600">TALENTUM</h1>

          <div className="relative w-full max-w-xl ml-4">
            <HeroMinimalSearch />
          </div>

          <div className="hidden md:block">
            <button className="text-sm font-semibold text-gray-700 hover:text-black">
              Iniciar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
          {/* Left images */}
          <div className="hidden lg:flex flex-col gap-4">
            <Image
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
              width={350}
              height={500}
              className="rounded-xl object-cover"
              alt="Hero left 2"
            />
          </div>

          {/* Center text */}
          <div className="text-center px-6">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Encuentra el talento ideal
              <br />
              para tu próximo proyecto
            </h2>

            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Descubre profesionales verificados para cualquier necesidad:
              técnicos, instaladores, especialistas del hogar y más.
            </p>
          </div>

          {/* Right images */}
          <div className="hidden lg:flex flex-col gap-4">
            <Image
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              width={350}
              height={500}
              className="rounded-xl object-cover"
              alt="Hero right 2"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto mt-16 px-4 pb-20">
        <h3 className="text-2xl font-bold mb-6">Explora categorías</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-2xl border p-4 flex flex-col items-center hover:shadow-md cursor-pointer bg-white"
            >
              <div className="w-20 h-20 mb-3 overflow-hidden rounded-xl">
                <Image
                  src={cat.img}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  alt={cat.name}
                />
              </div>

              <span className="font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
