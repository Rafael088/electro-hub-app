import { Suspense } from 'react';

import { ConfirmacionPedido } from '@/components/ConfirmacionPedido';

// useSearchParams exige un límite de Suspense para poder prerenderizar la ruta
export default function PaginaConfirmacion() {
  return (
    <main className="flex-1 p-6 md:p-10">
      <Suspense
        fallback={<p className="py-16 text-center text-texto-secundario">Cargando pedido…</p>}
      >
        <ConfirmacionPedido />
      </Suspense>
    </main>
  );
}
