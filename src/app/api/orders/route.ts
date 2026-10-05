import { z } from 'zod';

import type { IOrdenCreada } from '@/types';
import { crearRespuestaError, crearRespuestaExitosa, leerCuerpoJson } from '@/lib/api';
import { crearOrden, ErrorDeOrden } from '@/lib/ordenes';

const esquemaItemOrden = z.object({
  productoId: z.number().int().positive(),
  varianteId: z.number().int().positive(),
  cantidad: z.number().int().positive(),
  // El navegador manda el precio del carrito; acá solo validamos que sea número,
  // el total se recalcula contra la base en calcularTotalOrden().
  precio: z.number().nonnegative(),
});

const esquemaOrden = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.email(),
  telefono: z.string().trim().min(5).max(20),
  direccion: z.string().trim().min(3).max(160),
  ciudad: z.string().trim().min(2).max(80),
  departamento: z.string().trim().min(2).max(80),
  codigoPostal: z.string().trim().max(10).optional(),
  items: z.array(esquemaItemOrden).min(1),
});

function responderDatosInvalidos(mensaje: string) {
  return crearRespuestaError<IOrdenCreada>('Datos inválidos', mensaje, 400);
}

export async function POST(request: Request) {
  try {
    const cuerpo = await leerCuerpoJson(request);

    if (cuerpo === null) {
      return responderDatosInvalidos('El cuerpo de la petición debe ser un JSON válido');
    }

    const resultado = esquemaOrden.safeParse(cuerpo);

    if (!resultado.success) {
      const primerError = resultado.error.issues[0];
      const detalle = primerError ? `${primerError.path.join('.')}: ${primerError.message}` : 'Revisa el formulario';
      return responderDatosInvalidos(detalle);
    }

    const orden = await crearOrden(resultado.data);

    return crearRespuestaExitosa<IOrdenCreada>(orden, 'Orden creada', 201);
  } catch (error) {
    if (error instanceof ErrorDeOrden) {
      return crearRespuestaError<IOrdenCreada>('Orden inválida', error.message, error.status);
    }

    console.error('Error al crear orden:', error);
    return crearRespuestaError<IOrdenCreada>('Error al crear la orden', 'Intenta de nuevo más tarde', 500);
  }
}
