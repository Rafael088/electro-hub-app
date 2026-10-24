import type { IProducto } from '@/types';
import { ProductCard } from '@/components/ProductCard';

interface ProductGridProps {
  productos: IProducto[];
}

export function ProductGrid({ productos }: ProductGridProps) {
  if (productos.length === 0) {
    return <p className="py-16 text-center text-texto-secundario">No hay productos disponibles</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <li key={producto.id}>
          <ProductCard producto={producto} />
        </li>
      ))}
    </ul>
  );
}
