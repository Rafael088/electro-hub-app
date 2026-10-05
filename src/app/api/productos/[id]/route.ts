import { NextResponse } from 'next/server';
import { z } from 'zod';

import type { IApiResponse, IProducto } from '@/types';
import { prisma } from '@/lib/prisma';

// El id viaja como string en la URL: solo aceptamos enteros positivos.
const esquemaIdProducto = z.string().regex(/^\d+$/);

function obtenerIdProductoValido(idParametro: string): number | null {
  const resultado = esquemaIdProducto.safeParse(idParametro);
  return resultado.success ? Number(resultado.data) : null;
}

function crearRespuestaError(error: string, message: string, status: number) {
  return NextResponse.json<IApiResponse<IProducto>>(
    { data: null, error, message },
    { status }
  );
}

export async function GET(
  _request: Request,
  context: RouteContext<'/api/productos/[id]'>
) {
  try {
    const { id: idParametro } = await context.params;
    const id = obtenerIdProductoValido(idParametro);

    if (id === null) {
      return crearRespuestaError('Id inválido', 'El id debe ser un número entero', 400);
    }

    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        variantes: true,
      },
    });

    if (!producto) {
      return crearRespuestaError('Producto no encontrado', `No existe un producto con id ${id}`, 404);
    }

    return NextResponse.json<IApiResponse<IProducto>>({
      data: producto,
      error: null,
      message: 'Producto obtenido',
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return crearRespuestaError('Error al obtener el producto', 'Intenta de nuevo más tarde', 500);
  }
}
