import type { IPreferenciaPago } from '@/types';
import { crearRespuestaError, crearRespuestaExitosa, leerCuerpoJson } from '@/lib/api';
import { crearPreferenciaPago } from '@/lib/mercado-pago';
import { ErrorDeOrden, obtenerOrdenParaPago } from '@/lib/ordenes';
import { describirErrorDeValidacion, esquemaSolicitudPago } from '@/lib/validaciones';

function responderDatosInvalidos(mensaje: string) {
  return crearRespuestaError<IPreferenciaPago>('Datos inválidos', mensaje, 400);
}

export async function POST(request: Request) {
  try {
    const cuerpo = await leerCuerpoJson(request);

    if (cuerpo === null) {
      return responderDatosInvalidos('El cuerpo de la petición debe ser un JSON válido');
    }

    const resultado = esquemaSolicitudPago.safeParse(cuerpo);

    if (!resultado.success) {
      return responderDatosInvalidos(describirErrorDeValidacion(resultado.error));
    }

    const orden = await obtenerOrdenParaPago(resultado.data.ordenId);
    const pago = await crearPreferenciaPago(orden);

    return crearRespuestaExitosa<IPreferenciaPago>(pago, 'Preferencia de pago creada', 201);
  } catch (error) {
    if (error instanceof ErrorDeOrden) {
      return crearRespuestaError<IPreferenciaPago>('Pago no disponible', error.message, error.status);
    }

    console.error('Error al crear preferencia de pago:', error);
    return crearRespuestaError<IPreferenciaPago>(
      'Error al crear la preferencia de pago',
      'Intenta de nuevo más tarde',
      500
    );
  }
}
