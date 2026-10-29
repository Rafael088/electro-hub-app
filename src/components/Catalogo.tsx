'use client';

import { FiltrosCategoria } from '@/components/FiltrosCategoria';
import { GrillaCargando } from '@/components/GrillaCargando';
import { ProductGrid } from '@/components/ProductGrid';
import { useCatalogoFiltrado } from '@/hooks/useCatalogoFiltrado';

import type { IProducto } from '@/types';

interface CatalogoProps {
  productos: IProducto[];
  cargando: boolean;
  error: string | null;
}

export function Catalogo({ productos, cargando, error }: CatalogoProps) {
  const { categorias, categoria, elegirCategoria, visibles } = useCatalogoFiltrado(productos);

  return (
    <section aria-labelledby="titulo-catalogo" className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="titulo-catalogo" className="font-display text-2xl font-semibold">
            Catálogo
          </h2>
          {!cargando && error === null && (
            <p className="mt-1 text-sm text-texto-secundario">
              {visibles.length} {visibles.length === 1 ? 'producto' : 'productos'} disponibles
            </p>
          )}
        </div>

        {!cargando && error === null && (
          <FiltrosCategoria
            categorias={categorias}
            activa={categoria}
            onElegir={elegirCategoria}
          />
        )}
      </div>

      <div className="mt-6">
        {cargando && <GrillaCargando />}

        {error !== null && (
          <p role="alert" className="py-16 text-center text-error">
            {error}
          </p>
        )}

        {!cargando && error === null && <ProductGrid productos={visibles} />}
      </div>
    </section>
  );
}
