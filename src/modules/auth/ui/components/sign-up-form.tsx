"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { OctagonAlertIcon, ArrowRight } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { signupSchema } from "../../schemas";
import { signupWithPassword } from "../../actions/signup-with-password";

interface Props {
  role: "client" | "talent";
  setStep: Dispatch<SetStateAction<"REGISTER" | "VERIFY">>;
}

export default function SignupForm({ role, setStep }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formRegister = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSignupSubmit = async (data: z.infer<typeof signupSchema>) => {
    const { email, password, name } = data;
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await signupWithPassword(name, email, password, role);

      if (response.success) {
        setStep("VERIFY");
      }

      if (!response.success) {
        setErrorMessage(response.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...formRegister}>
      <form
        onSubmit={formRegister.handleSubmit(onSignupSubmit)}
        className="space-y-4"
      >
        <FormField
          control={formRegister.control}
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
        <FormField
          control={formRegister.control}
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
        <FormField
          control={formRegister.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!errorMessage && (
          <Alert className="bg-destructive/10 border-none">
            <OctagonAlertIcon className="size-4 !text-destructive" />
            <AlertTitle className="text-destructive text-sm">
              {errorMessage}
            </AlertTitle>
          </Alert>
        )}

        <Button
          className="w-full mt-2 h-10 border-2 border-black"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            "Enviando código..."
          ) : (
            <span className="flex items-center gap-2">
              Continuar <ArrowRight className="size-4" />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
