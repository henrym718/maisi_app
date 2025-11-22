import { z } from "zod";

export const signinSchema = z.object({
  email: z.email({
    message: "Por favor, ingresa un correo electrónico válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});
