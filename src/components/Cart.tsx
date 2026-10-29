'use client';

import Link from 'next/link';

import type { ICarritoItem } from '@/types';
import { calcularTotalCarrito } from '@/lib/cart';
import { formatearPrecio } from '@/lib/format';
import { CartItem } from '@/components/CartItem';

interface CartProps {
  items: ICarritoItem[];
  onCambiarCantidad: (productoId: number, varianteId: number, cantidad: number) => void;
  onQuitar: (productoId: number, varianteId: number) => void;
  onVaciar: () => void;
}

function EstadoVacio() {
  return (
    <div className="animar-entrada mx-auto max-w-md rounded-2xl border border-borde/60 bg-elevado/50 p-12 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-acento/30 bg-acento/5 text-2xl">
        🛒
      </div>
      <p className="mt-4 text-texto-secundario">Tu carrito está vacío</p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-full bg-acento px-5 py-2 text-sm font-semibold text-background transition hover:opacity-90"
      >
        Ver catálogo
      </Link>
    </div>
  );
}

interface ResumenProps {
  items: ICarritoItem[];
  onVaciar: () => void;
}

function Resumen({ items, onVaciar }: ResumenProps) {
  const total = calcularTotalCarrito(items);
  const unidades = items.reduce((cantidad, item) => cantidad + item.cantidad, 0);

  return (
    <aside className="sticky top-24 h-fit rounded-2xl border border-borde/60 bg-elevado/60 p-6 backdrop-blur">
      <h2 className="font-display text-lg font-semibold">Resumen</h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-texto-secundario">Productos ({unidades})</dt>
          <dd className="font-mono">{formatearPrecio(total)}</dd>
        </div>
        <div className="flex justify-between text-exito">
          <dt>Envío</dt>
          <dd>Gratis</dd>
        </div>
      </dl>

      <p className="mt-4 border-t border-borde/60 pt-4 font-mono text-xl text-acento">
        {formatearPrecio(total)}
      </p>

      <Link
        href="/checkout"
        className="boton-gradiente mt-6 block rounded-full px-4 py-3 text-center font-semibold"
      >
        Finalizar compra
      </Link>

      <button
        type="button"
        onClick={onVaciar}
        className="mt-3 w-full text-sm text-error transition hover:underline"
      >
        Vaciar carrito
      </button>
    </aside>
  );
}

export function Cart({ items, onCambiarCantidad, onQuitar, onVaciar }: CartProps) {
  if (items.length === 0) return <EstadoVacio />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <ul className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={`${item.productoId}-${item.varianteId}`}
            item={item}
            onCambiarCantidad={(cantidad) =>
              onCambiarCantidad(item.productoId, item.varianteId, cantidad)
            }
            onQuitar={() => onQuitar(item.productoId, item.varianteId)}
          />
        ))}
      </ul>

      <Resumen items={items} onVaciar={onVaciar} />
    </div>
  );
}
