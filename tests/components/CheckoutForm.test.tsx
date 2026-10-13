import { fireEvent, render, screen } from '@testing-library/react';

import type { DatosEnvio } from '@/lib/validacion';
import { CheckoutForm } from '@/components/CheckoutForm';

const COMPLETO: DatosEnvio = {
  nombre: 'Miguel Pérez',
  email: 'miguel@correo.com',
  telefono: '3001234567',
  direccion: 'Calle 10 # 20-30',
  ciudad: 'Bogotá',
  departamento: 'Cundinamarca',
  codigoPostal: '',
};

const CAMPOS_DE_PRUEBA: [string, string][] = [
  ['Nombre completo', COMPLETO.nombre],
  ['Correo electrónico', COMPLETO.email],
  ['Teléfono', COMPLETO.telefono],
  ['Dirección', COMPLETO.direccion],
  ['Ciudad', COMPLETO.ciudad],
  ['Departamento', COMPLETO.departamento],
  ['Código postal', COMPLETO.codigoPostal ?? ''],
];

function renderForm(sobrescribir: Partial<Parameters<typeof CheckoutForm>[0]> = {}) {
  const props = { onConfirmar: jest.fn(), enviando: false, error: null, ...sobrescribir };
  return { ...render(<CheckoutForm {...props} />), props };
}

function escribirCampos() {
  CAMPOS_DE_PRUEBA.forEach(([etiqueta, valor]) => {
    fireEvent.change(screen.getByRole('textbox', { name: new RegExp(etiqueta, 'i') }), {
      target: { value: valor },
    });
  });
}

describe('CheckoutForm', () => {
  it('pide los datos de envío', () => {
    renderForm();

    expect(screen.getByRole('textbox', { name: /nombre/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /correo/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /dirección/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pagar' })).toBeInTheDocument();
  });

  it('muestra los errores y no confirma con el formulario vacío', () => {
    const { props } = renderForm();

    fireEvent.click(screen.getByRole('button', { name: 'Pagar' }));

    expect(props.onConfirmar).not.toHaveBeenCalled();
    expect(screen.getByText('Escribe tu nombre completo')).toBeInTheDocument();
    expect(screen.getByText('Escribe un correo válido')).toBeInTheDocument();
  });

  it('confirma cuando el formulario es válido', () => {
    const { props } = renderForm();

    escribirCampos();
    fireEvent.click(screen.getByRole('button', { name: 'Pagar' }));

    expect(props.onConfirmar).toHaveBeenCalledWith(COMPLETO);
  });

  it('deshabilita el botón mientras envía y muestra el error del servidor', () => {
    renderForm({ enviando: true, error: 'No hay conexión con el servidor' });

    expect(screen.getByRole('button', { name: 'Procesando…' })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent('No hay conexión con el servidor');
  });
});
