'use client';

import Link from 'next/link';

import { useProducto } from '@/hooks/useProducto';
import { ProductoFicha } from '@/components/ProductoFicha';

interface ProductoDetalleProps {
  id: string;
}

function Mensaje({ texto }: { texto: string }) {
  return <p className="py-16 text-center text-texto-secundario">{texto}</p>;
}

export function ProductoDetalle({ id }: ProductoDetalleProps) {
  const { producto, cargando, error } = useProducto(id);
  const listo = !cargando && error === null;

  return (
    <main className="flex-1 p-6 md:p-10">
      <Link href="/" className="text-sm text-acento hover:underline">
        ← Volver al catálogo
      </Link>

      {cargando && <Mensaje texto="Cargando producto…" />}
      {error !== null && <Mensaje texto={error} />}
      {listo && producto === null && <Mensaje texto="Producto no encontrado" />}

      {/* key fuerza el reinicio del estado de variante al cambiar de producto */}
      {listo && producto !== null && (
        <ProductoFicha key={producto.id} producto={producto} />
      )}
    </main>
  );
}
