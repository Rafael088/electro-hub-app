import { Resend } from 'resend';

import type { IOrdenCreada, IOrdenItemCreado } from '@/types';

import { ErrorDeOrden } from '@/lib/ordenes';
import { formatearPrecio } from '@/lib/format';
import { prisma } from '@/lib/prisma';

const ENTIDADES_HTML: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

// Los datos de la orden los escribe el comprador: el HTML del email se arma
// escapándolos para que no inyecte etiquetas en el mensaje.
function escaparHtml(texto: string): string {
  return texto.replace(/[&<>"']/g, (caracter) => ENTIDADES_HTML[caracter] ?? caracter);
}

function crearClienteEmail(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new ErrorDeOrden('Resend no está configurado en el servidor', 503);
  }

  return new Resend(apiKey);
}

async function construirFilaDeProductos(items: IOrdenItemCreado[]): Promise<string> {
  const productos = await prisma.producto.findMany({
    where: { id: { in: [...new Set(items.map((item) => item.productoId))] } },
    select: { id: true, nombre: true },
  });
  const nombres = new Map(productos.map((producto) => [producto.id, producto.nombre]));

  return items
    .map((item) => {
      const nombre = escaparHtml(nombres.get(item.productoId) ?? `Producto ${item.productoId}`);
      const subtotal = formatearPrecio(item.precio * item.cantidad);
      return `<tr><td>${nombre} · variante ${item.varianteId}</td><td>${item.cantidad}</td><td>${subtotal}</td></tr>`;
    })
    .join('');
}

async function construirHtmlConfirmacion(orden: IOrdenCreada): Promise<string> {
  const filas = await construirFilaDeProductos(orden.items);
  const destino = [orden.direccion, orden.ciudad, orden.departamento].map(escaparHtml).join(', ');

  return `
    <h1>¡Gracias, ${escaparHtml(orden.nombre)}!</h1>
    <p>Tu pedido <strong>#${orden.id}</strong> fue confirmado. Envío incluido, solo Colombia.</p>
    <table cellpadding="6" cellspacing="0" border="1">
      <tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th></tr>
      ${filas}
      <tr><th colspan="2">Total</th><th>${formatearPrecio(orden.total)}</th></tr>
    </table>
    <p>Entrega en: ${destino}</p>
  `;
}

export async function enviarConfirmacionDeOrden(orden: IOrdenCreada): Promise<void> {
  const html = await construirHtmlConfirmacion(orden);

  const { error } = await crearClienteEmail().emails.send({
    from: process.env.RESEND_FROM ?? 'Electro-Hub <onboarding@resend.dev>',
    to: orden.email,
    subject: `Confirmación de tu pedido #${orden.id}`,
    html,
  });

  if (error) {
    throw new ErrorDeOrden(`Resend rechazó el email: ${error.message}`, 502);
  }
}
