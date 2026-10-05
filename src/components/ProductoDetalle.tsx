'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { IVariante } from '@/types';
import { formatearPrecio } from '@/lib/format';
import { useProducto } from '@/hooks/useProducto';

interface ProductoDetalleProps {
  id: string;
}

function Mensaje({ texto }: { texto: string }) {
  return <p className="py-16 text-center text-texto-secundario">{texto}</p>;
}

function ListaVariantes({ variantes }: { variantes: IVariante[] }) {
  if (variantes.length === 0) {
    return <p className="mt-4 text-sm text-texto-secundario">Este producto no tiene variantes.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {variantes.map((variante) => (
        <li
          key={variante.id}
          className="flex items-center justify-between rounded-lg border border-borde bg-elevado px-4 py-2 text-sm"
        >
          <span>
            {[variante.condicion, variante.color].filter(Boolean).join(' · ') || 'Única'}
          </span>
          <span className={variante.stock > 0 ? 'text-exito' : 'text-error'}>
            {variante.stock > 0 ? `${variante.stock} en stock` : 'Agotado'}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Etiquetas({ tags }: { tags: string[] }) {
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

export function ProductoDetalle({ id }: ProductoDetalleProps) {
  const { producto, cargando, error } = useProducto(id);
  const listo = !cargando && error === null;

  return (
    <main className="flex-1 p-6 md:p-10">
      <Link href="/" className="text-sm text-acento hover:underline">
        ← Volver al catálogo
      </Link>

      {cargando && <Mensaje texto="Cargando producto…" />}
      {error !== null && <Mensaje texto={error} />}
      {listo && producto === null && <Mensaje texto="Producto no encontrado" />}

      {listo && producto !== null && (
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
            <p className="mt-3 font-mono text-2xl text-acento">
              {formatearPrecio(producto.precio)}
            </p>
            <p className="mt-4 leading-relaxed">{producto.descripcion}</p>

            <Etiquetas tags={producto.tags} />

            <h2 className="mt-8 text-lg font-semibold">Variantes</h2>
            <p className="mt-1 text-sm text-texto-secundario">
              El selector de condición y color llega en la semana 2.
            </p>
            <ListaVariantes variantes={producto.variantes} />
          </div>
        </article>
      )}
    </main>
  );
}
