'use client';

import { useEffect, useState } from 'react';

import type { IApiResponse, IProducto } from '@/types';

export interface EstadoProductos {
  productos: IProducto[];
  cargando: boolean;
  error: string | null;
}

const ESTADO_CARGANDO: EstadoProductos = { productos: [], cargando: true, error: null };

async function descargarProductos(): Promise<EstadoProductos> {
  try {
    const respuesta = await fetch('/api/productos');
    const cuerpo = (await respuesta.json()) as IApiResponse<IProducto[]>;

    if (!respuesta.ok || cuerpo.data === null) {
      return {
        productos: [],
        cargando: false,
        error: cuerpo.message || 'No se pudieron cargar los productos',
      };
    }

    return { productos: cuerpo.data, cargando: false, error: null };
  } catch {
    // Sin backend (o sin red) el fetch rechaza: no rompemos el render
    return { productos: [], cargando: false, error: 'No hay conexión con el servidor' };
  }
}

export function useProductos(): EstadoProductos {
  const [estado, setEstado] = useState<EstadoProductos>(ESTADO_CARGANDO);

  useEffect(() => {
    let vigente = true;

    void descargarProductos().then((resultado) => {
      if (vigente) setEstado(resultado);
    });

    return () => {
      vigente = false;
    };
  }, []);

  return estado;
}
