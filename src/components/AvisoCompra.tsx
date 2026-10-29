'use client';

import { useRouter } from 'next/navigation';

interface AvisoCompraProps {
  onSeguirComprando: () => void;
}

// Al pagar se elimina la pestaña del detalle: si fue abierta desde la portada,
// la pestaña origen pasa a la zona de guardado del carrito (parche proyecto 5:
// ya no vamos directo a facturar, primero el usuario ve su carrito).
function irAlCarrito(router: ReturnType<typeof useRouter>): void {
  const pestañaOrigen = window.opener;

  if (pestañaOrigen !== null && !pestañaOrigen.closed) {
    pestañaOrigen.location.href = '/carrito';
    window.close();
    return;
  }

  // Sin pestaña origen (acceso directo): seguimos en esta misma
  router.push('/carrito');
}

// Aviso posterior a "Agregar al carrito": el cliente decide ir a su carrito
// (donde luego puede facturar) o seguir mirando.
export function AvisoCompra({ onSeguirComprando }: AvisoCompraProps) {
  const router = useRouter();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Elige qué hacer después de agregar al carrito"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl border border-acento/40 bg-elevado p-8 text-center shadow-[0_0_48px_rgba(0,240,255,0.25)]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-exito">
          Guardado en tu carrito
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground">
          ¡Listo! Tu artículo quedó guardado
        </h2>
        <p className="mt-3 text-texto-secundario">
          ¿Quieres seguir comprando o pasar a tu carrito para pagar ahora?
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => irAlCarrito(router)}
            className="rounded-xl bg-acento px-6 py-3 font-semibold text-background transition hover:brightness-110"
          >
            Quiero pagar
          </button>
          <button
            type="button"
            onClick={onSeguirComprando}
            className="rounded-xl border border-borde bg-background px-6 py-3 font-semibold text-foreground transition hover:border-acento hover:text-acento"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}
