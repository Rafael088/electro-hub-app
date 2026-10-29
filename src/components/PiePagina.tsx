import Link from 'next/link';

export function PiePagina() {
  return (
    <footer className="mt-16 border-t border-borde/40 bg-background/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-texto-secundario md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          <span className="font-display text-acento">Electro-Hub</span> · Tecnología que se siente
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-exito">
            <span className="punto-vivo h-1.5 w-1.5 rounded-full bg-exito" />
            Envío gratis en Colombia
          </span>
          <Link href="/carrito" className="transition hover:text-acento">
            Carrito
          </Link>
          <Link href="/checkout" className="transition hover:text-acento">
            Checkout
          </Link>
        </div>
      </div>
    </footer>
  );
}
