/** @jsxImportSource react */
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface LuminaTeacherWelcomeProps {
  teacherName: string;
  email: string;
  temporaryPassword: string;
  loginUrl?: string;
}

export const LuminaTeacherWelcomeEmail = ({
  teacherName = 'Profesor/a',
  email = 'profesor@ejemplo.com',
  temporaryPassword = 'Lum#2026!xK9',
  loginUrl = 'https://lumina.edu/login',
}: LuminaTeacherWelcomeProps) => {
  return (
    <Html>
      <Head />
      <Preview>Bienvenido/a a Lúmina — Tus credenciales de acceso como profesor</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Banner de Lúmina */}
          <Section style={headerSection}>
            <Text style={brandText}>LÚMINA</Text>
            <Text style={subbrandText}>PLATAFORMA EDUCATIVA</Text>
          </Section>

          {/* Contenido Principal */}
          <Section style={contentSection}>
            <Text style={greetingText}>¡Bienvenido/a al equipo docente, {teacherName}! 👋</Text>

            <Text style={paragraph}>
              Nos complace darle la bienvenida a <strong>Lúmina</strong>. Se ha creado exitosamente su cuenta de profesor para que pueda comenzar a gestionar sus cursos, calificaciones y comunicarse con sus estudiantes.
            </Text>

            <Text style={paragraph}>A continuación, encontrará sus datos de acceso institucional:</Text>

            {/* Caja de Credenciales */}
            <Section style={credentialsBox}>
              <Text style={credItem}>
                <strong style={credLabel}>Usuario / Correo:</strong>{' '}
                <span style={credValue}>{email}</span>
              </Text>
              <Text style={{ ...credItem, marginTop: '8px' }}>
                <strong style={credLabel}>Contraseña temporal:</strong>{' '}
                <span style={credValue}>{temporaryPassword}</span>
              </Text>
            </Section>

            {/* Alerta de Seguridad */}
            <Section style={warningBox}>
              <Text style={warningText}>
                🔒 <strong>Importante:</strong> Por motivos de seguridad, esta contraseña es temporal y la plataforma le solicitará cambiarla inmediatamente tras su primer inicio de sesión.
              </Text>
            </Section>

            {/* Botón Call to Action */}
            <Section style={buttonContainer}>
              <Button style={primaryButton} href={loginUrl}>
                Iniciar Sesión en Lúmina
              </Button>
            </Section>

            <Hr style={divider} />

            <Text style={footerHelpText}>
              Si presenta alguna dificultad para ingresar a su cuenta o requiere soporte técnico, por favor responda directamente a este correo.
            </Text>
          </Section>

          {/* Pie de Página */}
          <Section style={footerSection}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Plataforma Educativa Lúmina. Todos los derechos reservados.
            </Text>
            <Text style={footerSubtext}>
              Este es un correo automático enviado tras el alta de una cuenta docente.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// --- ESTILOS EN LÍNEA PARA CLIENTES DE CORREO ---

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  borderRadius: '12px',
  overflow: 'hidden',
  maxWidth: '600px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
};

const headerSection = {
  background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
  backgroundColor: '#4f46e5', // Fallback
  padding: '36px 40px',
  textAlign: 'center' as const,
};

const brandText = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '800',
  letterSpacing: '1px',
  margin: '0',
};

const subbrandText = {
  color: '#c7d2fe',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '2px',
  margin: '4px 0 0 0',
};

const contentSection = {
  padding: '36px 40px',
};

const greetingText = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#0f172a',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#475569',
  margin: '0 0 16px 0',
};

const credentialsBox = {
  backgroundColor: '#f1f5f9',
  border: '1px solid #cbd5e1',
  borderLeft: '4px solid #4f46e5',
  borderRadius: '8px',
  padding: '18px 20px',
  margin: '24px 0',
};

const credItem = {
  fontSize: '14px',
  color: '#334155',
  margin: '4px 0',
};

const credLabel = {
  color: '#1e293b',
};

const credValue = {
  fontFamily: 'monospace',
  backgroundColor: '#e2e8f0',
  padding: '2px 6px',
  borderRadius: '4px',
  color: '#4f46e5',
  fontWeight: 'bold',
};

const warningBox = {
  backgroundColor: '#fffbeb',
  border: '1px solid #fef3c7',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '6px',
  padding: '12px 16px',
  margin: '0 0 24px 0',
};

const warningText = {
  fontSize: '13px',
  color: '#92400e',
  margin: '0',
  lineHeight: '1.5',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const primaryButton = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold',
  padding: '14px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};

const divider = {
  borderColor: '#e2e8f0',
  margin: '32px 0 20px 0',
};

const footerHelpText = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.5',
  margin: '0',
};

const footerSection = {
  backgroundColor: '#f8fafc',
  padding: '24px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e2e8f0',
};

const footerText = {
  fontSize: '12px',
  color: '#94a3b8',
  margin: '0 0 4px 0',
};

const footerSubtext = {
  fontSize: '11px',
  color: '#cbd5e1',
  margin: '0',
};