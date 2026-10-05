import Image from 'next/image';
import Link from 'next/link';

import type { IProducto } from '@/types';
import { formatearPrecio } from '@/lib/format';

interface ProductCardProps {
  producto: IProducto;
}

export function ProductCard({ producto }: ProductCardProps) {
  return (
    <Link href={`/productos/${producto.id}`}>
      <div className="border border-borde rounded-lg overflow-hidden hover:shadow-lg hover:border-acento transition-all bg-elevado">
        <Image
          src={producto.imagenes[0] ?? 'https://placehold.co/600x600/png?text=Sin+imagen'}
          alt={producto.nombre}
          width={600}
          height={600}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{producto.nombre}</h3>
          <p className="text-acento font-mono text-sm mt-1">{formatearPrecio(producto.precio)}</p>
          <div className="flex gap-2 mt-2">
            {producto.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-background px-2 py-1 rounded text-texto-secundario">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
