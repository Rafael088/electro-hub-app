'use client';

import { ProductGrid } from '@/components/ProductGrid';
import { useProductos } from '@/hooks/useProductos';

export default function Home() {
  const { productos, cargando, error } = useProductos();

  return (
    <main className="flex-1 p-6 md:p-10">
      <header className="mb-8 text-center">
        <h1 className="font-display text-4xl font-bold text-acento">Electro-Hub</h1>
        <p className="mt-2 text-texto-secundario">
          Accesorios de tecnología con envío gratis en Colombia
        </p>
      </header>

      {cargando && (
        <p role="status" className="py-16 text-center text-texto-secundario">
          Cargando productos…
        </p>
      )}

      {error !== null && (
        <p role="alert" className="py-16 text-center text-error">
          {error}
        </p>
      )}

      {!cargando && error === null && <ProductGrid productos={productos} />}
    </main>
  );
}
