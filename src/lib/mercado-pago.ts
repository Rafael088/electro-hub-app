import MercadoPagoConfig, { Preference } from 'mercadopago';

import type { IOrdenCreada, IPreferenciaPago } from '@/types';
import { prisma } from '@/lib/prisma';
import { ErrorDeOrden } from '@/lib/ordenes';

type CuerpoPreferencia = Parameters<Preference['create']>[0]['body'];
type ItemPreferencia = CuerpoPreferencia['items'][number];

const MONEDA = 'COP';
const RUTA_CONFIRMACION = '/confirmacion';
const RUTA_WEBHOOKS = '/api/webhooks';

function crearClientePago(): Preference {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new ErrorDeOrden('Mercado Pago no está configurado en el servidor', 503);
  }

  return new Preference(new MercadoPagoConfig({ accessToken }));
}

function crearUrlAbsoluta(ruta: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  return `${baseUrl.replace(/\/$/, '')}${ruta}`;
}

// Checkout Pro no conoce nuestros productos: le mandamos nombre, imagen y
// precio de la base para que el comprador vea qué está pagando.
async function construirItems(orden: IOrdenCreada): Promise<ItemPreferencia[]> {
  const productos = await prisma.producto.findMany({
    where: { id: { in: [...new Set(orden.items.map((item) => item.productoId))] } },
  });
  const productosPorId = new Map(productos.map((producto) => [producto.id, producto]));

  return orden.items.map((item) => {
    const producto = productosPorId.get(item.productoId);

    return {
      id: String(item.varianteId),
      title: producto?.nombre ?? `Producto ${item.productoId}`,
      description: producto?.descripcion,
      picture_url: producto?.imagenes[0],
      quantity: item.cantidad,
      currency_id: MONEDA,
      unit_price: item.precio,
    };
  });
}

async function guardarPreferenciaEnOrden(ordenId: number, preferenceId: string): Promise<void> {
  await prisma.orden.update({
    where: { id: ordenId },
    data: { mpPreferenceId: preferenceId },
  });
}

export async function crearPreferenciaPago(orden: IOrdenCreada): Promise<IPreferenciaPago> {
  const cliente = crearClientePago();
  const items = await construirItems(orden);

  const preferencia = await cliente.create({
    body: {
      items,
      external_reference: String(orden.id),
      notification_url: crearUrlAbsoluta(RUTA_WEBHOOKS),
      back_urls: {
        success: crearUrlAbsoluta(RUTA_CONFIRMACION),
        pending: crearUrlAbsoluta(RUTA_CONFIRMACION),
        failure: crearUrlAbsoluta(RUTA_CONFIRMACION),
      },
      auto_return: 'approved',
      statement_descriptor: 'ELECTRO HUB',
    },
  });

  if (!preferencia.id || !preferencia.init_point) {
    throw new ErrorDeOrden('Mercado Pago no devolvió una preferencia válida', 502);
  }

  await guardarPreferenciaEnOrden(orden.id, preferencia.id);

  return { preferenceId: preferencia.id, initPoint: preferencia.init_point };
}
