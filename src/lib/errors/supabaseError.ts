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

  return normalized;
}
