'use client';

import Link from 'next/link';

import { ProductGrid } from '@/components/ProductGrid';
import { EncabezadoTienda } from '@/components/EncabezadoTienda';
import { useProductos } from '@/hooks/useProductos';

// La portada ahora es la vitrina de la prueba1; el catálogo completo de la BD
// vive aquí para no perder lo que ya existía.
export default function Catalogo() {
  const { productos, cargando, error } = useProductos();

  return (
    <main className="flex-1">
      <EncabezadoTienda />

      <section className="px-4 pb-12 md:px-10">
        <h1 className="font-display text-3xl font-bold text-acento">Catálogo completo</h1>
        <p className="mt-1 text-texto-secundario">Todos los productos de Electro-Hub</p>

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

        <p className="mt-8">
          <Link href="/" className="text-acento hover:underline">
            ← Volver a la portada
          </Link>
        </p>
      </section>
    </main>
  );
}
