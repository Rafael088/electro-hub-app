import type { IVariante } from '@/types';
import {
  buscarVariante,
  cambiarColor,
  cambiarCondicion,
  obtenerColores,
  obtenerCondiciones,
  varianteInicial,
} from '@/lib/variantes';

const variantes: IVariante[] = [
  { id: 1, sku: 'A-NUE-NEG', condicion: 'Nuevo', color: 'Negro', stock: 5 },
  { id: 2, sku: 'A-NUE-BLA', condicion: 'Nuevo', color: 'Blanco', stock: 0 },
  { id: 3, sku: 'A-REN-NEG', condicion: 'Renovado', color: 'Negro', stock: 2 },
];

describe('variantes', () => {
  it('lista condiciones y colores únicos', () => {
    expect(obtenerCondiciones(variantes)).toEqual(['Nuevo', 'Renovado']);
    expect(obtenerColores(variantes, 'Nuevo')).toEqual(['Negro', 'Blanco']);
    expect(obtenerColores(variantes, 'Renovado')).toEqual(['Negro']);
  });

  it('busca la variante exacta o devuelve null', () => {
    expect(buscarVariante(variantes, 'Nuevo', 'Blanco')?.id).toBe(2);
    expect(buscarVariante(variantes, 'Nuevo', 'Azul')).toBeNull();
  });

  it('conserva el color al cambiar de condición', () => {
    expect(cambiarCondicion(variantes, 'Renovado', variantes[0])?.id).toBe(3);
  });

  it('usa la primera variante disponible si la combinación no existe', () => {
    expect(cambiarCondicion(variantes, 'Renovado', variantes[1])?.id).toBe(3);
    expect(cambiarColor(variantes, 'Blanco', variantes[2])?.id).toBe(2);
  });

  it('toma la primera variante como inicial', () => {
    expect(varianteInicial(variantes)?.id).toBe(1);
    expect(varianteInicial([])).toBeNull();
  });
});
