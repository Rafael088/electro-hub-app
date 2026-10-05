import type { IOrdenCreada } from '@/types';
import { crearRespuestaError, crearRespuestaExitosa, leerCuerpoJson } from '@/lib/api';
import { crearOrden, ErrorDeOrden } from '@/lib/ordenes';
import { describirErrorDeValidacion, esquemaOrden } from '@/lib/validaciones';

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
      return responderDatosInvalidos(describirErrorDeValidacion(resultado.error));
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
