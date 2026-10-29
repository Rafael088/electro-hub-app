'use client';

import { useMemo, useState } from 'react';

import { NubeEspacial } from '@/components/NubeEspacial';
import {
  ARTICULOS_DESTACADOS,
  agruparPorCategoria,
  emojiDeCategoria,
  formatearPesos,
  normalizarTexto,
  slugificarCategoria,
} from '@/lib/catalogoDemo';

interface MenuCortinaProps {
  abierto: boolean;
  onCerrar: () => void;
}

// Cortina a pantalla completa que sube de abajo a arriba (proyecto 4 + parche).
// Contiene buscador en vivo con ayuda y categorías con línea azul.
// Se cierra tocando las 3 rayas de arriba o el fondo borroso de afuera.
export function MenuCortina({ abierto, onCerrar }: MenuCortinaProps) {
  const [busqueda, setBusqueda] = useState('');
  const grupos = useMemo(() => agruparPorCategoria(), []);
  const texto = normalizarTexto(busqueda.trim());

  const categoriasFiltradas = texto
    ? grupos.filter((grupo) => normalizarTexto(grupo.categoria).includes(texto))
    : [];
  const productosFiltrados = texto
    ? ARTICULOS_DESTACADOS.filter((articulo) => normalizarTexto(articulo.nombre).includes(texto))
    : [];
  const sinResultados =
    texto !== '' && categoriasFiltradas.length === 0 && productosFiltrados.length === 0;

  const ayuda =
    texto === ''
      ? 'Escribe el nombre del producto y aparecerá al instante…'
      : sinResultados
        ? `Nada por aquí todavía con "${busqueda.trim()}"…`
        : `${categoriasFiltradas.length + productosFiltrados.length} resultado(s) para "${busqueda.trim()}"`;

  return (
    <div
      role="dialog"
      aria-label="Menú de navegación"
      aria-hidden={!abierto}
      onClick={onCerrar}
      className={`fixed inset-0 z-[45] bg-black/55 backdrop-blur-lg transition-transform duration-500 ease-out ${
        abierto ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      {/* Las opciones: tocarlas NO cierra; el fondo borroso de afuera sí */}
      <div
        onClick={(evento) => evento.stopPropagation()}
        className="flex h-full flex-col px-6 pb-10 pt-32 md:px-16 md:pt-36"
      >
        {/* Lupa: buscador con nube espacial detrás y loguitos en los resultados */}
        <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-acento/40 bg-background/80 p-4 shadow-[0_10px_36px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <NubeEspacial intensa={texto !== ''} />

          <div className="relative">
            <label className="flex items-center gap-3 rounded-xl border border-borde bg-elevado px-3 py-2 focus-within:border-acento">
              <span aria-hidden="true" className="text-acento">
                🔍
              </span>
              <input
                type="search"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Busca un producto por nombre…"
                aria-label="Buscar productos"
                className="w-full bg-transparent font-display text-[15px] text-foreground outline-none placeholder:text-texto-secundario/70"
              />
            </label>
            <p className="mt-3 font-mono text-[11px] italic text-texto-secundario">{ayuda}</p>

            {(categoriasFiltradas.length > 0 || productosFiltrados.length > 0) && (
              <div className="mt-3 max-h-44 space-y-1 overflow-y-auto rounded-lg bg-gradient-to-r from-[#0B1224]/70 to-[#121A33]/50 p-1.5">
                {categoriasFiltradas.map((grupo) => (
                  <a
                    key={grupo.categoria}
                    href={`#categoria-${slugificarCategoria(grupo.categoria)}`}
                    onClick={onCerrar}
                    className="block rounded-lg px-2 py-1.5 font-display text-sm text-[#7DD3FC] transition-colors hover:bg-elevado"
                  >
                    {emojiDeCategoria(grupo.categoria)} {grupo.categoria}
                  </a>
                ))}
                {productosFiltrados.map((articulo) => (
                  <a
                    key={articulo.id}
                    href={`/articulo/${articulo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onCerrar}
                    className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-elevado"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <img
                        src={articulo.imagen}
                        alt=""
                        className="h-8 w-8 shrink-0 rounded-md border border-white/10 object-cover"
                      />
                      <span className="line-clamp-1 font-display text-sm text-foreground">
                        {articulo.nombre}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-acento">
                      {formatearPesos(articulo.precio)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categorías: izquierda a derecha con línea azul bajo el texto */}
        <div className="mt-6 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-texto-secundario">
            Categorías
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {grupos.map((grupo) => (
              <a
                key={grupo.categoria}
                href={`#categoria-${slugificarCategoria(grupo.categoria)}`}
                onClick={onCerrar}
                className="border-b-2 border-[#60A5FA] pb-1 text-sm text-foreground shadow-[0_5px_16px_-4px_rgba(96,165,250,0.95)] transition-all hover:text-[#93C5FD] hover:shadow-[0_5px_20px_-2px_rgba(147,197,253,0.95)]"
              >
                {grupo.categoria}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
