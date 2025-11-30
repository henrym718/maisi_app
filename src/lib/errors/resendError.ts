export function resendError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("testing email")) {
    return "No puedes enviar correos de prueba a este correo.";
  }

  return normalized;
}
