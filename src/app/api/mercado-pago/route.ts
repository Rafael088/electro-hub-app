import { z } from 'zod';

import type { IPreferenciaPago } from '@/types';
import { crearRespuestaError, crearRespuestaExitosa, leerCuerpoJson } from '@/lib/api';
import { crearPreferenciaPago } from '@/lib/mercado-pago';
import { ErrorDeOrden, obtenerOrdenParaPago } from '@/lib/ordenes';

const esquemaSolicitudPago = z.object({
  ordenId: z.number().int().positive(),
});

export async function POST(request: Request) {
  try {
    const cuerpo = await leerCuerpoJson(request);

    if (cuerpo === null) {
      return crearRespuestaError<IPreferenciaPago>('Datos inválidos', 'El cuerpo de la petición debe ser un JSON válido', 400);
    }

    const resultado = esquemaSolicitudPago.safeParse(cuerpo);

    if (!resultado.success) {
      return crearRespuestaError<IPreferenciaPago>('Datos inválidos', 'Se espera { ordenId } con un id válido', 400);
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
