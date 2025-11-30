"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  OctagonAlertIcon,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { signinSchema } from "@/modules/auth/schemas";
import { signInWithPassword } from "../../service";

export default function SignInForm() {
  const router = useRouter();

  // ✅ Criterios de aceptación:
  // - Maneja el estado de carga isPending.
  // - Almacena y muestra mensajes de error provenientes del backend.
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ✅ Criterios de aceptación:
  // - Inicializa formulario con campos vacíos.
  // - Usa signinSchema para validar los datos ingresados.
  const formSignIn = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  // ✅ Criterios de aceptación:
  // - Envía email y password al servicio signInWithPassword.
  // - Si hay error, actualiza errorMessage con el mensaje devuelto.
  // - Si el inicio de sesión es exitoso, redirige con router.push.
  // - Limpia el estado de carga al finalizar el proceso.
  const onSignInSubmit = async (data: z.infer<typeof signinSchema>) => {
    const { email, password } = data;
    setErrorMessage(null);
    setIsPending(true);
    try {
      const result = await signInWithPassword(email, password);

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }

      router.push("/");
    } catch {
      setErrorMessage("Ha ocurrido un error al iniciar sesión");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...formSignIn}>
      <form
        onSubmit={formSignIn.handleSubmit(onSignInSubmit)}
        className="space-y-6"
      >
        {/* ✅ Criterios de aceptación:
             - Renderiza campo para correo electrónico.
             - Muestra mensaje de error si el email no es válido.
        */}
        <FormField
          control={formSignIn.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">
                Correo electrónico
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="tu@ejemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ Criterios de aceptación:
             - Renderiza campo de contraseña.
             - Muestra mensaje de error si la contraseña no es válida.
        */}
        <FormField
          control={formSignIn.control}
          name="password"
          render={({ field }) => {
            const [showPassword, setShowPassword] = useState(false);
            return (
              <FormItem>
                <FormLabel className="text-gray-500">Contraseña</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* ✅ Criterios de aceptación:
             - Provee enlace para recuperar contraseña.
             - El enlace usa estilo subrayado y hover.
        */}
        <div className="text-xs mt-[-20px]">
          <Link
            href="/forgot-password"
            className="font-medium text-muted-foreground hover:text-primary underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* ✅ Criterios de aceptación:
             - Si existe errorMessage, se muestra alerta visual.
             - Ícono de advertencia + texto en rojo.
        */}
        {!!errorMessage && (
          <Alert className="bg-destructive/10 border-none">
            <OctagonAlertIcon className="size-4 !text-destructive" />
            <AlertDescription className="text-destructive text-sm font-medium">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* ✅ Criterios de aceptación:
             - El botón se deshabilita mientras isPending es true.
             - Muestra un spinner durante el proceso.
             - En estado normal muestra el texto "Iniciar sesión".
        */}
        <Button
          className="w-full mt-2 h-10 border-2 border-primary-foreground"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">Iniciar sesión</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
