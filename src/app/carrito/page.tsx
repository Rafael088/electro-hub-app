'use client';

import Link from 'next/link';

import { Cart } from '@/components/Cart';
import { EncabezadoTienda } from '@/components/EncabezadoTienda';
import { useCarrito } from '@/hooks/useCarrito';

export default function PaginaCarrito() {
  const { items, cambiarCantidad, quitar, vaciar } = useCarrito();

  return (
    <main className="flex-1">
      <EncabezadoTienda />

      <div className="p-6 md:p-10">
        {/* Salida al menú siempre presente, con o sin productos (parche proyecto 5) */}
        <Link
          href="/"
          className="inline-block rounded-xl border border-borde bg-elevado px-4 py-2 text-sm text-foreground transition-colors hover:border-acento hover:text-acento"
        >
          ← Volver al menú
        </Link>

        <h1 className="mt-5 font-display text-3xl font-bold text-acento">Carrito</h1>
        <p className="mt-1 text-sm text-texto-secundario">
          Zona de guardado de pedidos — lo que guardaste queda aquí hasta que quieras
          facturar.
        </p>

        <div className="mt-6">
          <Cart items={items} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} onVaciar={vaciar} />
        </div>
      </div>
    </main>
  );
}
