import type { DatosEnvio } from '@/lib/validacion';
import { DATOS_VACIOS, erroresDeEnvio, esEnvioValido } from '@/lib/validacion';

const VALIDO: DatosEnvio = {
  nombre: 'Miguel Pérez',
  email: 'miguel@correo.com',
  telefono: '3001234567',
  direccion: 'Calle 10 # 20-30',
  ciudad: 'Bogotá',
  departamento: 'Cundinamarca',
  codigoPostal: '110111',
};

describe('validacion de envío', () => {
  it('acepta un formulario completo', () => {
    expect(erroresDeEnvio(VALIDO)).toEqual({});
    expect(esEnvioValido(VALIDO)).toBe(true);
  });

  it('marca cada campo obligatorio vacío', () => {
    const errores = erroresDeEnvio(DATOS_VACIOS);

    expect(Object.keys(errores).sort()).toEqual([
      'ciudad',
      'departamento',
      'direccion',
      'email',
      'nombre',
      'telefono',
    ]);
  });

  it('rechaza un correo y un teléfono inválidos', () => {
    const errores = erroresDeEnvio({ ...VALIDO, email: 'no-es-correo', telefono: '12ab' });

    expect(errores.email).toBe('Escribe un correo válido');
    expect(errores.telefono).toBe('Teléfono colombiano de 7 a 10 dígitos');
  });

  it('recorta los espacios sobrantes', () => {
    const errores = erroresDeEnvio({ ...VALIDO, nombre: '   Miguel Pérez   ' });

    expect(errores).toEqual({});
    expect(esEnvioValido({ ...VALIDO, nombre: '  M' })).toBe(false);
  });

  it('permite el código postal vacío porque es opcional', () => {
    expect(erroresDeEnvio({ ...VALIDO, codigoPostal: '' })).toEqual({});
    expect(erroresDeEnvio({ ...VALIDO, codigoPostal: undefined })).toEqual({});
  });
});
