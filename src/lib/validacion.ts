import { z } from 'zod';

// Reglas del formulario de envío. Los errores se devuelven por campo para
// poder pintarlos debajo de cada input.
export const esquemaEnvio = z.object({
  nombre: z.string().trim().min(3, 'Escribe tu nombre completo'),
  email: z.email('Escribe un correo válido'),
  telefono: z.string().trim().regex(/^\d{7,10}$/, 'Teléfono colombiano de 7 a 10 dígitos'),
  direccion: z.string().trim().min(5, 'Incluye calle y número'),
  ciudad: z.string().trim().min(2, 'Escribe la ciudad'),
  departamento: z.string().trim().min(2, 'Escribe el departamento'),
  codigoPostal: z.string().trim().optional(),
});

export type DatosEnvio = z.infer<typeof esquemaEnvio>;

export const DATOS_VACIOS: DatosEnvio = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  departamento: '',
  codigoPostal: '',
};

export function erroresDeEnvio(datos: DatosEnvio): Record<string, string> {
  const resultado = esquemaEnvio.safeParse(datos);
  if (resultado.success) return {};

  return Object.fromEntries(
    resultado.error.issues.map((asunto) => [String(asunto.path[0]), asunto.message])
  );
}

export function esEnvioValido(datos: DatosEnvio): boolean {
  return esquemaEnvio.safeParse(datos).success;
}
