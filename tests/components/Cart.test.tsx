import { fireEvent, render, screen } from '@testing-library/react';

import type { ICarritoItem } from '@/types';
import { Cart } from '@/components/Cart';

const items: ICarritoItem[] = [
  {
    productoId: 1,
    varianteId: 11,
    cantidad: 2,
    precio: 50000,
    nombre: 'Mouse Gamer',
    imagen: '',
    condicion: 'Nuevo',
    color: 'Negro',
  },
  {
    productoId: 2,
    varianteId: 21,
    cantidad: 1,
    precio: 149900,
    nombre: 'Audífonos TWS',
    imagen: '',
  },
];

function renderCart(sobrescribir: Partial<Parameters<typeof Cart>[0]> = {}) {
  const props = {
    items,
    onCambiarCantidad: jest.fn(),
    onQuitar: jest.fn(),
    onVaciar: jest.fn(),
    ...sobrescribir,
  };

  return { ...render(<Cart {...props} />), props };
}

describe('Cart', () => {
  it('muestra el estado vacío con enlace al catálogo', () => {
    renderCart({ items: [] });

    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver catálogo' })).toBeInTheDocument();
  });

  it('lista los items y calcula el total con envío gratis', () => {
    renderCart();

    expect(screen.getByText('Mouse Gamer')).toBeInTheDocument();
    expect(screen.getByText('Audífonos TWS')).toBeInTheDocument();
    expect(screen.getByText('Nuevo · Negro')).toBeInTheDocument();
    // El formato es-CO usa espacio no separable: comparamos con expresión regular
    expect(screen.getAllByText(/249\.900/).length).toBeGreaterThan(0);
    expect(screen.getByText('Gratis')).toBeInTheDocument();
  });

  it('pide cambiar la cantidad al pulsar más', () => {
    const { props } = renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Mouse Gamer' }));

    expect(props.onCambiarCantidad).toHaveBeenCalledWith(1, 11, 3);
  });

  it('pide reducir la cantidad al pulsar menos', () => {
    const { props } = renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'Reducir cantidad de Mouse Gamer' }));

    // Los props no cambian en el test: la cantidad pedida siempre es la actual - 1
    expect(props.onCambiarCantidad).toHaveBeenCalledWith(1, 11, 1);
  });

  it('notifica el quitar y el vaciar', () => {
    const { props } = renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'Quitar Mouse Gamer del carrito' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));

    expect(props.onQuitar).toHaveBeenCalledWith(1, 11);
    expect(props.onVaciar).toHaveBeenCalled();
  });
});
