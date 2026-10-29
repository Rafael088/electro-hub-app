'use client';

import { useState } from 'react';

import { AvisoCompra } from '@/components/AvisoCompra';
import { EncabezadoTienda } from '@/components/EncabezadoTienda';
import { EspacioOrbes } from '@/components/EspacioOrbes';
import { TarjetaArticulo } from '@/components/TarjetaArticulo';
import {
  articulosComplementarios,
  articulosRelacionados,
  calcularDescuento,
  colorDeNombre,
  colorDeTextoSobre,
  formatearPesos,
} from '@/lib/catalogoDemo';
import { useCarrito } from '@/hooks/useCarrito';
import type { IArticuloDestacado, ICarritoItem } from '@/types';

interface DetalleArticuloProps {
  articulo: IArticuloDestacado;
}

interface LucesFondoProps {
  tema: string;
}

// Luces opacadas y lentas (amigables de noche) detrás del producto;
// el color sale de la imagen real del artículo o del color elegido.
// Sin franjas al fondo: la pantalla se mantiene oscurita de punta a punta.
function LucesFondo({ tema }: LucesFondoProps) {
  const capa = 'absolute rounded-full blur-[90px] transition-colors duration-700';
  const filtro = { backgroundColor: tema, filter: 'saturate(0.7) brightness(0.8)' };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className={`${capa} -top-6 right-4 h-72 w-72 opacity-[0.16] [animation:luzFlota_14s_ease-in-out_infinite_alternate]`}
        style={filtro}
      />
      <div
        className={`${capa} bottom-40 left-1/4 h-64 w-64 opacity-[0.12] [animation:luzFlota_18s_ease-in-out_infinite_alternate] [animation-delay:-6s]`}
        style={filtro}
      />
    </div>
  );
}

interface PanelProps {
  titulo: string;
  children: React.ReactNode;
}

