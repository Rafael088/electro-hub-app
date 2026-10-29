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
    <div className="animar-entrada mx-auto max-w-md rounded-2xl border border-borde/60 bg-elevado/50 p-12 text-center">
      <p className="text-texto-secundario">No hay nada que pagar: tu carrito está vacío</p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-full bg-acento px-5 py-2 text-sm font-semibold text-background transition hover:opacity-90"
      >
        Ver catálogo
      </Link>
    </div>
  );
}

function ResumenPedido({ items, total }: { items: ICarritoItem[]; total: number }) {
  return (
    <aside className="sticky top-24 h-fit rounded-2xl border border-borde/60 bg-elevado/60 p-6 backdrop-blur">
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

      <p className="mt-4 border-t border-borde/60 pt-4 font-mono text-xl text-acento">
        {formatearPrecio(total)}
      </p>
      <p className="mt-2 text-xs text-exito">Envío gratis en Colombia</p>
      <p className="mt-1 text-xs text-texto-secundario">Pago seguro con Mercado Pago</p>
    </aside>
  );
}

export default function PaginaCheckout() {
  const { items, total } = useCarrito();
  const { enviando, error, mensaje, pagar } = usePago();

  if (items.length === 0) {
    return (
      <main className="flex-1 px-6 pb-12 pt-6 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-3xl font-bold text-acento md:text-4xl">Checkout</h1>
          <div className="mt-6">
            <CarritoVacio />
          </div>
        </div>
      </main>
    );
  }

  const confirmar = (datos: DatosEnvio): void => {
    void pagar(items, datos);
  };

  return (
    <main className="flex-1 px-6 pb-12 pt-6 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/carrito"
          className="inline-flex items-center gap-1.5 text-sm text-texto-secundario transition hover:text-acento"
        >
          ← Volver al carrito
        </Link>

        <h1 className="font-display mt-4 text-3xl font-bold text-acento md:text-4xl">Checkout</h1>
        <p className="mt-1 text-sm text-texto-secundario">
          Completa tus datos y paga de forma segura
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
          <CheckoutForm onConfirmar={confirmar} enviando={enviando} error={error} />
          <ResumenPedido items={items} total={total} />
        </div>

        {mensaje !== null && (
          <p className="mt-6 rounded-2xl border border-borde/60 bg-elevado/60 p-4 text-sm text-texto-secundario">
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}
