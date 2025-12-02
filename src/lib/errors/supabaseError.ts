export function supabaseError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("already been registered")) {
    return "Este correo ya está registrado.";
  }

  if (normalized.includes("invalid email")) {
    return "El correo no es válido.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "El correo o la contraseña son incorrectos.";
  }

  if (normalized.includes("email rate limit exceeded")) {
    return "Has excedido el límite de envíos. Espera unos minutos.";
  }

  if (normalized.includes("token has expired or is invalid")) {
    return "Código inválido o expirado.";
  }

  if (normalized.includes("error confirming user")) {
    return "No pudimos confirmar tu cuenta.";
  }

  if (normalized.includes("request rate limit reached")) {
    return "Has excedido el límite de envíos. Espera unos minutos.";
  }

  if (
    normalized.includes(
      "for security purposes, you can only request this after"
    )
  ) {
    return "Intenta de nuevo en unos minutos.";
  }

  return normalized;
}
