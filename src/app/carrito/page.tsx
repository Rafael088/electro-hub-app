'use client';

import { Cart } from '@/components/Cart';
import { useCarrito } from '@/hooks/useCarrito';

export default function PaginaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar } = useCarrito();

  return (
    <main className="flex-1 p-6 md:p-10">
      <h1 className="font-display text-3xl font-bold text-acento">Carrito</h1>

      <div className="mt-6">
        <Cart items={items} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} onVaciar={vaciar} />
      </div>
    </main>
  );
}
