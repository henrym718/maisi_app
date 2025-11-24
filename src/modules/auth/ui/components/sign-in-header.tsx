import Link from "next/link";

export default function SignInHeader() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tighter">Iniciar sesión</h2>
      <div className="flex items-center gap-1 text-xs mt-2 mb-4">
        <Link
          href="/sign-up?role=client"
          className="underline text-foreground hover:text-red-400 transition-colors tracking-tighter"
        >
          Quiero contratar
        </Link>
        <span className="text-muted-foreground tracking-tighter">o</span>
        <Link
          href="/sign-up?role=talent"
          className="underline text-foreground hover:text-red-400 transition-colors tracking-tighter"
        >
          Quiero trabajar
        </Link>
      </div>
    </div>
  );
}
