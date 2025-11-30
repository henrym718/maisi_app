"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  OctagonAlertIcon,
  ArrowRight,
  EyeOffIcon,
  EyeIcon,
  Loader2Icon,
} from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { signupSchema } from "../../schemas";
import { signupWithPassword } from "../../actions";
import { Role } from "@/lib/constants";

interface Props {
  role: Role;
  setStep: Dispatch<SetStateAction<"REGISTER" | "VERIFY">>;
}

/**
 * SignUpForm
 * Criterios de aceptación:
 * - Renderiza un formulario de registro con nombre, email y contraseña.
 * - Valida los campos usando Zod + react-hook-form.
 * - Al enviar:
 *    - Muestra estado "pending" mientras se procesa.
 *    - Si hay error, muestra alerta con mensaje claro.
 *    - Si éxito, avanza al paso "VERIFY".
 */

export default function SignUpForm({ role, setStep }: Props) {
  // ✅ Criterios de aceptación:
  // - Se inicializan estados para pending y error.
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ✅ Criterios de aceptación:
  // - El formulario se inicializa con valores vacíos.
  // - Usa signupSchema para validar datos antes de enviar.
  const formSignUp = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // ✅ Criterios de aceptación:
  // - Al enviar, se llama signupWithPassword con datos correctos.
  // - Si error → setErrorMessage con mensaje mapeado.
  // - Si éxito → setStep("VERIFY").
  // - Siempre se limpia estado pending al finalizar.
  const onSignUpSubmit = async (data: z.infer<typeof signupSchema>) => {
    const { email, password, name } = data;
    setIsPending(true);
    setErrorMessage(null);
    try {
      const result = await signupWithPassword({
        full_name: name,
        email,
        password,
        role,
      });

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }
      setStep("VERIFY");
    } catch (error) {
      setErrorMessage("Ha ocurrido un error al registrar");
    } finally {
      setIsPending(false);
    }
  };

  // ✅ Criterios de aceptación:
  // - Renderiza un formulario con campos para nombre, email y contraseña.
  // - Muestra mensajes de error claros si la validación falla.
  // - Al enviar, llama a onSignUpSubmit con datos correctos.
  return (
    <Form {...formSignUp}>
      <form
        onSubmit={formSignUp.handleSubmit(onSignUpSubmit)}
        className="space-y-4"
      >
        {/* ✅ Criterios de aceptación:
            - Campo "Nombre" con label claro y placeholder.
            - Muestra mensaje de error si la validación falla. */}
        <FormField
          control={formSignUp.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Juan Perez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ Criterios de aceptación:
            - Campo "Correo electrónico" con label claro.
            - Placeholder con formato ejemplo.
            - Mensaje de error si email inválido. */}
        <FormField
          control={formSignUp.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">
                Correo electrónico
              </FormLabel>
              <FormControl>
                <Input placeholder="tu@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ Criterios de aceptación:
            - Campo "Contraseña" oculto con type="password" por defecto.
            - Botón para mostrar/ocultar la contraseña.
            - Mensaje de error si no cumple reglas. */}
        <FormField
          control={formSignUp.control}
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
            - Si existe errorMessage, se muestra alerta visual.
            - Ícono de advertencia + texto en rojo. */}
        {!!errorMessage && (
          <Alert className="bg-destructive/10 border-none">
            <OctagonAlertIcon className="size-4 text-destructive!" />
            <AlertDescription className="text-destructive text-sm font-medium">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* ✅ Criterios de aceptación:
            - Botón deshabilitado si isPending.
            - Texto dinámico: "Enviando código..." o "Continuar".
            - Incluye ícono ArrowRight en estado normal. */}
        <Button
          className="w-full mt-2 h-10 border-2 border-black"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Empecemos <ArrowRight className="size-4" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
