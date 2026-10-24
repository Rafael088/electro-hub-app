'use client';

import { useReducer, useSyncExternalStore } from 'react';

import type { ICarritoItem } from '@/types';
import {
  agregarItem,
  actualizarCantidad,
  calcularTotalCarrito,
  leerCarritoCacheado,
  limpiarCarrito,
  quitarItem,
} from '@/lib/cart';

export interface Carrito {
  items: ICarritoItem[];
  total: number;
  agregar: (item: ICarritoItem) => void;
  cambiarCantidad: (productoId: number, varianteId: number, cantidad: number) => void;
  quitar: (productoId: number, varianteId: number) => void;
  vaciar: () => void;
}

// En el servidor no hay carrito: la referencia debe ser siempre la misma
const itemsEnServidor: ICarritoItem[] = [];

function leerEnServidor(): ICarritoItem[] {
  return itemsEnServidor;
}

// El evento `storage` llega solo a las otras pestañas; React re-lee al avisar
function suscribir(avisar: () => void): () => void {
  window.addEventListener('storage', avisar);
  return () => window.removeEventListener('storage', avisar);
}

export function useCarrito(): Carrito {
  // Las escrituras de esta pestaña no disparan `storage`, así que forzamos la lectura
  const [, forzarLectura] = useReducer((contador: number) => contador + 1, 0);

  const items = useSyncExternalStore(suscribir, leerCarritoCacheado, leerEnServidor);
  const total = calcularTotalCarrito(items);

  const agregar = (item: ICarritoItem): void => {
    agregarItem(item);
    forzarLectura();
  };

  const cambiarCantidad = (productoId: number, varianteId: number, cantidad: number): void => {
    actualizarCantidad(productoId, varianteId, cantidad);
    forzarLectura();
  };

  const quitar = (productoId: number, varianteId: number): void => {
    quitarItem(productoId, varianteId);
    forzarLectura();
  };

  const vaciar = (): void => {
    limpiarCarrito();
    forzarLectura();
  };

  return { items, total, agregar, cambiarCantidad, quitar, vaciar };
}
