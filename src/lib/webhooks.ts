import { InvalidWebhookSignatureError, Payment, WebhookSignatureValidator } from 'mercadopago';

import type { EstadoOrden } from '@/types';

import { prisma } from '@/lib/prisma';
import { crearConfiguracionPago } from '@/lib/mercado-pago';
import { ErrorDeOrden } from '@/lib/ordenes';

export interface INotificacionWebhook {
  xSignature: string | null;
  xRequestId: string | null;
  dataId: string | null;
}

// Estados de pago que dejan la orden cancelada (o devuelta).
const ESTADOS_DE_RECHAZO = ['rejected', 'cancelled', 'refunded', 'charged_back'];

// La firma prueba que la notificación vino de Mercado Pago. Aunque no haya
// secreto configurado procesamos igual: el estado nunca sale del body de la
// notificación, se consulta a la API de MP con el access token.
export function verificarFirmaWebhook(notificacion: INotificacionWebhook): void {
  const secreto = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secreto) return;

  try {
    WebhookSignatureValidator.validate({
      xSignature: notificacion.xSignature,
      xRequestId: notificacion.xRequestId,
      dataId: notificacion.dataId,
      secret: secreto,
      toleranceSeconds: 300,
    });
  } catch (error) {
    if (error instanceof InvalidWebhookSignatureError) {
      throw new ErrorDeOrden(`Firma inválida: ${error.reason}`, 401);
    }
    throw error;
  }
}

// null = la orden no cambia (pagos pendientes o estados que no manejamos).
function mapearEstadoPago(estadoPago: string | null | undefined): EstadoOrden | null {
  if (estadoPago === 'approved') return 'PAGADA';
  if (estadoPago && ESTADOS_DE_RECHAZO.includes(estadoPago)) return 'CANCELADA';
  return null;
}

export async function procesarPagoNotificado(paymentId: string): Promise<void> {
  const pago = await new Payment(crearConfiguracionPago()).get({ id: paymentId });

  if (!pago.external_reference) {
    throw new ErrorDeOrden('La notificación no trae external_reference', 400);
  }

  const ordenId = Number(pago.external_reference);
  if (!Number.isInteger(ordenId)) {
    throw new ErrorDeOrden(`external_reference inválido: ${pago.external_reference}`, 400);
  }

  const orden = await prisma.orden.findUnique({ where: { id: ordenId } });
  if (!orden) {
    throw new ErrorDeOrden(`No existe una orden con id ${ordenId}`, 404);
  }

  const estado = mapearEstadoPago(pago.status);
  // Semana 3: acá se descuenta el stock y se dispara el email con Resend.
  await prisma.orden.update({
    where: { id: ordenId },
    data: {
      estado: estado ?? orden.estado,
      mpPaymentId: pago.id ? String(pago.id) : orden.mpPaymentId,
      mpStatus: pago.status ?? orden.mpStatus,
    },
  });
}
