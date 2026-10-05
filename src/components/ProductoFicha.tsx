'use client';

import { useState } from 'react';
import Image from 'next/image';

import type { IProducto, IVariante } from '@/types';
import { formatearPrecio } from '@/lib/format';
import { varianteInicial } from '@/lib/variantes';
import { VariantSelector } from '@/components/VariantSelector';

interface ProductoFichaProps {
  producto: IProducto;
}

function Etiquetas({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded bg-background px-2 py-1 text-xs text-texto-secundario">
          {tag}
        </span>
      ))}
    </div>
  );
}

export function ProductoFicha({ producto }: ProductoFichaProps) {
  const [variante, setVariante] = useState<IVariante | null>(() =>
    varianteInicial(producto.variantes)
  );

  return (
    <article className="mt-6 grid gap-8 md:grid-cols-2">
      <Image
        src={producto.imagenes[0] ?? 'https://placehold.co/600x600/png?text=Sin+imagen'}
        alt={producto.nombre}
        width={600}
        height={600}
        className="w-full rounded-lg border border-borde object-cover"
        priority
      />

      <div>
        <p className="text-sm text-texto-secundario">{producto.categoria.nombre}</p>
        <h1 className="font-display mt-1 text-3xl font-bold">{producto.nombre}</h1>
        <p className="mt-3 font-mono text-2xl text-acento">{formatearPrecio(producto.precio)}</p>
        <p className="mt-4 leading-relaxed">{producto.descripcion}</p>

        <Etiquetas tags={producto.tags} />

        <h2 className="mt-8 text-lg font-semibold">Variantes</h2>
        <VariantSelector
          variantes={producto.variantes}
          variante={variante}
          onSeleccionar={setVariante}
        />
      </div>
    </article>
  );
}
