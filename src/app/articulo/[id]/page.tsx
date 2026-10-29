import { notFound } from 'next/navigation';

import { DetalleArticulo } from '@/components/DetalleArticulo';
import { buscarArticuloDestacado } from '@/lib/catalogoDemo';

interface PaginaArticuloProps {
  params: Promise<{ id: string }>;
}

// Next.js 16: params es una Promise en páginas dinámicas
export default async function PaginaArticulo({ params }: PaginaArticuloProps) {
  const { id } = await params;
  const articulo = buscarArticuloDestacado(Number(id));

  if (!articulo) {
    notFound();
  }

  return <DetalleArticulo articulo={articulo} />;
}
