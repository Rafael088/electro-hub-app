import { fireEvent, render, screen } from '@testing-library/react';

import type { IVariante } from '@/types';
import { VariantSelector } from '@/components/VariantSelector';

const variantes: IVariante[] = [
  { id: 1, sku: 'A-NUE-NEG', condicion: 'Nuevo', color: 'Negro', stock: 5 },
  { id: 2, sku: 'A-NUE-BLA', condicion: 'Nuevo', color: 'Blanco', stock: 0 },
  { id: 3, sku: 'A-REN-NEG', condicion: 'Renovado', color: 'Negro', stock: 2 },
];

describe('VariantSelector', () => {
  it('pinta condiciones, colores y stock de la variante elegida', () => {
    render(
      <VariantSelector variantes={variantes} variante={variantes[0]} onSeleccionar={jest.fn()} />
    );

    expect(screen.getByRole('button', { name: 'Nuevo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Renovado' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Negro' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Blanco' })).toBeInTheDocument();
    expect(screen.getByText('5 disponibles · SKU A-NUE-NEG')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nuevo' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('avisa cuando la variante está agotada', () => {
    render(
      <VariantSelector variantes={variantes} variante={variantes[1]} onSeleccionar={jest.fn()} />
    );

    expect(screen.getByText('Agotado')).toBeInTheDocument();
  });

  it('notifica la variante al elegir otra condición', () => {
    const onSeleccionar = jest.fn();
    render(
      <VariantSelector
        variantes={variantes}
        variante={variantes[0]}
        onSeleccionar={onSeleccionar}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Renovado' }));

    expect(onSeleccionar).toHaveBeenCalledWith(variantes[2]);
  });

  it('no pinta grupos cuando solo hay una opción', () => {
    render(
      <VariantSelector
        variantes={[variantes[0]]}
        variante={variantes[0]}
        onSeleccionar={jest.fn()}
      />
    );

    expect(screen.queryByText('Condición')).not.toBeInTheDocument();
    expect(screen.queryByText('Color')).not.toBeInTheDocument();
  });
});
