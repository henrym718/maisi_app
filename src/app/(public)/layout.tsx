import { Button } from "@/components/ui/button";
import { Menubar } from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Search, UserCircle } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      {/* HEADER: Sticky en la parte superior con efecto de vidrio */}
      <header className="w-full backdrop-blur bg-teal-400">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg font-bold shadow-sm bg-black text-white">
                M
              </div>
            </Link>

            <div className="flex items-center">
              <Link href="/talentos" passHref>
                <Button
                  variant="link"
                  className="px-2.5 text-primary-foreground"
                >
                  Explorar
                </Button>
              </Link>
              <Link href="/onboarding-talent" passHref>
                <Button
                  variant="link"
                  className="px-2.5 text-primary-foreground"
                >
                  Ofrecer servicios
                </Button>
              </Link>
              <Link href="/onboarding-client" passHref>
                <Button
                  variant="link"
                  className="px-2.5 text-primary-foreground"
                >
                  Contratar talentos
                </Button>
              </Link>
            </div>
          </div>

          {/* NAVEGACIÓN DESKTOP (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Enlaces de Roles */}

            <div className="h-6 w-px bg-border/60"></div>

            {/* Login - Botón Sólido Primary (Teal) */}
            <Button
              asChild
              variant="outline"
              className="border-2 border-primary-foreground gap-2 bg-transparent px-5! h-10 hover:bg-primary/90"
            >
              <Link href="/sign-in">
                <LogIn />
                <span className="pb-0.5">Iniciar sesión</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* MAIN: El contenido principal ocupa el espacio restante */}
      <main className="flex-1 w-full">{children}</main>

      {/* FOOTER: Sección inferior */}
      <footer className="border-t border-gray-200 bg-black/95">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
          {/* Copyright */}
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Mi Empresa, Inc. Todos los
              derechos reservados.
            </p>
          </div>

          {/* Redes Sociales / Links extra */}
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              {/* Icono SVG de ejemplo */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
