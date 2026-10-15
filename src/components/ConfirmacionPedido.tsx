'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import type { ICarritoItem } from '@/types';
import { estadoDePago } from '@/lib/confirmacion';
import { calcularTotalCarrito, obtenerCarrito } from '@/lib/cart';
import { formatearPrecio } from '@/lib/format';
import { useCarrito } from '@/hooks/useCarrito';

function ResumenPedido({ items }: { items: ICarritoItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-8 rounded-lg border border-borde bg-elevado p-6">
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
        {formatearPrecio(calcularTotalCarrito(items))}
      </p>
    </section>
  );
}

export function ConfirmacionPedido() {
  const parametros = useSearchParams();
  const estadoPago = parametros.get('status');
  const pagoId = parametros.get('payment_id');
  const { vaciar } = useCarrito();
  const [resumen, setResumen] = useState<ICarritoItem[]>([]);
  const vaciado = useRef(false);

  // El carrito solo se vacía con el pago aprobado: si Mercado Pago lo rechaza,
  // el cliente conserva sus productos para reintentar. Se lee el carrito crudo
  // porque en el primer commit de la hidratación el hook aún devuelve vacío.
  useEffect(() => {
    if (vaciado.current || estadoPago !== 'approved') return;
    vaciado.current = true;
    setResumen(obtenerCarrito());
    vaciar();
  }, [estadoPago, vaciar]);

  const estado = estadoDePago(estadoPago);

  return (
    <>
      <h1
        className={`font-display text-3xl font-bold ${estado.esExito ? 'text-exito' : 'text-acento'}`}
      >
        {estado.titulo}
      </h1>
      <p className="mt-4 max-w-prose text-texto-secundario">{estado.mensaje}</p>

      {pagoId !== null && (
        <p className="mt-4 font-mono text-sm text-texto-secundario">
          Referencia de pago: {pagoId}
        </p>
      )}

      <ResumenPedido items={resumen} />

      <Link
        href="/"
        className="mt-8 inline-block rounded bg-acento px-4 py-3 font-semibold text-background transition-opacity hover:opacity-90"
      >
        Volver al catálogo
      </Link>
    </>
  );
}
