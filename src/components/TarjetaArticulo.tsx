'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { calcularDescuento, colorDeNombre, formatearPesos } from '@/lib/catalogoDemo';
import type { IArticuloDestacado } from '@/types';

interface TarjetaArticuloProps {
  articulo: IArticuloDestacado;
}

// Se abre en pestaña nueva para que el usuario nunca pierda el catálogo.
// Proyecto 5: la tarjeta se agranda un poco al entrar en pantalla (bajar/subir)
// y la imagen crece con el mouse encima. Formal y minimalista.
export function TarjetaArticulo({ articulo }: TarjetaArticuloProps) {
  const referencia = useRef<HTMLAnchorElement>(null);
  const [enPantalla, setEnPantalla] = useState(false);

  useEffect(() => {
    const nodo = referencia.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => setEnPantalla(entrada.isIntersecting),
      { threshold: 0.2 }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const descuento = calcularDescuento(articulo.precio, articulo.precioOriginal);
  const colorLetra = colorDeNombre(articulo);

  return (
    <Link
      ref={referencia}
      href={`/articulo/${articulo.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group w-64 shrink-0 rounded-2xl border border-black/60 bg-elevado/90 p-3 shadow-[0_0_16px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-acento/60 ${
        enPantalla ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={articulo.imagen}
          alt={articulo.nombre}
          className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {descuento !== null && (
          <span className="absolute left-2 top-2 rounded-md bg-[#FFD166] px-2 py-1 font-mono text-xs font-bold text-background">
            -{descuento}%
          </span>
        )}
      </div>

      <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-texto-secundario">
        {articulo.marca}
      </p>
      <h2
        className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold transition-colors group-hover:brightness-125"
        style={{ color: colorLetra }}
      >
        {articulo.nombre}
      </h2>

      <div className="mt-2 flex items-baseline gap-2">
        <p
          className={`font-mono text-lg font-bold ${descuento !== null ? 'text-[#FFD166]' : 'text-acento'}`}
        >
          {formatearPesos(articulo.precio)}
        </p>
        {articulo.precioOriginal !== undefined && (
          <p className="font-mono text-xs text-texto-secundario line-through">
            {formatearPesos(articulo.precioOriginal)}
          </p>
        )}
      </div>
    </Link>
  );
}
