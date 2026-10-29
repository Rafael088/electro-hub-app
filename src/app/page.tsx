'use client';

import { Catalogo } from '@/components/Catalogo';
import { Hero } from '@/components/Hero';
import { useProductos } from '@/hooks/useProductos';

export default function Home() {
  const { productos, cargando, error } = useProductos();

  return (
    <main className="flex-1 px-6 pb-12 md:px-10">
      <Hero />
      <Catalogo productos={productos} cargando={cargando} error={error} />
    </main>
  );
}
