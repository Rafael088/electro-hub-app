import Image from 'next/image';
import Link from 'next/link';

import type { IProducto } from '@/types';
import { formatearPrecio } from '@/lib/format';

interface ProductCardProps {
  producto: IProducto;
}

export function ProductCard({ producto }: ProductCardProps) {
  return (
    <Link href={`/productos/${producto.id}`} className="group block h-full">
      <article className="tarjeta relative flex h-full flex-col overflow-hidden rounded-2xl border border-borde/70 bg-elevado/70">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={producto.imagenes[0] ?? 'https://placehold.co/600x600/png?text=Sin+imagen'}
            alt={producto.nombre}
            width={600}
            height={600}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-elevado via-elevado/10 to-transparent opacity-80" />

          {producto.variantes.length > 0 && (
            <span className="absolute left-3 top-3 rounded-full border border-borde/60 bg-background/70 px-2.5 py-1 font-mono text-[11px] text-texto-secundario backdrop-blur">
              {producto.variantes.length} variantes
            </span>
          )}

          <span className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-acento/10 px-3 py-1 text-xs font-semibold text-acento opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalle →
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-acento-alt">
            {producto.categoria.nombre}
          </p>

          <h3 className="text-lg font-semibold leading-snug">{producto.nombre}</h3>

          <p className="font-mono text-acento">{formatearPrecio(producto.precio)}</p>

          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {producto.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-borde/60 bg-background/60 px-2.5 py-0.5 text-xs text-texto-secundario"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
