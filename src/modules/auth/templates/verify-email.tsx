import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Section,
} from "@react-email/components";

// Define las propiedades que recibirá el componente
interface OTP_TemplateProps {
  otp: string; // El código OTP a mostrar
}

// Estilos básicos para el correo
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const otpContainer = {
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center" as const,
  margin: "30px 0",
  border: "1px solid #e0e0e0",
};

const otpText = {
  fontSize: "32px",
  fontWeight: "bold" as const,
  letterSpacing: "5px",
  color: "#1a73e8", // Un color destacado para el OTP
  margin: "0",
  display: "inline-block",
  backgroundColor: "#e6f0ff",
  padding: "10px 20px",
  borderRadius: "4px",
};

export function OTP_Template({ otp }: OTP_TemplateProps): React.JSX.Element {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>Verificación de Seguridad</Heading>

            <Text style={paragraph}>
              Has solicitado un código de verificación de un solo uso (OTP). Por
              favor, utiliza el siguiente código para completar tu acción:
            </Text>

            <Section style={otpContainer}>
              <Text style={paragraph}>Tu Código de Verificación es:</Text>
              <Text style={otpText}>{otp}</Text>
            </Section>

            <Text style={paragraph}>
              Este código es **válido por un tiempo limitado** (ej. 10 minutos).
              Si no lo usas dentro de este tiempo, deberás solicitar uno nuevo.
            </Text>

            <Text style={paragraph}>
              **Importante:** Si no solicitaste este código, puedes ignorar este
              correo electrónico. Tu contraseña no se verá afectada. No
              compartas este código con nadie.
            </Text>

            <Text style={paragraph}>
              Saludos cordiales,
              <br />
              El equipo de [Tu Empresa/Aplicación]
            </Text>
          </Section>
        </Container>
        <Section style={{ textAlign: "center", padding: "0 48px" }}>
          <Text style={{ ...paragraph, fontSize: "12px", color: "#999" }}>
            Si tienes problemas, por favor contacta a nuestro soporte.
          </Text>
        </Section>
      </Body>
    </Html>
  );
}
