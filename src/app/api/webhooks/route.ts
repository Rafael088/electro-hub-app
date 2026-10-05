import type { NextRequest } from 'next/server';

import { crearRespuestaError, crearRespuestaExitosa, leerCuerpoJson } from '@/lib/api';
import { ErrorDeOrden } from '@/lib/ordenes';
import { procesarPagoNotificado, verificarFirmaWebhook } from '@/lib/webhooks';
import { esquemaNotificacion, type NotificacionParseada } from '@/lib/validaciones';

// Si la notificación no trae ni type ni data.id, respondemos 200 e ignoramos
// para que Mercado Pago no reintente con algo que no podemos procesar.
function extraerNotificacion(request: NextRequest, cuerpo: unknown): NotificacionParseada & { dataId: string | null } {
  const parseado = esquemaNotificacion.safeParse(cuerpo);
  const notificacion: NotificacionParseada = parseado.success ? parseado.data : {};
  const params = request.nextUrl.searchParams;

  const dataId = params.get('data.id') ?? (notificacion.data ? String(notificacion.data.id) : null);

  return {
    type: params.get('type') ?? notificacion.type,
    data: notificacion.data,
    dataId,
  };
}

export async function POST(request: NextRequest) {
  try {
    const notificacion = extraerNotificacion(request, await leerCuerpoJson(request));

    if (notificacion.type !== 'payment' || !notificacion.dataId) {
      return crearRespuestaExitosa<null>(null, 'Notificación ignorada');
    }

    verificarFirmaWebhook({
      xSignature: request.headers.get('x-signature'),
      xRequestId: request.headers.get('x-request-id'),
      dataId: notificacion.dataId,
    });

    await procesarPagoNotificado(notificacion.dataId);

    return crearRespuestaExitosa<null>(null, 'Notificación procesada');
  } catch (error) {
    if (error instanceof ErrorDeOrden) {
      return crearRespuestaError<null>('Notificación rechazada', error.message, error.status);
    }

    console.error('Error al procesar el webhook de Mercado Pago:', error);
    return crearRespuestaError<null>('Error al procesar la notificación', 'Intenta de nuevo más tarde', 500);
  }
}
