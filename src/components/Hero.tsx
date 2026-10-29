import Link from 'next/link';

const BENEFICIOS = [
  { icono: '🚚', texto: 'Envío gratis' },
  { icono: '🔒', texto: 'Pago seguro' },
  { icono: '✨', texto: 'Nuevos y renovados' },
];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl pb-10 pt-12 text-center md:pt-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-acento/30 bg-acento/5 px-4 py-1.5 text-xs font-medium text-acento">
        <span className="punto-vivo h-1.5 w-1.5 rounded-full bg-acento" />
        Envío gratis en Colombia
      </span>

      <h1 className="font-display titulo-degradado destello animar-flotar mt-5 text-5xl font-bold md:text-7xl">
        Electro-Hub
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-texto-secundario">
        Portátiles, audífonos, mouse, teclados y teléfonos.
        <br className="hidden sm:block" /> Tecnología que se siente.
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
        {BENEFICIOS.map((beneficio) => (
          <li
            key={beneficio.texto}
            className="flex items-center gap-2 rounded-full border border-borde/60 bg-elevado/50 px-4 py-2 text-texto-secundario backdrop-blur transition hover:border-acento/50 hover:text-foreground"
          >
            <span aria-hidden="true">{beneficio.icono}</span>
            {beneficio.texto}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Enlace usado por las páginas internas para volver al catálogo
export function VolverAlCatalogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm text-texto-secundario transition hover:text-acento"
    >
      ← Volver al catálogo
    </Link>
  );
}
