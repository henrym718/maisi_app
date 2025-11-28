import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className=" bg-teal-400 pb-20 pt-10 flex items-center">
      <div className="flex mx-auto max-w-7xl items-center px-4 sm:px-6 lg:px-8 gap-10">
        <div className="w-5/12 gap-10">
          <h1 className="text-6xl font-extrabold font-karla tracking-tighter">
            Empieza a crecer tu proyecto con el mejor talento.
          </h1>
          <Button
            asChild
            className="mt-10 h-14 px-20! rounded-sm bg-primary-foreground text-white "
          >
            <Link href="/search">
              <span className="font-sans">Busca un talento</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <Image src="/hero.jpg" alt="" width={500} height={500} />
      </div>
    </section>
  );
}
