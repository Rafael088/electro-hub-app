import { Suspense } from 'react';

import { ConfirmacionPedido } from '@/components/ConfirmacionPedido';

// useSearchParams exige un límite de Suspense para poder prerenderizar la ruta
export default function PaginaConfirmacion() {
  return (
    <main className="flex-1 px-6 pb-12 pt-6 md:px-10">
      <div className="mx-auto max-w-2xl">
        <Suspense
          fallback={
            <p className="py-16 text-center text-texto-secundario">Cargando pedido…</p>
          }
        >
          <ConfirmacionPedido />
        </Suspense>
      </div>
    </main>
  );
}
