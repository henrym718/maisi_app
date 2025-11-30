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
import { useState } from "react";
import { OctagonAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { signInWithPassword } from "../../service";
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
    const { email, password } = data;
    try {
      setErrorMessage(null);
      setLoading(true);
      const result = await signInWithPassword(email, password);

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }
      router.push("/");
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Contraseña</FormLabel>
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

        <div className="text-xs mt-[-20px]">
          <Link
            href="/forgot-password"
            className="font-medium text-muted-foreground hover:text-primary underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {!!errorMessage && (
          <Alert className="bg-destructive/10 border-none">
            <OctagonAlertIcon className="size-4 !text-destructive" />
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}

        <Button
          className="w-full mt-2 h-10 border-2 border-primary-foreground"
          type="submit"
        >
          {loading ? "Cargando..." : "Continuar"}
        </Button>
      </form>
    </Form>
  );
}
