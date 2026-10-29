import type { IArticuloDestacado } from '@/types';

import { ARTICULOS_NUEVOS } from '@/lib/catalogoTecnologia';

// Imagen por defecto del Xiaomi reutilizada por su color "Azul profundo"
const ARTICULO_XIAOMI_DEFAULT =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6-7cdVM-Hl1sIo7gSb1MDfIFi4Xdox48otzq7uE31Q&s=10';

// Vitrina local (prueba1 → proyecto3): datos reales de 3 audífonos.
// Cuando exista BD, estos artículos pasan a Prisma.
const VITRINA_INICIAL: IArticuloDestacado[] = [
  {
    id: 1,
    marca: 'G9000',
    categoria: 'Cascos gamer',
    nombre: 'Audifono Diadema Cascos Gamer G9000 Para Ps4 Y Xbox One',
    imagen:
      'https://exitocol.vtexassets.com/arquivos/ids/6150644/audifono-diadema-cascos-gamer-g9000-para-ps4-y-xbox-one.jpg?v=637490252444230000',
    descripcion:
      'Cascos gamer con diadema y micrófono ajustable. Sonido envolvente, cable con control de volumen y luces LED.',
    compatibilidad:
      'Funciona con PS4, PS5, Xbox One, PC y Nintendo Switch (cable 3.5 mm); también laptops, tablets y celulares con entrada de auriculares.',
    garantia: '5 años',
    precio: 119900,
    precioOriginal: 159900,
    colorMarca: '#FFD166',
    colorAmbiente: '#2E7DFF',
  },
  {
    id: 2,
    marca: 'SONY',
    categoria: 'Audífonos',
    nombre: 'Audífonos Sony Bluetooth Con Función Manos Libres WH-CH520 - Azul',
    imagen: 'https://media.falabella.com/falabellaCO/120300311_01/w=1500,h=1500,fit=cover',
    descripcion:
      'Audífonos inalámbricos con función manos libres, hasta 50 horas de batería y diseño ligero para todo el día.',
    compatibilidad:
      'Bluetooth 5.2: celulares Android, iPhone, tablets y PC. Conecta 2 dispositivos al mismo tiempo (multipoint) y funciona con las apps de Sony.',
    garantia: '2 años',
    precio: 249900,
    colorMarca: '#7DD3FC',
    colorAmbiente: '#3B82F6',
    colores: [
      // El orden define el color por defecto: Azul viene marcado de entrada
      {
        nombre: 'Azul',
        hex: '#3B82F6',
        imagen: 'https://media.falabella.com/falabellaCO/120300311_01/w=1500,h=1500,fit=cover',
      },
      {
        nombre: 'Negro',
        hex: '#2B2F3A',
        imagen: 'https://media.falabella.com/falabellaCO/120300131_01/w=1500,h=1500,fit=cover',
      },
      {
        nombre: 'Rosa',
        hex: '#FF7BB2',
        imagen:
          'https://sony.scene7.com/is/image/sonyglobalsolutions/WH-CH520_Product_intro_Pink_01_M?$productIntroPlatemobile$&fmt=png-alpha',
      },
    ],
  },
  {
    id: 3,
    marca: 'XIAOMI',
    categoria: 'Audífonos',
    nombre: 'Audífonos earbuds Xiaomi Bluetooth Redmi Buds 6 Play',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6-7cdVM-Hl1sIo7gSb1MDfIFi4Xdox48otzq7uE31Q&s=10',
    descripcion:
      'Earbuds ultraligeros con estuche de carga, hasta 36 horas de música y resistencia al agua (IPX4).',
    compatibilidad:
      'Bluetooth 5.4: Android 6.0 o superior e iOS 14 o superior. Se escucha sin instalar apps (la app Xiaomi Earbuds es opcional).',
    garantia: '1 año',
    precio: 129900,
    colorMarca: '#FF9B71',
    colorAmbiente: '#4A4490',
    colores: [
      { nombre: 'Azul profundo', hex: '#4A4490', imagen: ARTICULO_XIAOMI_DEFAULT },
      {
        nombre: 'Azul claro',
        hex: '#7DD3FC',
        imagen:
          'https://exitocol.vtexassets.com/arquivos/ids/26256120/auriculares-xiaomi-redmi-buds-6-play.jpg?v=638715355644030000',
      },
      {
        nombre: 'Blanco',
        hex: '#E4E5EC',
        imagen:
          'https://exitocol.vtexassets.com/arquivos/ids/24632550/auriculares-xiaomi-redmi-buds-6-play.jpg?v=638617718371900000',
      },
    ],
  },
];

// Vitrina completa: la inicial + el catálogo de tecnología (proyecto 6: 60 artículos)
export const ARTICULOS_DESTACADOS: IArticuloDestacado[] = [
  ...VITRINA_INICIAL,
  ...ARTICULOS_NUEVOS,
];

// La ficha no debe mostrar decenas de tarjetas (proyecto 6)
const LIMITE_RELACIONADOS = 4;
const LIMITE_COMPLEMENTARIOS = 6;

