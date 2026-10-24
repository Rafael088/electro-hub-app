import type { IVariante } from '@/types';

// Lógica pura de selección de variantes. El componente solo pinta y delega aquí.

function opcionesUnicas(variantes: IVariante[], campo: 'condicion' | 'color'): string[] {
  const valores = variantes.map((variante) => variante[campo]);
  return [...new Set(valores.filter((valor): valor is string => Boolean(valor)))];
}

export function obtenerCondiciones(variantes: IVariante[]): string[] {
  return opcionesUnicas(variantes, 'condicion');
}

export function obtenerColores(variantes: IVariante[], condicion: string | null): string[] {
  const filtradas = condicion
    ? variantes.filter((variante) => variante.condicion === condicion)
    : variantes;
  return opcionesUnicas(filtradas, 'color');
}

export function buscarVariante(
  variantes: IVariante[],
  condicion: string | null,
  color: string | null
): IVariante | null {
  return (
    variantes.find(
      (variante) => (variante.condicion ?? null) === condicion && (variante.color ?? null) === color
    ) ?? null
  );
}

// Al cambiar la condición conservamos el color si existe; si no, la primera disponible.
export function cambiarCondicion(
  variantes: IVariante[],
  condicion: string,
  varianteActual: IVariante | null
): IVariante | null {
  const color = varianteActual?.color ?? null;
  return (
    buscarVariante(variantes, condicion, color) ??
    variantes.find((variante) => variante.condicion === condicion) ??
    null
  );
}

export function cambiarColor(
  variantes: IVariante[],
  color: string,
  varianteActual: IVariante | null
): IVariante | null {
  const condicion = varianteActual?.condicion ?? null;
  return (
    buscarVariante(variantes, condicion, color) ??
    variantes.find((variante) => variante.color === color) ??
    null
  );
}

export function varianteInicial(variantes: IVariante[]): IVariante | null {
  return variantes[0] ?? null;
}
