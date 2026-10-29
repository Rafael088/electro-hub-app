'use client';

import { useState } from 'react';
import Image from 'next/image';

import type { IProducto, IVariante } from '@/types';
import { formatearPrecio } from '@/lib/format';
import { varianteInicial } from '@/lib/variantes';
import { VariantSelector } from '@/components/VariantSelector';
import { BotonAgregarAlCarrito } from '@/components/BotonAgregarAlCarrito';

interface ProductoFichaProps {
  producto: IProducto;
}

function Etiquetas({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-borde/60 bg-background/60 px-2.5 py-0.5 text-xs text-texto-secundario"
        >
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
    <article className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-acento/20 via-transparent to-acento-alt/20 blur-2xl"
        />
        <div className="relative overflow-hidden rounded-2xl border border-borde/70 bg-elevado/50">
          <Image
            src={producto.imagenes[0] ?? 'https://placehold.co/600x600/png?text=Sin+imagen'}
            alt={producto.nombre}
            width={600}
            height={600}
            className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
            priority
          />
        </div>
      </div>

      <div>
        <span className="inline-block rounded-full border border-acento-alt/40 bg-acento-alt/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-acento-alt">
          {producto.categoria.nombre}
        </span>

        <h1 className="font-display mt-3 text-3xl font-bold leading-tight md:text-4xl">
          {producto.nombre}
        </h1>

        <p className="mt-3 font-mono text-2xl text-acento">{formatearPrecio(producto.precio)}</p>

        <p className="mt-4 leading-relaxed text-texto-secundario">{producto.descripcion}</p>

        <Etiquetas tags={producto.tags} />

        <div className="mt-8 rounded-2xl border border-borde/60 bg-elevado/50 p-5 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-texto-secundario">
            Variantes
          </h2>
          <VariantSelector
            variantes={producto.variantes}
            variante={variante}
            onSeleccionar={setVariante}
          />
        </div>

        <BotonAgregarAlCarrito producto={producto} variante={variante} />

        <p className="mt-4 flex items-center gap-2 text-xs text-texto-secundario">
          <span aria-hidden="true">🚚</span> Envío gratis en Colombia · Pago seguro con Mercado Pago
        </p>
      </div>
    </article>
  );
}
