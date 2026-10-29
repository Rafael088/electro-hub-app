// Contratos del dominio. Se definen aquí antes de implementar cualquier cosa.

export interface ICategoria {
  id: number;
  nombre: string;
  descripcion?: string | null;
}

export interface IVariante {
  id: number;
  sku: string;
  condicion?: string | null;
  color?: string | null;
  stock: number;
}

export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tags: string[];
  imagenes: string[];
  categoria: ICategoria;
  variantes: IVariante[];
}

// Artículo de la vitrina (prueba1): datos locales mientras no hay BD.
export interface IArticuloDestacado {
  id: number;
  marca: string;
  /** Agrupa los productos en la portada */
  categoria: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  /** Color del fondo/decoración: sale del color real de la imagen */
  colorAmbiente: string;
  /** Sistema donde funciona el artículo (proyecto 3) */
  compatibilidad: string;
  /** Garantía formal mostrada bajo el botón del carrito (proyecto 3) */
  garantia: string;
  precio: number;
  /** Color propio del artículo para el título (proyecto 2) */
  colorMarca: string;
  /** Precio antes de la rebaja; solo se muestra si existe */
  precioOriginal?: number;
  /** Variantes de color: cada una trae su imagen (proyecto 2) */
  colores?: IColorArticulo[];
}

export interface IColorArticulo {
  nombre: string;
  hex: string;
  imagen: string;
}

export interface ICarritoItem {
  productoId: number;
  varianteId: number;
  cantidad: number;
  precio: number;
  nombre: string;
  imagen: string;
  condicion?: string;
  color?: string;
  /** Precio antes de la rebaja, para mostrarlo tachado en el carrito */
  precioOriginal?: number;
}

export interface IOrdenItem {
  productoId: number;
  varianteId: number;
  cantidad: number;
  precio: number;
}

export interface IOrden {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigoPostal?: string;
  items: IOrdenItem[];
}

export type EstadoOrden = 'PENDIENTE' | 'PAGADA' | 'ENVIADA' | 'ENTREGADA' | 'CANCELADA';

export interface IOrdenItemCreado extends IOrdenItem {
  id: number;
}

// Lo que el frontend recibe de POST /api/orders.
export interface IOrdenCreada {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigoPostal: string | null;
  estado: EstadoOrden;
  total: number;
  costoEnvio: number;
  items: IOrdenItemCreado[];
}

// Lo que el frontend recibe de POST /api/mercado-pago para abrir Checkout Pro.
export interface IPreferenciaPago {
  preferenceId: string;
  initPoint: string;
}

// Formato común de todas las respuestas de /api
export interface IApiResponse<T> {
  data: T | null;
  error: string | null;
  message: string;
}
