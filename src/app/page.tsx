'use client';

import Link from 'next/link';

import { ProductGrid } from '@/components/ProductGrid';
import { useProductos } from '@/hooks/useProductos';

export default function Home() {
  const { productos, cargando, error } = useProductos();

  return (
    <main className="flex-1 p-6 md:p-10">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-between">
          <span className="text-sm text-texto-secundario">Envío gratis en Colombia</span>
          <Link href="/carrito" className="text-sm text-acento hover:underline">
            Ver carrito →
          </Link>
        </div>
        <h1 className="font-display mt-4 text-4xl font-bold text-acento">Electro-Hub</h1>
        <p className="mt-2 text-texto-secundario">
          Portátiles, audífonos, mouse, teclados y teléfonos
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