export interface AgrupacionCategoria {
  categoria: string;
  articulos: IArticuloDestacado[];
}

// Subdivide la portada por categorías respetando el orden del catálogo (proyecto 3)
export function agruparPorCategoria(): AgrupacionCategoria[] {
  const grupos = new Map<string, IArticuloDestacado[]>();

  for (const articulo of ARTICULOS_DESTACADOS) {
    const lista = grupos.get(articulo.categoria);
    if (lista) {
      lista.push(articulo);
    } else {
      grupos.set(articulo.categoria, [articulo]);
    }
  }

  return [...grupos].map(([categoria, articulos]) => ({ categoria, articulos }));
}

export function buscarArticuloDestacado(id: number): IArticuloDestacado | undefined {
  return ARTICULOS_DESTACADOS.find((articulo) => articulo.id === id);
}

// Quita acentos y pasa a minúsculas: "audi" debe encontrar "Audífonos"
export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Para anclas del menú: "Cascos gamer" → "cascos-gamer"
export function slugificarCategoria(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Emoji que representa cada categoría (parche 1 del proyecto 6)
const EMOJIS_POR_CATEGORIA: Record<string, string> = {
  'Cascos gamer': '🎮',
  Audífonos: '🎧',
  'Mesas de PC': '🪑',
  'Portátiles gamer': '💻',
  Monitores: '🖥️',
  Pantallas: '📲',
  Televisores: '📺',
};

export function emojiDeCategoria(categoria: string): string {
  return EMOJIS_POR_CATEGORIA[categoria] ?? '🎃';
}

// Los ids de la fila "Destacados" de la portada (parche 1 del proyecto 6):
// dos ofertas del 50% más los productos más pedidos de cada sección
const DESTACADOS_POR_IDS = [4, 13, 23, 24, 34, 60];

export function articulosDestacados(): IArticuloDestacado[] {
  const porId = new Map(ARTICULOS_DESTACADOS.map((articulo) => [articulo.id, articulo]));

  return DESTACADOS_POR_IDS.map((id) => porId.get(id)).filter(
    (articulo): articulo is IArticuloDestacado => articulo !== undefined
  );
}

// Regla de colores (proyecto 4): en oferta amarillito, sin promoción azul como Sony
export function colorDeNombre(articulo: IArticuloDestacado): string {
  return calcularDescuento(articulo.precio, articulo.precioOriginal) !== null
    ? '#FFD166'
    : '#7DD3FC';
}

// Misma categoría que el artículo (si no hay, todos: para que siempre haya fila)
export function articulosRelacionados(articulo: IArticuloDestacado): IArticuloDestacado[] {
  const mismaCategoria = ARTICULOS_DESTACADOS.filter(
    (otro) => otro.id !== articulo.id && otro.categoria === articulo.categoria
  );
  if (mismaCategoria.length > 0) return mismaCategoria.slice(0, LIMITE_RELACIONADOS);

  return ARTICULOS_DESTACADOS.filter((otro) => otro.id !== articulo.id).slice(
    0,
    LIMITE_RELACIONADOS
  );
}

// Los artículos de OTRAS categorías, tomando uno por categoría para mostrar variedad
export function articulosComplementarios(articulo: IArticuloDestacado): IArticuloDestacado[] {
  const porCategoria = new Map<string, IArticuloDestacado[]>();

  for (const otro of ARTICULOS_DESTACADOS) {
    if (otro.id === articulo.id || otro.categoria === articulo.categoria) continue;
    const lista = porCategoria.get(otro.categoria);
    if (lista) {
      lista.push(otro);
    } else {
      porCategoria.set(otro.categoria, [otro]);
    }
  }

  const listas = [...porCategoria.values()];
  const seleccionados: IArticuloDestacado[] = [];

  for (let vuelta = 0; seleccionados.length < LIMITE_COMPLEMENTARIOS; vuelta++) {
    let huboNuevo = false;
    for (const lista of listas) {
      const candidato = lista[vuelta];
      if (candidato) {
        seleccionados.push(candidato);
        huboNuevo = true;
      }
      if (seleccionados.length >= LIMITE_COMPLEMENTARIOS) break;
    }
    if (!huboNuevo) break;
  }

  return seleccionados;
}

export function formatearPesos(precio: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio);
}

export function calcularDescuento(precio: number, precioOriginal?: number): number | null {
  if (precioOriginal === undefined || precioOriginal <= precio) return null;
  return Math.round((1 - precio / precioOriginal) * 100);
}

// Texto legible sobre un fondo de color: oscuro sobre colores claros y claro sobre oscuros
export function colorDeTextoSobre(hex: string): string {
  const rojo = parseInt(hex.slice(1, 3), 16);
  const verde = parseInt(hex.slice(3, 5), 16);
  const azul = parseInt(hex.slice(5, 7), 16);
  const luminancia = (0.299 * rojo + 0.587 * verde + 0.114 * azul) / 255;
  return luminancia > 0.6 ? '#1A1B26' : '#F5F5F7';
}
