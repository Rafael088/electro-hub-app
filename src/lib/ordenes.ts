import type { IOrden, IOrdenCreada, IOrdenItem } from '@/types';

import { prisma } from '@/lib/prisma';

// Envío gratis incluido en el precio, solo Colombia.
export const COSTO_ENVIO = 0;

// Fallo de negocio (stock, variantes): lo puede corregir el cliente,
// por eso lleva su propio status y no entra al catch genérico.
export class ErrorDeOrden extends Error {
  readonly status: number;

  constructor(motivo: string, status = 400) {
    super(motivo);
    this.name = 'ErrorDeOrden';
    this.status = status;
  }
}

async function validarItem(item: IOrdenItem): Promise<IOrdenItem> {
  const variante = await prisma.variante.findUnique({
    where: { id: item.varianteId },
    include: { producto: true },
  });

  if (!variante || variante.productoId !== item.productoId) {
    throw new ErrorDeOrden(`La variante ${item.varianteId} no pertenece al producto ${item.productoId}`);
  }

  if (variante.stock < item.cantidad) {
    throw new ErrorDeOrden(`Quedan ${variante.stock} unidades de ${variante.producto.nombre} (${variante.sku})`);
  }

  // El precio del carrito vive en localStorage y el usuario puede alterarlo:
  // acá manda el que está en la base de datos.
  return { ...item, precio: variante.producto.precio };
}

export function calcularTotalOrden(items: IOrdenItem[]): number {
  const subtotal = items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  return subtotal + COSTO_ENVIO;
}

export async function obtenerOrdenParaPago(ordenId: number): Promise<IOrdenCreada> {
  const orden = await prisma.orden.findUnique({
    where: { id: ordenId },
    include: { items: true },
  });

  if (!orden) {
    throw new ErrorDeOrden(`No existe una orden con id ${ordenId}`, 404);
  }

  if (orden.estado !== 'PENDIENTE') {
    throw new ErrorDeOrden(`La orden ${ordenId} ya está ${orden.estado}`, 409);
  }

  return orden;
}

export async function crearOrden(orden: IOrden): Promise<IOrdenCreada> {
  const items = await Promise.all(orden.items.map(validarItem));
  const total = calcularTotalOrden(items);

  return prisma.orden.create({
    data: {
      nombre: orden.nombre,
      email: orden.email,
      telefono: orden.telefono,
      direccion: orden.direccion,
      ciudad: orden.ciudad,
      departamento: orden.departamento,
      codigoPostal: orden.codigoPostal ?? null,
      costoEnvio: COSTO_ENVIO,
      total,
      items: { create: items },
    },
    include: { items: true },
  });
}
