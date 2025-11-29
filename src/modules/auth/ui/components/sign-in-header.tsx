"use client";

import Link from "next/link";

export default function SignInHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-3xl font-bold font-oswald">Iniciar sesión</h2>
      <div className="flex gap-2 ">
        <p className="font-light">Sin cuenta?, únete como:</p>
        <div className="flex gap-1 ">
          <Link href="/sign-up?role=client">
            <span className="font-semibold underline underline-offset-2">
              Cliente
            </span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/sign-up?role=talent">
            <span className="font-semibold underline underline-offset-2">
              Talento
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
