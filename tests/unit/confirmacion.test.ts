import { ESTADO_SIN_DATOS, estadoDePago } from '@/lib/confirmacion';

describe('estado de confirmacion de pago', () => {
  it('reconoce el pago aprobado', () => {
    const estado = estadoDePago('approved');

    expect(estado.titulo).toBe('¡Gracias por tu compra!');
    expect(estado.esExito).toBe(true);
  });

  it('trata por igual los estados que MP deja en verificacion', () => {
    expect(estadoDePago('pending')).toEqual(estadoDePago('in_process'));
    expect(estadoDePago('pending').esExito).toBe(false);
  });

  it('avisa cuando el pago fue rechazado', () => {
    expect(estadoDePago('rejected').titulo).toContain('no se completó');
    expect(estadoDePago('rejected').esExito).toBe(false);
  });

  it('usa el estado neutro sin codigo o con uno desconocido', () => {
    expect(estadoDePago(null)).toEqual(ESTADO_SIN_DATOS);
    expect(estadoDePago('')).toEqual(ESTADO_SIN_DATOS);
    expect(estadoDePago('cancelled')).toEqual(ESTADO_SIN_DATOS);
  });
});
