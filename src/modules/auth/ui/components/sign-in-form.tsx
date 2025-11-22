"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signinSchema } from "@/modules/auth/schemas";
import Link from "next/link";
import { signInCredentials } from "../../services";
import { useState } from "react";
import { OctagonAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      await signInCredentials(data.email, data.password);
      router.push("/");
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!!errorMessage && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="size-4 !text-destructive" />
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          )}

          {/* Boton de olvidaste tu contraseña */}
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Boton de iniciar sesión */}
          <Button className="w-full" type="submit">
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>

      {/* Enlace para ir al registro */}
      <div className="text-center text-sm">
        <span className="text-gray-500">¿Aún no tienes una cuenta? </span>
        <Link
          href="/sign-up"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
}
