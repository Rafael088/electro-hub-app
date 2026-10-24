import { render, screen } from '@testing-library/react';

import type { IProducto } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTOS } from '../../prisma/datosCatalogo';

// Producto real del catálogo para no inventar datos que no existen en el seed
function armarProducto(): IProducto {
  return {
    id: 7,
    nombre: PRODUCTOS[6].nombre,
    descripcion: PRODUCTOS[6].descripcion,
    precio: PRODUCTOS[6].precio,
    tags: [...PRODUCTOS[6].tags, 'oferta'],
    imagenes: ['https://placehold.co/600x600/png?text=Mouse'],
    categoria: { id: 4, nombre: PRODUCTOS[6].categoria },
    variantes: [],
  };
}

describe('ProductCard', () => {
  it('muestra nombre y precio en pesos colombianos', () => {
    render(<ProductCard producto={armarProducto()} />);

    expect(screen.getByRole('heading', { name: 'Mouse Inalámbrico Ergonómico' })).toBeInTheDocument();
    expect(screen.getByText(/99\.900/)).toBeInTheDocument();
  });

  it('pinta como máximo dos tags', () => {
    render(<ProductCard producto={armarProducto()} />);

    expect(screen.getByText('ergonómico')).toBeInTheDocument();
    expect(screen.getByText('inalámbrico')).toBeInTheDocument();
    expect(screen.queryByText('oferta')).not.toBeInTheDocument();
  });

  it('enlaza al detalle del producto', () => {
    render(<ProductCard producto={armarProducto()} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/productos/7');
  });

  it('usa una imagen de respaldo cuando el producto no tiene imágenes', () => {
    const sinImagenes = { ...armarProducto(), imagenes: [] };

    render(<ProductCard producto={sinImagenes} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('placehold.co')
    );
  });
});
