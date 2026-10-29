'use client';

import { useMemo, useState } from 'react';

import type { IProducto } from '@/types';

export interface FiltroCatalogo {
  categorias: string[];
  categoria: string | null;
  elegirCategoria: (categoria: string | null) => void;
  visibles: IProducto[];
}

export function useCatalogoFiltrado(productos: IProducto[]): FiltroCatalogo {
  const [categoria, setCategoria] = useState<string | null>(null);

  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria.nombre))],
    [productos]
  );

  const visibles =
    categoria === null
      ? productos
      : productos.filter((producto) => producto.categoria.nombre === categoria);

  return { categorias, categoria, elegirCategoria: setCategoria, visibles };
}
