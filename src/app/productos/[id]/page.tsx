import { ProductoDetalle } from '@/components/ProductoDetalle';

// Next.js 16: `params` es una Promise, hay que esperarla antes de usarla.
export default async function PaginaProducto({ params }: PageProps<'/productos/[id]'>) {
  const { id } = await params;

  return <ProductoDetalle id={id} />;
}
