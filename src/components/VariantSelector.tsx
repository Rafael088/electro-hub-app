'use client';

import type { IVariante } from '@/types';
import {
  cambiarColor,
  cambiarCondicion,
  obtenerColores,
  obtenerCondiciones,
} from '@/lib/variantes';

interface VariantSelectorProps {
  variantes: IVariante[];
  variante: IVariante | null;
  onSeleccionar: (variante: IVariante) => void;
}

interface GrupoOpcionesProps {
  titulo: string;
  opciones: string[];
  seleccion: string | null;
  onElegir: (opcion: string) => void;
}

const CLASE_BASE =
  'rounded border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-acento';

function GrupoOpciones({ titulo, opciones, seleccion, onElegir }: GrupoOpcionesProps) {
  // Con una sola opción no hay nada que elegir
  if (opciones.length <= 1) return null;

  return (
    <fieldset className="mt-4">
      <legend className="text-sm text-texto-secundario">{titulo}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {opciones.map((opcion) => {
          const activa = seleccion === opcion;
          return (
            <button
              key={opcion}
              type="button"
              aria-pressed={activa}
              onClick={() => onElegir(opcion)}
              className={`${CLASE_BASE} ${
                activa
                  ? 'border-acento bg-background text-acento'
                  : 'border-borde text-texto-secundario hover:border-acento hover:text-acento'
              }`}
            >
              {opcion}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function EstadoStock({ variante }: { variante: IVariante | null }) {
  if (variante === null)
    return <p className="mt-4 text-sm text-texto-secundario">Elige una opción</p>;
  if (variante.stock <= 0) return <p className="mt-4 text-sm text-error">Agotado</p>;
  return (
    <p className="mt-4 text-sm text-exito">
      {variante.stock} disponibles · SKU {variante.sku}
    </p>
  );
}

export function VariantSelector({ variantes, variante, onSeleccionar }: VariantSelectorProps) {
  if (variantes.length === 0) {
    return <p className="mt-4 text-sm text-texto-secundario">Este producto no tiene variantes.</p>;
  }

  return (
    <div>
      <GrupoOpciones
        titulo="Condición"
        opciones={obtenerCondiciones(variantes)}
        seleccion={variante?.condicion ?? null}
        onElegir={(condicion) => {
          const elegida = cambiarCondicion(variantes, condicion, variante);
          if (elegida) onSeleccionar(elegida);
        }}
      />

      <GrupoOpciones
        titulo="Color"
        opciones={obtenerColores(variantes, variante?.condicion ?? null)}
        seleccion={variante?.color ?? null}
        onElegir={(color) => {
          const elegida = cambiarColor(variantes, color, variante);
          if (elegida) onSeleccionar(elegida);
        }}
      />

      <EstadoStock variante={variante} />
    </div>
  );
}
