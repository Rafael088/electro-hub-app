import type { ICarritoItem } from '@/types';

export const CART_KEY = 'electrohub-cart';
export const CART_EVENT = 'electrohub-carrito-actualizado';

function guardarCarrito(carrito: ICarritoItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  // Avisa a los componentes de esta pestaña (el header, el carrito, etc.)
  window.dispatchEvent(new Event(CART_EVENT));
}

function esMismoItem(item: ICarritoItem, productoId: number, varianteId: number): boolean {
  return item.productoId === productoId && item.varianteId === varianteId;
}

export function obtenerCarrito(): ICarritoItem[] {
  // En el servidor no existe localStorage
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? (JSON.parse(cart) as ICarritoItem[]) : [];
}

// React compara las lecturas por identidad: si cada llamada devuelve un array
// nuevo, useSyncExternalStore entra en bucle de renders. Aquí solo cambiamos la
// referencia cuando cambió lo guardado en localStorage.
let cache = { crudo: null as string | null, items: [] as ICarritoItem[] };

export function leerCarritoCacheado(): ICarritoItem[] {
  if (typeof window === 'undefined') return cache.items;
  const crudo = localStorage.getItem(CART_KEY);
  if (crudo !== cache.crudo) {
    cache = { crudo, items: crudo ? (JSON.parse(crudo) as ICarritoItem[]) : [] };
  }
  return cache.items;
}

export function agregarItem(nuevoItem: ICarritoItem): void {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) =>
    esMismoItem(item, nuevoItem.productoId, nuevoItem.varianteId)
  );

  if (existente) {
    existente.cantidad += nuevoItem.cantidad;
  } else {
    carrito.push(nuevoItem);
  }

  guardarCarrito(carrito);
}

export function quitarItem(productoId: number, varianteId: number): void {
  const filtrado = obtenerCarrito().filter(
    (item) => !esMismoItem(item, productoId, varianteId)
  );
  guardarCarrito(filtrado);
}

export function actualizarCantidad(productoId: number, varianteId: number, cantidad: number): void {
  if (cantidad <= 0) {
    quitarItem(productoId, varianteId);
    return;
  }
  const carrito = obtenerCarrito().map((item) =>
    esMismoItem(item, productoId, varianteId) ? { ...item, cantidad } : item
  );
  guardarCarrito(carrito);
}

export function limpiarCarrito(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event(CART_EVENT));
}

export function calcularTotalCarrito(carrito: ICarritoItem[]): number {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}
