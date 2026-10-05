import { z } from 'zod';

// Todas las entradas de /api viven acá: una sola regla por input, y si hay que
// cambiarla la cambian los 5 endpoints juntos.

export const esquemaIdProducto = z.string().regex(/^\d+$/, 'El id debe ser un número entero');

const esquemaItemOrden = z.object({
  productoId: z.number().int().positive(),
  varianteId: z.number().int().positive(),
  cantidad: z.number().int().positive(),
  // El navegador manda el precio del carrito; acá solo validamos que sea número,
  // el total se recalcula contra la base en calcularTotalOrden().
  precio: z.number().nonnegative(),
});

export const esquemaOrden = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.email(),
  telefono: z.string().trim().min(5).max(20),
  direccion: z.string().trim().min(3).max(160),
  ciudad: z.string().trim().min(2).max(80),
  departamento: z.string().trim().min(2).max(80),
  codigoPostal: z.string().trim().max(10).optional(),
  items: z.array(esquemaItemOrden).min(1),
});

export const esquemaSolicitudPago = z.object({
  ordenId: z.number().int().positive(),
});

// Mercado Pago manda el id de la notificación en la query o en el body.
export const esquemaNotificacion = z.object({
  type: z.string().optional(),
  data: z.object({ id: z.union([z.string(), z.number()]) }).optional(),
});

export type NotificacionParseada = z.infer<typeof esquemaNotificacion>;

// Mensaje legible del primer error: es lo que ve el usuario en el formulario.
export function describirErrorDeValidacion(error: z.ZodError): string {
  const primerError = error.issues[0];

  if (!primerError) return 'Revisa los campos del formulario';
  if (primerError.path.length === 0) return primerError.message;

  return `${primerError.path.join('.')}: ${primerError.message}`;
}
