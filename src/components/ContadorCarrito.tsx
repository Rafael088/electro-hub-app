'use client';

import Link from 'next/link';

import { useCarrito } from '@/hooks/useCarrito';

export function ContadorCarrito() {
  const { items } = useCarrito();
  const unidades = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <Link
      href="/carrito"
      aria-label={`Ver carrito, ${unidades} ${unidades === 1 ? 'unidad' : 'unidades'}`}
      className="group flex items-center gap-2 rounded-full border border-borde bg-elevado/60 px-4 py-2 text-sm font-medium transition hover:border-acento hover:text-acento hover:shadow-[0_0_24px_-8px_rgba(0,240,255,0.7)]"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="19" r="1.4" fill="currentColor" />
        <circle cx="17.5" cy="19" r="1.4" fill="currentColor" />
      </svg>
      <span className="hidden sm:inline">Carrito</span>
      {unidades > 0 && (
        <span className="pulso-acento grid h-5 min-w-5 place-items-center rounded-full bg-acento px-1 font-mono text-[11px] font-bold text-background">
          {unidades}
        </span>
      )}
    </Link>
  );
}
