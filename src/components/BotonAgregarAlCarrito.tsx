'use client';

import { useState } from 'react';
import Link from 'next/link';

import type { IProducto, IVariante } from '@/types';
import { useCarrito } from '@/hooks/useCarrito';

interface BotonAgregarAlCarritoProps {
  producto: IProducto;
  variante: IVariante | null;
}

function crearItem(producto: IProducto, variante: IVariante) {
  return {
    productoId: producto.id,
    varianteId: variante.id,
    cantidad: 1,
    precio: producto.precio,
    nombre: producto.nombre,
    imagen: producto.imagenes[0] ?? '',
    condicion: variante.condicion ?? undefined,
    color: variante.color ?? undefined,
  };
}

export function BotonAgregarAlCarrito({ producto, variante }: BotonAgregarAlCarritoProps) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  if (variante === null) {
    return <p className="mt-6 text-sm text-texto-secundario">Elige una variante para continuar</p>;
  }

  const agregarAlCarrito = (): void => {
    agregar(crearItem(producto, variante));
    setAgregado(true);
  };

  const agotado = variante.stock <= 0;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <button
        type="button"
        disabled={agotado}
        onClick={agregarAlCarrito}
        className="boton-gradiente rounded-full px-7 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {agotado ? 'Agotado' : 'Agregar al carrito'}
      </button>

      {agregado && (
        <Link
          href="/carrito"
          className="animar-entrada flex items-center gap-1.5 text-sm text-exito transition hover:underline"
        >
          <span aria-hidden="true">✓</span> Ver carrito →
        </Link>
      )}
    </div>
  );
}
