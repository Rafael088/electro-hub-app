'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BotonMenu } from '@/components/BotonMenu';
import { MenuCortina } from '@/components/MenuCortina';
import { useCarrito } from '@/hooks/useCarrito';

interface EncabezadoTiendaProps {
  /** Las 3 rayas solo se muestran en la portada (proyecto 2) */
  mostrarMenu?: boolean;
}

// Encabezado pegado arriba (proyecto 4): logo con calabazas, 3 rayas que abren
// la cortina, y "Envío gratis en Colombia" pequeño debajo del carrito.
export function EncabezadoTienda({ mostrarMenu = false }: EncabezadoTiendaProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { items } = useCarrito();
  // Contador de productos agregados visible en cualquier página (parche proyecto 5)
  const unidades = items.reduce((suma, item) => suma + item.cantidad, 0);

  // La cortina va FUERA del <header>: el backdrop-filter del encabezado crea
  // un contexto que recorta el fixed y el fondo borroso no cubría toda la pantalla.
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-4 md:p-6">
        <div className="justify-self-start">
          {mostrarMenu && <BotonMenu abierto={menuAbierto} onToggle={() => setMenuAbierto((abierto) => !abierto)} />}
        </div>

        {/* Logo centrado con calabazas sonrientes (proyecto 4): con el mouse
            encima agranda y las calabazas brincan (parche proyecto 5) */}
        <Link
          href="/"
          className="logo-electro-hub group justify-self-center text-center"
          aria-label="Electro-Hub, ir al inicio"
          onClick={() => setMenuAbierto(false)}
        >
          <span
            aria-hidden="true"
            className="mr-2 inline-block text-sm group-hover:animate-[calabazaBrinca_0.7s_ease-in-out_infinite]"
          >
            🎃
          </span>
          <span
            className={`logo-titulo inline-block font-display text-3xl font-bold tracking-wide transition-all duration-500 group-hover:scale-110 md:text-4xl ${
              menuAbierto
                ? 'text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]'
                : 'text-acento drop-shadow-[0_0_14px_rgba(0,240,255,0.55)]'
            }`}
          >
            Electro-Hub
          </span>
          <span
            aria-hidden="true"
            className="ml-2 inline-block text-sm group-hover:animate-[calabazaBrinca_0.7s_ease-in-out_infinite]"
          >
            🎃
          </span>
          <span
            className={`mt-1 block h-px w-full bg-gradient-to-r from-transparent to-transparent transition-all duration-500 ${
              menuAbierto ? 'via-white/80' : 'via-acento/70'
            }`}
          />
        </Link>

        <div className="flex flex-col items-end justify-self-end">
          <Link
            href="/carrito"
            className={`font-display text-xl font-bold transition-all duration-500 md:text-2xl ${
              menuAbierto
                ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]'
                : 'text-acento-alt hover:text-acento'
            }`}
          >
            Carrito <span aria-hidden="true">🛒</span>
            {unidades > 0 && (
              <span className="ml-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FFD166] px-1.5 font-mono text-xs font-bold text-background shadow-[0_0_10px_rgba(255,209,102,0.7)]">
                {unidades}
              </span>
            )}
          </Link>
          {/* Envío gratis con su raya de neón blanco debajo (parche 2, proyecto 5) */}
          <span className="mt-0.5 text-right">
            <span className="block text-[11px] text-texto-secundario">
              Envío gratis en Colombia
            </span>
            <span
              aria-hidden="true"
              className="mt-0.5 block h-px w-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95),0_0_16px_rgba(255,255,255,0.6)]"
            />
          </span>
        </div>
      </div>

        {/* Divisor difuminado hacia negro: marca el inicio del contenido */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-black to-transparent shadow-[0_2px_10px_rgba(0,0,0,0.9)] blur-[1px]"
        />
      </header>

      {mostrarMenu && <MenuCortina abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />}
    </>
  );
}
