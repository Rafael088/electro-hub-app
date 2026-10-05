import { InvalidWebhookSignatureError, Payment, WebhookSignatureValidator } from 'mercadopago';

import type { Prisma } from '@prisma/client';

import type { EstadoOrden, IOrdenCreada, IOrdenItemCreado } from '@/types';

import { prisma } from '@/lib/prisma';
import { crearConfiguracionPago } from '@/lib/mercado-pago';
import { ErrorDeOrden } from '@/lib/ordenes';
import { enviarConfirmacionDeOrden } from '@/lib/email';

export interface INotificacionWebhook {
  xSignature: string | null;
  xRequestId: string | null;
  dataId: string | null;
}

// Campos del pago que usa la lógica de la orden.
interface IDatosPago {
  id?: number;
  status?: string;
}

// La orden con los campos internos de Mercado Pago: solo los usa el servidor,
// por eso no forman parte del contrato IOrdenCreada que ve el frontend.
type OrdenNotificada = IOrdenCreada & {
  mpPaymentId: string | null;
  mpStatus: string | null;
};

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

function obtenerOrdenIdDePago(externalReference: string | undefined): number {
  if (!externalReference) {
    throw new ErrorDeOrden('La notificación no trae external_reference', 400);
  }

  const ordenId = Number(externalReference);
  if (!Number.isInteger(ordenId)) {
    throw new ErrorDeOrden(`external_reference inválido: ${externalReference}`, 400);
  }

  return ordenId;
}

async function obtenerOrdenNotificada(ordenId: number): Promise<OrdenNotificada> {
  const orden = await prisma.orden.findUnique({
    where: { id: ordenId },
    include: { items: true },
  });

  if (!orden) {
    throw new ErrorDeOrden(`No existe una orden con id ${ordenId}`, 404);
  }

  return orden;
}

async function alcanzaElStock(tx: Prisma.TransactionClient, items: IOrdenItemCreado[]): Promise<boolean> {
  for (const item of items) {
    const variante = await tx.variante.findUnique({
      where: { id: item.varianteId },
      select: { stock: true },
    });

    if (!variante || variante.stock < item.cantidad) {
      return false;
    }
  }

  return true;
}

async function descontarStock(tx: Prisma.TransactionClient, items: IOrdenItemCreado[]): Promise<void> {
  for (const item of items) {
    await tx.variante.update({
      where: { id: item.varianteId },
      data: { stock: { decrement: item.cantidad } },
    });
  }
}

async function guardarResultadoPago(
  orden: OrdenNotificada,
  estado: EstadoOrden | null,
  pago: IDatosPago
): Promise<EstadoOrden> {
  // Mercado Pago reintenta los webhooks: el stock solo baja en el pase de
  // no-PAGADA a PAGADA, y en la misma transacción que el cambio de estado.
  const seAcabaDePagar = estado === 'PAGADA' && orden.estado !== 'PAGADA';
  let estadoFinal: EstadoOrden = estado ?? orden.estado;

  await prisma.$transaction(async (tx) => {
    if (seAcabaDePagar) {
      if (await alcanzaElStock(tx, orden.items)) {
        await descontarStock(tx, orden.items);
      } else {
        // MP ya cobró, pero no quedan unidades: la orden no se puede cumplir.
        console.error(`Pago aprobado sin stock suficiente para la orden ${orden.id}`);
        estadoFinal = 'CANCELADA';
      }
    }

    await tx.orden.update({
      where: { id: orden.id },
      data: {
        estado: estadoFinal,
        mpPaymentId: pago.id ? String(pago.id) : orden.mpPaymentId,
        mpStatus: pago.status ?? orden.mpStatus,
      },
    });
  });

  return estadoFinal;
}

// Un fallo de Resend no debe tumbar el webhook: la orden ya quedó pagada y el
// reintento de Mercado Pago no reenviaría nada, solo repetiría la notificación.
async function notificarPagoExitoso(orden: OrdenNotificada): Promise<void> {
  try {
    await enviarConfirmacionDeOrden(orden);
  } catch (error) {
    console.error(`No se pudo enviar la confirmación de la orden ${orden.id}:`, error);
  }
}

export async function procesarPagoNotificado(paymentId: string): Promise<void> {
  const pago = await new Payment(crearConfiguracionPago()).get({ id: paymentId });
  const orden = await obtenerOrdenNotificada(obtenerOrdenIdDePago(pago.external_reference));
  const estadoFinal = await guardarResultadoPago(orden, mapearEstadoPago(pago.status), pago);

  if (estadoFinal === 'PAGADA' && orden.estado !== 'PAGADA') {
    await notificarPagoExitoso(orden);
  }
}