// Panel formal: fondo oscuro difuminado para que los textos se lean siempre
function Panel({ titulo, children }: PanelProps) {
  return (
    <div className="rounded-2xl border border-borde/40 bg-black/45 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-texto-secundario">
        {titulo}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// La vitrina no tiene variantes en la BD: usamos id por artículo + color para
// que cada color sea una línea distinta en el carrito.
function convertirACarritoItem(
  articulo: IArticuloDestacado,
  indiceColor: number,
  imagen: string
): ICarritoItem {
  return {
    productoId: articulo.id,
    varianteId: articulo.id * 100 + indiceColor,
    cantidad: 1,
    precio: articulo.precio,
    nombre: articulo.nombre,
    imagen,
    color: articulo.colores?.[indiceColor]?.nombre,
    precioOriginal: articulo.precioOriginal,
  };
}

export function DetalleArticulo({ articulo }: DetalleArticuloProps) {
  const { agregar } = useCarrito();
  const colores = articulo.colores ?? [];
  const [indiceColor, setIndiceColor] = useState(0);
  const [avisoVisible, setAvisoVisible] = useState(false);
  const [agregado, setAgregado] = useState(false);

  const colorActual = colores[indiceColor];
  const imagen = colorActual?.imagen ?? articulo.imagen;
  const tema = colorActual?.hex ?? articulo.colorAmbiente;
  const descuento = calcularDescuento(articulo.precio, articulo.precioOriginal);
  const colorTitulo = colorDeNombre(articulo);
  const relacionados = articulosRelacionados(articulo);
  const complementarios = articulosComplementarios(articulo);

  const manejarAgregar = (): void => {
    agregar(convertirACarritoItem(articulo, indiceColor, imagen));
    setAgregado(true);
    setAvisoVisible(true);
  };

  return (
    <main className="flex-1">
      <EncabezadoTienda />

      <section className="relative isolate grid gap-8 px-4 pb-16 md:grid-cols-2 md:px-10">
        <LucesFondo tema={tema} />

        {/* Columna izquierda: la imagen con su compatibilidad debajo y separada */}
        <div className="space-y-6">
          <img
            src={imagen}
            alt={`${articulo.nombre} — ${colorActual?.nombre ?? 'principal'}`}
            className="w-full max-w-xl rounded-2xl border border-borde object-cover transition-shadow duration-500"
            style={{ boxShadow: `0 0 44px ${tema}44` }}
          />
          <Panel titulo="Compatibilidad">
            <p className="text-sm leading-relaxed text-foreground">{articulo.compatibilidad}</p>
          </Panel>
        </div>

        <div className="space-y-4 md:mt-12">
          <Panel titulo={`${articulo.marca} · ${articulo.categoria}`}>
            <h1
              className="font-display text-3xl font-bold transition-colors duration-500"
              style={{ color: colorTitulo }}
            >
              {articulo.nombre}
            </h1>
            <div className="mt-3 flex items-baseline gap-3">
              <p
                className={`font-mono text-3xl font-bold ${descuento !== null ? 'text-[#FFD166]' : 'text-acento'}`}
              >
                {formatearPesos(articulo.precio)}
              </p>
              {articulo.precioOriginal !== undefined && (
                <p className="font-mono text-lg text-texto-secundario line-through">
                  {formatearPesos(articulo.precioOriginal)}
                </p>
              )}
              {descuento !== null && (
                <span className="rounded-md bg-[#FFD166] px-2 py-1 font-mono text-xs font-bold text-background">
                  -{descuento}%
                </span>
              )}
            </div>
          </Panel>

          <Panel titulo="Descripción">
            <p className="text-sm leading-relaxed text-texto-secundario">{articulo.descripcion}</p>
            {colores.length === 0 && (
              <p className="mt-3 text-xs italic text-texto-secundario/80">
                Este artículo no tiene más colores.
              </p>
            )}
          </Panel>

          {colores.length > 0 && (
            <Panel titulo="Color disponible">
              <div className="flex gap-5">
                {colores.map((color, i) => (
                  <button
                    key={color.nombre}
                    type="button"
                    aria-label={`Elegir color ${color.nombre}`}
                    aria-pressed={i === indiceColor}
                    onClick={() => setIndiceColor(i)}
                    className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
                  >
                    <span
                      className="h-9 w-9 rounded-full border-2"
                      style={{
                        backgroundColor: color.hex,
                        borderColor: i === indiceColor ? color.hex : '#4B4E5E',
                        boxShadow:
                          i === indiceColor
                            ? `0 0 0 3px #1A1B26, 0 0 0 5px ${color.hex}`
                            : 'none',
                      }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: i === indiceColor ? color.hex : '#C5C8D4' }}
                    >
                      {color.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </Panel>
          )}

          <button
            type="button"
            onClick={manejarAgregar}
            className="w-full rounded-xl px-6 py-4 font-display text-xl font-bold transition duration-500 hover:brightness-125"
            style={{
              backgroundColor: tema,
              color: colorDeTextoSobre(tema),
              boxShadow: `0 0 28px ${tema}66`,
            }}
          >
            Agregar al carrito
          </button>

          <div className="flex items-center justify-between rounded-xl border border-borde/40 bg-black/45 px-5 py-3 backdrop-blur-md">
            <p className="text-sm text-texto-secundario">
              <span aria-hidden="true">🛡️</span> Garantía de{' '}
              <span className="font-semibold text-foreground">{articulo.garantia}</span>
            </p>
            <p className="text-xs text-texto-secundario">Envío gratis en Colombia</p>
          </div>

          {agregado && (
            <p className="text-center text-sm text-exito md:text-left">
              ✓ Este artículo ya está en tu carrito
            </p>
          )}
        </div>
      </section>

      {/* Relacionados sobre un "espacio" colorido que se oscurece al bajar (proyecto 5) */}
      <section
        className="relative overflow-hidden px-4 pb-24 md:px-10"
        style={{
          background:
            'linear-gradient(180deg, #1A1B26 0%, #141524 30%, #0D0E18 65%, #07080E 100%)',
        }}
      >
        <EspacioOrbes />

        <div className="relative">
          <p className="text-xs uppercase tracking-[0.35em] text-[#FFD166]">
            <span aria-hidden="true" className="mr-1 normal-case">
              🎃
            </span>
            Productos relacionados
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            {relacionados.map((relacionado) => (
              <TarjetaArticulo key={relacionado.id} articulo={relacionado} />
            ))}
          </div>

          {complementarios.length > 0 && (
            <>
              <hr className="my-10 border-t border-dashed border-borde/50" />
              <p className="text-xs uppercase tracking-[0.35em] text-texto-secundario">
                También te puede gustar
              </p>
              <div className="mt-4 flex flex-wrap gap-5">
                {complementarios.map((complementario) => (
                  <TarjetaArticulo key={complementario.id} articulo={complementario} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {avisoVisible && <AvisoCompra onSeguirComprando={() => setAvisoVisible(false)} />}
    </main>
  );
}
