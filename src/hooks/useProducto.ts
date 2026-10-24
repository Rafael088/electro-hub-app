'use client';

import { useEffect, useState } from 'react';

import type { IApiResponse, IProducto } from '@/types';

export interface EstadoProducto {
  producto: IProducto | null;
  cargando: boolean;
  error: string | null;
}

const ESTADO_CARGANDO: EstadoProducto = { producto: null, cargando: true, error: null };

async function descargarProducto(id: string): Promise<EstadoProducto> {
  try {
    const respuesta = await fetch(`/api/productos/${id}`);
    const cuerpo = (await respuesta.json()) as IApiResponse<IProducto>;

    if (!respuesta.ok || cuerpo.data === null) {
      return {
        producto: null,
        cargando: false,
        error: cuerpo.message || 'No se pudo cargar el producto',
      };
    }

    return { producto: cuerpo.data, cargando: false, error: null };
  } catch {
    return { producto: null, cargando: false, error: 'No hay conexión con el servidor' };
  }
}

export function useProducto(id: string): EstadoProducto {
  const [estado, setEstado] = useState<EstadoProducto>(ESTADO_CARGANDO);

  useEffect(() => {
    let vigente = true;

    void descargarProducto(id).then((resultado) => {
      if (vigente) setEstado(resultado);
    });

    return () => {
      vigente = false;
    };
  }, [id]);

  return estado;
}
