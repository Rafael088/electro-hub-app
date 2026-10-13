'use client';

import { useState } from 'react';

import type { IApiResponse, ICarritoItem } from '@/types';
import type { DatosEnvio } from '@/lib/validacion';

export interface EstadoPago {
  enviando: boolean;
  error: string | null;
  mensaje: string | null;
}

interface Respuesta<T> {
  status: number;
  datos: T | null;
  mensaje: string;
}

function crearOrden(items: ICarritoItem[], datos: DatosEnvio) {
  return {
    ...datos,
    items: items.map(({ productoId, varianteId, cantidad, precio }) => ({
      productoId,
      varianteId,
      cantidad,
      precio,
    })),
  };
}

async function pedir<T>(ruta: string, cuerpo: unknown): Promise<Respuesta<T>> {
  const respuesta = await fetch(ruta, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });

  // Si la ruta aún no existe, Next responde 404 en HTML y json() lanza
  let json: IApiResponse<T> | null = null;
  try {
    json = (await respuesta.json()) as IApiResponse<T>;
  } catch {
    json = null;
  }

  return { status: respuesta.status, datos: json?.data ?? null, mensaje: json?.message ?? '' };
}

export function usePago(): EstadoPago & { pagar: (items: ICarritoItem[], datos: DatosEnvio) => Promise<void> } {
  const [estado, setEstado] = useState<EstadoPago>({
    enviando: false,
    error: null,
    mensaje: null,
  });

  const fallar = (error: string): void => setEstado({ enviando: false, error, mensaje: null });

  // Semana 3: el backend publica POST /api/orders y POST /api/mercado-pago.
  // Mientras no existan, avisamos en lugar de romper el formulario.
  const pagar = async (items: ICarritoItem[], datos: DatosEnvio): Promise<void> => {
    setEstado({ enviando: true, error: null, mensaje: null });

    try {
      const orden = await pedir<{ id: number }>('/api/orders', crearOrden(items, datos));

      if (orden.status === 404) {
        setEstado({
          enviando: false,
          error: null,
          mensaje: 'El pago se habilita cuando el backend publique POST /api/orders (semana 3).',
        });
        return;
      }
      if (orden.status < 200 || orden.status >= 300 || orden.datos === null) {
        fallar(orden.mensaje || 'No se pudo crear el pedido');
        return;
      }

      const preferencia = await pedir<{ init_point?: string }>('/api/mercado-pago', {
        ordenId: orden.datos.id,
      });
      const destino = preferencia.datos?.init_point;

      if (destino) {
        window.location.href = destino;
        return;
      }
      fallar(preferencia.mensaje || 'No se pudo crear el pago');
    } catch {
      fallar('No hay conexión con el servidor');
    }
  };

  return { ...estado, pagar };
}
