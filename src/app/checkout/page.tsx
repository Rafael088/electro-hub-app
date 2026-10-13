'use client';

import Link from 'next/link';

import type { ICarritoItem } from '@/types';
import type { DatosEnvio } from '@/lib/validacion';
import { formatearPrecio } from '@/lib/format';
import { CheckoutForm } from '@/components/CheckoutForm';
import { useCarrito } from '@/hooks/useCarrito';
import { usePago } from '@/hooks/usePago';

function CarritoVacio() {
  return (
    <div className="py-16 text-center">
      <p className="text-texto-secundario">No hay nada que pagar: tu carrito está vacío</p>
      <Link href="/" className="mt-4 inline-block text-acento hover:underline">
        Ver catálogo
      </Link>
    </div>
  );
}

function ResumenPedido({ items, total }: { items: ICarritoItem[]; total: number }) {
  return (
    <aside className="h-fit rounded-lg border border-borde bg-elevado p-6">
      <h2 className="font-display text-lg font-semibold">Tu pedido</h2>

      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={`${item.productoId}-${item.varianteId}`}
            className="flex justify-between gap-2 text-texto-secundario"
          >
            <span>
              {item.cantidad}× {item.nombre}
            </span>
            <span className="font-mono">{formatearPrecio(item.precio * item.cantidad)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-borde pt-4 font-mono text-xl text-acento">
        {formatearPrecio(total)}
      </p>
      <p className="mt-2 text-xs text-exito">Envío gratis en Colombia</p>
    </aside>
  );
}

export default function PaginaCheckout() {
  const { items, total } = useCarrito();
  const { enviando, error, mensaje, pagar } = usePago();

  if (items.length === 0) {
    return (
      <main className="flex-1 p-6 md:p-10">
        <h1 className="font-display text-3xl font-bold text-acento">Checkout</h1>
        <CarritoVacio />
      </main>
    );
  }

  const confirmar = (datos: DatosEnvio): void => {
    void pagar(items, datos);
  };

  return (
    <main className="flex-1 p-6 md:p-10">
      <Link href="/carrito" className="text-sm text-acento hover:underline">
        ← Volver al carrito
      </Link>
      <h1 className="font-display mt-4 text-3xl font-bold text-acento">Checkout</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <CheckoutForm onConfirmar={confirmar} enviando={enviando} error={error} />
        <ResumenPedido items={items} total={total} />
      </div>

      {mensaje !== null && (
        <p className="mt-6 rounded border border-borde bg-elevado p-4 text-sm text-texto-secundario">
          {mensaje}
        </p>
      )}
    </main>
  );
}
