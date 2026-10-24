'use client';

import Image from 'next/image';

import type { ICarritoItem } from '@/types';
import { formatearPrecio } from '@/lib/format';

interface CartItemProps {
  item: ICarritoItem;
  onCambiarCantidad: (cantidad: number) => void;
  onQuitar: () => void;
}

function Controles({ item, onCambiarCantidad, onQuitar }: CartItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded border border-borde">
        <button
          type="button"
          aria-label={`Reducir cantidad de ${item.nombre}`}
          onClick={() => onCambiarCantidad(item.cantidad - 1)}
          className="px-3 py-1.5 hover:text-acento"
        >
          -
        </button>
        <span className="min-w-8 text-center font-mono" aria-live="polite">
          {item.cantidad}
        </span>
        <button
          type="button"
          aria-label={`Aumentar cantidad de ${item.nombre}`}
          onClick={() => onCambiarCantidad(item.cantidad + 1)}
          className="px-3 py-1.5 hover:text-acento"
        >
          +
        </button>
      </div>

      <p className="w-28 text-right font-mono text-acento">
        {formatearPrecio(item.precio * item.cantidad)}
      </p>

      <button
        type="button"
        aria-label={`Quitar ${item.nombre} del carrito`}
        onClick={onQuitar}
        className="text-sm text-error hover:underline"
      >
        Quitar
      </button>
    </div>
  );
}

export function CartItem({ item, onCambiarCantidad, onQuitar }: CartItemProps) {
  const detalle = [item.condicion, item.color].filter(Boolean).join(' · ');

  return (
    <li className="flex gap-4 rounded-lg border border-borde bg-elevado p-4">
      <Image
        src={item.imagen || 'https://placehold.co/600x600/png?text=Sin+imagen'}
        alt={item.nombre}
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded border border-borde object-cover"
      />

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{item.nombre}</p>
          {detalle !== '' && <p className="text-sm text-texto-secundario">{detalle}</p>}
          <p className="text-sm text-texto-secundario">{formatearPrecio(item.precio)} c/u</p>
        </div>

        <Controles item={item} onCambiarCantidad={onCambiarCantidad} onQuitar={onQuitar} />
      </div>
    </li>
  );
}
