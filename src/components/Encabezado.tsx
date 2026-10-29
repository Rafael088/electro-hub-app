import Link from 'next/link';

import { ContadorCarrito } from '@/components/ContadorCarrito';

const ENLACES = [
  { href: '/', texto: 'Catálogo' },
  { href: '/checkout', texto: 'Checkout' },
];

function Marca() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 transition group-hover:rotate-6">
        <rect x="6" y="6" width="20" height="20" rx="4" fill="none" stroke="#00f0ff" strokeWidth="2" />
        <rect x="12" y="12" width="8" height="8" rx="1.5" fill="#b829f7" />
        <path
          d="M12 2v4M20 2v4M12 26v4M20 26v4M2 12h4M2 20h4M26 12h4M26 20h4"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display titulo-degradado text-xl font-bold tracking-wide">Electro-Hub</span>
    </Link>
  );
}

export function Encabezado() {
  return (
    <header className="sticky top-0 z-40 border-b border-borde/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 md:px-10">
        <Marca />

        <nav aria-label="Principal" className="hidden items-center gap-1 text-sm sm:flex">
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="rounded-full px-3 py-1.5 text-texto-secundario transition hover:bg-elevado hover:text-acento"
            >
              {enlace.texto}
            </Link>
          ))}
        </nav>

        <ContadorCarrito />
      </div>
    </header>
  );
}
