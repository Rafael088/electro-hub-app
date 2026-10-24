// Traduce el `status` que Mercado Pago devuelve en el back_url a algo que el
// cliente entienda. Códigos oficiales: approved, pending, in_process, rejected.

export interface EstadoPago {
  titulo: string;
  mensaje: string;
  esExito: boolean;
}

const EN_REVISION: EstadoPago = {
  titulo: 'Pago en revisión',
  mensaje: 'Mercado Pago está verificando tu pago. Te avisamos por correo cuando se confirme.',
  esExito: false,
};

const ESTADOS_PAGO: Record<string, EstadoPago | undefined> = {
  approved: {
    titulo: '¡Gracias por tu compra!',
    mensaje: 'Tu pago fue aprobado. Te enviamos la confirmación a tu correo.',
    esExito: true,
  },
  pending: EN_REVISION,
  in_process: EN_REVISION,
  rejected: {
    titulo: 'El pago no se completó',
    mensaje: 'Mercado Pago rechazó el pago. Tu carrito sigue intacto para reintentar.',
    esExito: false,
  },
};

// Acceso directo a la URL o código que aún no reconocemos
export const ESTADO_SIN_DATOS: EstadoPago = {
  titulo: 'Recibimos tu pedido',
  mensaje: 'Te avisamos por correo cuando el pago quede confirmado.',
  esExito: false,
};

export function estadoDePago(codigo: string | null): EstadoPago {
  if (codigo === null) return ESTADO_SIN_DATOS;
  return ESTADOS_PAGO[codigo] ?? ESTADO_SIN_DATOS;
}
