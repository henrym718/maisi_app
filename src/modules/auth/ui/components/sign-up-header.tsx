import Link from "next/link";

interface Props {
  role: "client" | "talent";
}

export default function SignUpHeader({ role }: Props) {
  const title =
    role === "client" ? "Registrate como cliente" : "Registrate como talento";

  return (
    <header className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold font-oswald">{title}</h2>

      <div className="flex items-center gap-2">
        <p className="font-light">Ya tienes una cuenta?</p>
        <Link href="/sign-in">
          <span className="font-semibold underline underline-offset-2">
            Log in
          </span>
        </Link>
      </div>
    </header>
  );
}
