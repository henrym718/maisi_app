"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, OctagonAlertIcon, RefreshCw } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { resendOtp, verifyOtp } from "../../service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const verifySchema = z.object({
  code: z.string().min(8, "El código debe tener 6 dígitos").max(8),
});

interface Props {
  email: string;
  role: "client" | "talent";
  setStep: Dispatch<SetStateAction<"REGISTER" | "VERIFY">>;
}

export default function VerifyOtpForm({ email, role, setStep }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formVerify = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const onVerifySubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await verifyOtp(email, data.code);
      router.push(`/${role}/dashboard`);
    } catch (error) {
      setErrorMessage("El código es incorrecto o ha expirado.");
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    try {
      setResendLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      await resendOtp(email);
      setSuccessMessage("Código reenviado con éxito. Revisa tu bandeja.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo reenviar el código. Espera unos segundos."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold">Verifica tu correo</h3>
        <p className="text-sm text-gray-500">
          Hemos enviado un código de 6 dígitos a{" "}
          <span className="font-bold text-gray-800">{email}</span>
        </p>
      </div>

      <Form {...formVerify}>
        <form
          onSubmit={formVerify.handleSubmit(onVerifySubmit)}
          className="space-y-4"
        >
          <FormField
            control={formVerify.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de verificación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="12345678"
                    className="text-center text-lg tracking-widest"
                    maxLength={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mensajes de error y éxito */}
          {!!errorMessage && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="size-4 !text-destructive" />
              <AlertTitle className="text-destructive text-sm">
                {errorMessage}
              </AlertTitle>
            </Alert>
          )}

          {!!successMessage && (
            <Alert className="bg-green-50 border-none">
              <CheckCircle2 className="size-4 text-green-600" />
              <AlertTitle className="text-green-800 text-sm">
                {successMessage}
              </AlertTitle>
            </Alert>
          )}

          <Button className="w-full h-10" type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Confirmar cuenta"}
          </Button>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="ghost"
              className="text-xs text-gray-500 h-auto p-0 hover:bg-transparent hover:text-gray-900"
              type="button"
              onClick={() => setStep("REGISTER")}
            >
              ← Corregir email
            </Button>

            <Button
              variant="ghost"
              className="text-xs text-blue-600 h-auto p-0 hover:bg-transparent hover:underline flex items-center gap-1"
              type="button"
              onClick={onResendCode}
              disabled={resendLoading}
            >
              {resendLoading ? (
                <RefreshCw className="size-3 animate-spin" />
              ) : (
                "Reenviar código"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
