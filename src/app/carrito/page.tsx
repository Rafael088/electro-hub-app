'use client';

import { Cart } from '@/components/Cart';
import { VolverAlCatalogo } from '@/components/Hero';
import { useCarrito } from '@/hooks/useCarrito';

export default function PaginaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar } = useCarrito();

  return (
    <main className="flex-1 px-6 pb-12 pt-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <VolverAlCatalogo />

        <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display text-3xl font-bold text-acento md:text-4xl">Carrito</h1>
          <p className="text-sm text-texto-secundario">
            Revisa tus productos antes de pagar
          </p>
        </div>

        <div className="mt-6">
          <Cart
            items={items}
            onCambiarCantidad={cambiarCantidad}
            onQuitar={quitar}
            onVaciar={vaciar}
          />
        </div>
      </div>
    </main>
  );
}
