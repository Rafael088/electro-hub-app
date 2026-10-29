import type { IArticuloDestacado, IColorArticulo } from '@/types';

// Catálogo de tecnología (proyecto 6): 6 categorías nuevas × 10 artículos cada una.
// Imágenes reales verificadas (Amazon, Falabella, Mercado Libre y tiendas oficiales).
// Precios, descuentos y garantías provisionales a la espera de los datos reales.

interface IDatosTecnologia {
  id: number;
  marca: string;
  categoria: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  compatibilidad: string;
  precio: number;
  colorMarca: string;
  colorAmbiente: string;
  precioOriginal?: number;
  colores?: IColorArticulo[];
  garantia?: string;
}

// Garantía provisional por marca; se puede pisar artículo por artículo
const GARANTIAS_POR_MARCA: Record<string, string> = {
  SONY: '2 años',
  JBL: '1 año',
  HYPERX: '2 años',
  SOUNDCORE: '18 meses',
  BOSE: '2 años',
  MARSHALL: '1 año',
  JABRA: '2 años',
  XIAOMI: '1 año',
  EDIFIER: '1 año',
  CORSAIR: '2 años',
  SECRETLAB: '5 años',
  NORDIC: '1 año',
  COUGAR: '1 año',
  FLEXISPOT: '3 años',
  AROZZI: '1 año',
  FEZIBO: '1 año',
  HOMALL: '1 año',
  SHW: '1 año',
  ASUS: '2 años',
  LENOVO: '1 año',
  HP: '1 año',
  ACER: '2 años',
  MSI: '2 años',
  DELL: '3 años',
  AOC: '3 años',
  BENQ: '3 años',
  VIEWSONIC: '3 años',
  PHILIPS: '2 años',
  LG: '1 año',
  TCL: '1 año',
  HISENSE: '1 año',
};

function crearArticulo(datos: IDatosTecnologia): IArticuloDestacado {
  const { garantia, ...resto } = datos;
  return {
    ...resto,
    garantia: garantia ?? GARANTIAS_POR_MARCA[datos.marca] ?? '1 año',
  };
}

const AUDIFONOS: IArticuloDestacado[] = [
  crearArticulo({
    id: 4,
    marca: 'SONY',
    categoria: 'Audífonos',
    nombre: 'Audífonos Sony Inalámbricos Con Cancelación De Ruido WH-1000XM5',
    imagen: 'https://m.media-amazon.com/images/I/511c23mDjoL._AC_.jpg',
    descripcion:
      'Tope de línea con cancelación de ruido adaptativa, hasta 30 horas de batería y llamadas nítidas con 8 micrófonos.',
    compatibilidad:
      'Bluetooth 5.3: Android, iPhone, tablets y PC. App Sony Headphones Connect, asistentes de voz y conexión multipoint a 2 dispositivos.',
    precio: 1399900,
    precioOriginal: 1699900,
    colorMarca: '#F5F5F7',
    colorAmbiente: '#2B2F3A',
    colores: [
      {
        nombre: 'Negro',
        hex: '#2B2F3A',
        imagen: 'https://m.media-amazon.com/images/I/511c23mDjoL._AC_.jpg',
      },
      {
        nombre: 'Plata',
        hex: '#D6D3CD',
        imagen: 'https://m.media-amazon.com/images/I/31Q+vWIYPbL._SL500_.jpg',
      },
    ],
  }),
  crearArticulo({
    id: 5,
    marca: 'JBL',
    categoria: 'Audífonos',
    nombre: 'Audífonos JBL Tune 770NC Bluetooth Con Cancelación De Ruido',
    imagen: 'https://m.media-amazon.com/images/I/51V1bf76cML._AC_SL1500_.jpg',
    descripcion:
      'Sonido JBL Pure Bass, cancelación de ruido y hasta 70 horas de reproducción con la carga rápida de 5 minutos.',
    compatibilidad:
      'Bluetooth 5.3 con multipoint: celulares Android e iPhone, tablets y PC. App JBL Headphones para personalizar el sonido.',
    precio: 399900,
    precioOriginal: 499900,
    colorMarca: '#FF6F00',
    colorAmbiente: '#2F5FBF',
    colores: [
      {
        nombre: 'Negro',
        hex: '#1D1D1F',
        imagen: 'https://m.media-amazon.com/images/I/51V1bf76cML._AC_SL1500_.jpg',
      },
      {
        nombre: 'Azul',
        hex: '#2F5FBF',
        imagen: 'https://m.media-amazon.com/images/I/51Tga8wwK4L._AC_.jpg',
      },
      {
        nombre: 'Blanco',
        hex: '#EDEDEA',
        imagen: 'https://jbl-harman.in.ua/i/product/1198/6480cf49efb5a.png',
      },
    ],
  }),
  crearArticulo({
    id: 6,
    marca: 'HYPERX',
    categoria: 'Audífonos',
    nombre: 'Audífonos Gamer HyperX Cloud II Con Diadema Y Micrófono',
    imagen: 'https://m.media-amazon.com/images/I/71pz2njkNRL._AC_.jpg',
    descripcion:
      'Diadema de espuma y almohadillas de cuero sintético, sonido envolvente 7.1 virtual por USB y micrófono desmontable.',
    compatibilidad:
      'Cable USB y 3.5 mm: PC, PS5, PS4, Xbox, Nintendo Switch, laptops y celulares con entrada de auriculares.',
    precio: 549900,
    precioOriginal: 649900,
    colorMarca: '#E2231A',
    colorAmbiente: '#2B2B33',
    colores: [
      {
        nombre: 'Negro',
        hex: '#2B2B33',
        imagen: 'https://m.media-amazon.com/images/I/71pz2njkNRL._AC_.jpg',
      },
      {
        nombre: 'Blanco',
        hex: '#E7E7EC',
        imagen:
          'https://media.karousell.com/media/photos/products/2022/9/7/hyperx_cloud_2ii_whitepink_1662537471_c1b28994_progressive.jpg',
      },
    ],
  }),
  crearArticulo({
    id: 7,
    marca: 'SOUNDCORE',
    categoria: 'Audífonos',
    nombre: 'Audífonos Anker Soundcore Q30 Con Cancelación Híbrida',
    imagen: 'https://m.media-amazon.com/images/I/61Lj9mFiNrL._AC_SL1500_.jpg',
    descripcion:
      'Cancelación de ruido híbrida con modos personalizables, hasta 40 horas de batería y modo transparidad.',
    compatibilidad:
      'Bluetooth 5.0: Android, iPhone, tablets y PC; también modo cableado 3.5 mm con la app Soundcore.',
    precio: 279900,
    precioOriginal: 349900,
    colorMarca: '#00A0E9',
    colorAmbiente: '#232629',
  }),
  crearArticulo({
    id: 8,
    marca: 'BOSE',
    categoria: 'Audífonos',
    nombre: 'Audífonos Bose QuietComfort 45 Inalámbricos',
    imagen: 'https://m.media-amazon.com/images/I/51smLBpimbL._AC_SL1347_.jpg',
    descripcion:
      'Cancelación de ruido de clase mundial, hasta 24 horas de batería y el cómodo ajuste clásico de Bose.',
    compatibilidad:
      'Bluetooth 5.1 con multipoint y app Bose Music; funciona con Android, iPhone, tablets y PC.',
    precio: 1199900,
    colorMarca: '#F5F5F7',
    colorAmbiente: '#2A2C31',
  }),
  crearArticulo({
    id: 9,
    marca: 'MARSHALL',
    categoria: 'Audífonos',
    nombre: 'Audífonos Marshall Major IV Bluetooth',
    imagen: 'https://m.media-amazon.com/images/I/61Fgz0+ns8L._AC_.jpg',
    descripcion:
      'Diseño icónico de la marca, más de 40 horas de batería, carga inalámbrica y controles rotatorios en la orejera.',
    compatibilidad:
      'Bluetooth 5.0 y entrada 3.5 mm: celulares, tablets, PC y consolas con jack de auriculares.',
    precio: 599900,
    precioOriginal: 749900,
    colorMarca: '#E8E8E8',
    colorAmbiente: '#26262B',
  }),
  crearArticulo({
    id: 10,
    marca: 'JABRA',
    categoria: 'Audífonos',
    nombre: 'Audífonos Jabra Elite 4 Con Cancelación De Ruido',
    imagen: 'https://m.media-amazon.com/images/I/51Tn8wW7ufL._AC_SL1400_.jpg',
    descripcion:
      'Earbuds cómodos con ANC, hasta 28 horas con el estuche y certificación para videollamadas nítidas.',
    compatibilidad:
      'Bluetooth 5.2 con Google Fast Pair: Android, iPhone, tablets y PC (multipoint incluido).',
    precio: 449900,
    precioOriginal: 539900,
    colorMarca: '#FF7900',
    colorAmbiente: '#3A3F47',
  }),
  crearArticulo({
    id: 11,
    marca: 'XIAOMI',
    categoria: 'Audífonos',
    nombre: 'Audífonos Xiaomi Redmi Buds 5 Con Cancelación De Ruido',
    imagen: 'https://m.media-amazon.com/images/I/6171d8ts-kL._AC_.jpg',
    descripcion:
      'Earbuds con cancelación de ruido de 46 dB, hasta 10 horas por carga (38 con estuche) y resistencia IP54.',
    compatibilidad:
      'Bluetooth 5.3: Android 6.0 o superior e iOS 13 o superior; app Xiaomi Earbuds opcional.',
    precio: 159900,
    precioOriginal: 199900,
    colorMarca: '#FF6900',
    colorAmbiente: '#262A33',
  }),
  crearArticulo({
    id: 12,
    marca: 'EDIFIER',
    categoria: 'Audífonos',
    nombre: 'Audífonos Edifier W820NB Plus Con Cancelación De Ruido',
    imagen: 'https://m.media-amazon.com/images/I/61SCiINLhXL._AC_SL1500_.jpg',
    descripcion:
      'Cancelación de ruido de 43 dB, códec LDAC para sonido de alta resolución y hasta 49 horas de batería.',
    compatibilidad:
      'Bluetooth 5.2 con LDAC: Android, iPhone, tablets y PC; trae cable para modo con alambre.',
    precio: 279900,
    precioOriginal: 399900,
    colorMarca: '#E53935',
    colorAmbiente: '#22242A',
  }),
  crearArticulo({
    id: 13,
    marca: 'CORSAIR',
    categoria: 'Audífonos',
    nombre: 'Audífonos Gamer Corsair HS60 Pro Surround',
    imagen:
      'https://exitocol.vtexassets.com/arquivos/ids/10956457/audifonos-gamer-corsair-hs60-pro-sonido-surround-71-virtual.jpg?v=637731956006070000',
    descripcion:
      'Sonido envolvente 7.1 virtual, almohadillas de espuma memory y micrófono unidireccional con silenciador.',
    compatibilidad:
      'USB en PC para el sonido 7.1 y cable 3.5 mm en PS5, Xbox, Switch, laptops y celulares.',
    precio: 299900,
    precioOriginal: 599900,
    colorMarca: '#F5C518',
    colorAmbiente: '#2E2E33',
  }),
];

const MESAS: IArticuloDestacado[] = [
  crearArticulo({
    id: 14,
    marca: 'SECRETLAB',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Secretlab TITAN Evo (Talla L)',
    imagen:
      'https://http2.mlstatic.com/D_Q_NP_2X_706724-MCO92827574708_092025-E.webp',
    descripcion:
      'Superficie con acabado hidrofóbico, huevos de gestión de cables y estructura que soporta hasta 130 kg.',
    compatibilidad:
      'Compatible con accesorios Secretlab (brazos y soportes de monitor, organizadores); ideal para setup con 2 monitores.',
    precio: 2499900,
    colorMarca: '#8A8F98',
    colorAmbiente: '#2A2C31',
  }),
  crearArticulo({
    id: 15,
    marca: 'NORDIC',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Nordic Con Soporte Para Monitor Y CPU',
    imagen:
      'https://http2.mlstatic.com/D_NQ_NP_627429-MLA90639981625_082025-O.webp',
    descripcion:
      'Estructura en acero con dos estantes, agujeros de cableado y soporte de torre colgado.',
    compatibilidad:
      'Soporta hasta 80 kg y aguanta 2 monitores en brazo de hasta 32 pulgadas; aguanta torres medianas.',
    precio: 1299900,
    precioOriginal: 1599900,
    colorMarca: '#7DD3FC',
    colorAmbiente: '#33363D',
  }),
  crearArticulo({
    id: 16,
    marca: 'COUGAR',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Cougar Darkblades S',
    imagen:
      'https://http2.mlstatic.com/D_NQ_NP_656124-MLU75881289915_042024-O.webp',
    descripcion:
      'Diseño angular con panel reforzado, agujeros de cableado y esquineros metálicos.',
    compatibilidad:
      'Soporta hasta 90 kg; ideal para torre grande, consola y 2 monitores sin brazo.',
    precio: 899900,
    precioOriginal: 1199900,
    colorMarca: '#FF7A00',
    colorAmbiente: '#2E2E33',
  }),
  crearArticulo({
    id: 17,
    marca: 'FLEXISPOT',
    categoria: 'Mesas de PC',
    nombre: 'Escritorio Ergonómico Flexispot E7 Con Tablero De Bamboo',
    imagen:
      'https://http2.mlstatic.com/D_NQ_NP_608135-MLA108303510251_032026-O.webp',
    descripcion:
      'Mesa elevadora eléctrica de 75 a 120 cm con anticolisión y 3 memorias de altura.',
    compatibilidad:
      'Soporta hasta 150 kg; panel de control con memorias, ideal para PC completo, monitor grande y accesorios.',
    precio: 1149900,
    colorMarca: '#4CAF50',
    colorAmbiente: '#B08968',
  }),
  crearArticulo({
    id: 18,
    marca: 'AROZZI',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Arozzi Arena Elite Con Iluminación RGB',
    imagen: 'https://m.media-amazon.com/images/I/51LimdKv0nL._AC_SL1000_.jpg',
    descripcion:
      'Tablero amplio con luces RGB en los costados, superficie mousepad de tela y huevos de cable.',
    compatibilidad:
      'Soporta hasta 100 kg; las luces se alimentan por USB y los brazos de monitor se sujetan con clamp.',
    precio: 549900,
    precioOriginal: 699900,
    colorMarca: '#E53935',
    colorAmbiente: '#3B3F58',
  }),
  crearArticulo({
    id: 19,
    marca: 'FEZIBO',
    categoria: 'Mesas de PC',
    nombre: 'Escritorio Elevador FEZIBO Para 2 Monitores Con Estante',
    imagen:
      'https://m.media-amazon.com/images/I/61h6YrKHlyS._AC_UF894,1000_QL80_.jpg',
    descripcion:
      'Escritorio eléctrico con estantería superior, agujeros de cableado y soporte de CPU incluido.',
    compatibilidad:
      'Eleva de 72 a 120 cm con carga máxima de 100 kg; perfecto para 2 monitores de hasta 32 pulgadas.',
    precio: 649900,
    precioOriginal: 799900,
    colorMarca: '#8D6E63',
    colorAmbiente: '#8D6E63',
  }),
  crearArticulo({
    id: 20,
    marca: 'HOMALL',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Homall En Forma De Z Con Soporte De CPU',
    imagen: 'https://m.media-amazon.com/images/I/81PCI4Kr-VL._AC_SL1500_.jpg',
    descripcion:
      'Marco en Z con acabado mate, soporte de torre colgado y separador de cables.',
    compatibilidad:
      'Soporta hasta 80 kg; compatible con torres medianas y 2 monitores montados en brazo.',
    precio: 449900,
    precioOriginal: 599900,
    colorMarca: '#90A4AE',
    colorAmbiente: '#33363D',
  }),
  crearArticulo({
    id: 21,
    marca: 'SHW',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Elevadora SHW Standing Desk De 120 CM',
    imagen: 'https://m.media-amazon.com/images/I/41bqlB0hCoL.jpg',
    descripcion:
      'Escritorio de pie con motor silencioso, panel digital y patas antideslizantes.',
    compatibilidad:
      'Eleva de 70 a 120 cm con carga máxima de 100 kg; huevos de cable incluidos en el tablero.',
    precio: 799900,
    colorMarca: '#78909C',
    colorAmbiente: '#A1887F',
  }),
  crearArticulo({
    id: 22,
    marca: 'AROZZI',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Arozzi Verona Con Estante Para Accesorios',
    imagen:
      'https://m.media-amazon.com/images/I/81JlN03olML._AC_SL1500_.jpg',
    descripcion:
      'Tablero con estante elevado para parlantes o aros, bordes redondeados y acabado resistente a rayones.',
    compatibilidad:
      'Soporta hasta 90 kg; huevos de cable y espacio para torre en la parte inferior.',
    precio: 799900,
    colorMarca: '#E53935',
    colorAmbiente: '#31343B',
  }),
  crearArticulo({
    id: 23,
    marca: 'HOMALL',
    categoria: 'Mesas de PC',
    nombre: 'Mesa Gamer Homall Blanca Con Soporte Para Monitor',
    imagen:
      'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/130598352_01/w=800,h=800,fit=pad',
    descripcion:
      'Acabado blanco mate con detalles negros, estructura reforzada y soporte elevado para monitor.',
    compatibilidad:
      'Soporta hasta 70 kg; ideal para 2 monitores pequeños y torre completa.',
    precio: 749900,
    precioOriginal: 1499900,
    colorMarca: '#90A4AE',
    colorAmbiente: '#D8D8E0',
  }),
];

const PORTATILES: IArticuloDestacado[] = [
  crearArticulo({
    id: 24,
    marca: 'ASUS',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer ASUS ROG Strix G16 Con RTX 4060',
    imagen: 'https://m.media-amazon.com/images/I/71WpTRV-c6L._AC_.jpg',
    descripcion:
      'Pantalla de 16 pulgadas FHD a 165 Hz, Intel Core i7 de 13ª generación, 16 GB de RAM y SSD de 1 TB.',
    compatibilidad:
      'Windows 11; HDMI 2.1 a 4K@120Hz, 3 USB (uno Thunderbolt 4) y Wi-Fi 6E.',
    precio: 5499900,
    precioOriginal: 6499900,
    colorMarca: '#FF5A00',
    colorAmbiente: '#2E2A45',
  }),
  crearArticulo({
    id: 25,
    marca: 'LENOVO',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer Lenovo LOQ 15 Con RTX 4060',
    imagen: 'https://m.media-amazon.com/images/I/81JMRlO1CFL._AC_SL1500_.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 144 Hz, Intel Core i5, 16 GB de RAM y SSD de 512 GB con refrigeración dual.',
    compatibilidad:
      'Windows 11; HDMI 2.1, USB-C con DisplayPort, Wi-Fi 6 y teclado retroiluminado.',
    precio: 3799900,
    colorMarca: '#E2231A',
    colorAmbiente: '#2C3038',
  }),
  crearArticulo({
    id: 26,
    marca: 'HP',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer HP Victus 15 Con RTX 3050',
    imagen: 'https://m.media-amazon.com/images/I/71cZs6fmSfL._AC_.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 144 Hz, Intel Core i5, 8 GB de RAM y SSD de 512 GB; teclado con numérico.',
    compatibilidad:
      'Windows 11; HDMI 2.1, USB-C, Wi-Fi 6 y puerto de carga rápida del equipo.',
    precio: 2999900,
    precioOriginal: 3599900,
    colorMarca: '#0096D6',
    colorAmbiente: '#2F3138',
  }),
  crearArticulo({
    id: 27,
    marca: 'ACER',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer Acer Nitro V15 Con RTX 4050',
    imagen: 'https://m.media-amazon.com/images/I/71iB6UqXbGL._AC_.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 144 Hz, Intel Core i7, 16 GB de RAM y SSD de 1 TB con tecnología CoolBoost.',
    compatibilidad:
      'Windows 11; HDMI 2.1, dos USB 3.2, un USB-C y Wi-Fi 6.',
    precio: 3499900,
    precioOriginal: 4399900,
    colorMarca: '#83B81A',
    colorAmbiente: '#262A31',
  }),
  crearArticulo({
    id: 28,
    marca: 'MSI',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer MSI Katana 15 Con RTX 4060',
    imagen: 'https://m.media-amazon.com/images/I/81-3FfpcwML._AC_.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 144 Hz, Intel Core i7, 16 GB de RAM, SSD de 1 TB y teclado RGB por zonas.',
    compatibilidad:
      'Windows 11; HDMI 2.1, USB-C con DisplayPort y Wi-Fi 6E.',
    precio: 4299900,
    colorMarca: '#E4002B',
    colorAmbiente: '#2B2E36',
  }),
  crearArticulo({
    id: 29,
    marca: 'DELL',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer Dell G15 5530 Con RTX 4060',
    imagen: 'https://m.media-amazon.com/images/I/719a9BX8JbL._AC_SL1500_.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 165 Hz, Intel Core i7, 16 GB de RAM y SSD de 512 GB con refrigeración dual.',
    compatibilidad:
      'Windows 11; HDMI 2.1, USB-C con DisplayPort, dos USB-A y Wi-Fi 6.',
    precio: 4199900,
    precioOriginal: 4999900,
    colorMarca: '#007DB8',
    colorAmbiente: '#31343B',
  }),
  crearArticulo({
    id: 30,
    marca: 'ASUS',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer ASUS TUF Gaming F15 Con RTX 4050',
    imagen: 'https://m.media-amazon.com/images/I/71NqbSDPAYL._AC_.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 144 Hz certificada por TÜV, Intel Core i5, 16 GB de RAM y SSD de 512 GB.',
    compatibilidad:
      'Windows 11 con estándar militar MIL-STD-810H; HDMI 2.1, USB-C Thunderbolt 4 y Wi-Fi 6.',
    precio: 3299900,
    precioOriginal: 4399900,
    colorMarca: '#FF5A00',
    colorAmbiente: '#2C3038',
  }),
  crearArticulo({
    id: 31,
    marca: 'LENOVO',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer Lenovo IdeaPad Gaming 3 Con RTX 3050',
    imagen: 'https://m.media-amazon.com/images/I/7120Dy5WdPL.jpg',
    descripcion:
      'Pantalla de 15.6 pulgadas FHD a 120 Hz, AMD Ryzen 5, 8 GB de RAM y SSD de 512 GB; diseño discreto para la universidad.',
    compatibilidad:
      'Windows 11; HDMI 2.0, USB-C, un USB 3.2 y Wi-Fi 6.',
    precio: 2599900,
    precioOriginal: 3499900,
    colorMarca: '#E2231A',
    colorAmbiente: '#2A2D33',
  }),
  crearArticulo({
    id: 32,
    marca: 'ACER',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer Acer Predator Helios 16 Con RTX 4070',
    imagen: 'https://m.media-amazon.com/images/I/71gqlzTfZzL._AC_.jpg',
    descripcion:
      'Pantalla de 16 pulgadas QHD a 240 Hz, Intel Core i7 de 14ª generación, 32 GB de RAM y SSD de 2 TB.',
    compatibilidad:
      'Windows 11; HDMI 2.1, dos USB-C Thunderbolt 4, Wi-Fi 6E y teclado RGB por tecla.',
    precio: 6999900,
    precioOriginal: 8199900,
    colorMarca: '#83B81A',
    colorAmbiente: '#33254A',
  }),
  crearArticulo({
    id: 33,
    marca: 'HP',
    categoria: 'Portátiles gamer',
    nombre: 'Portátil Gamer HP Omen 16 Con RTX 4060',
    imagen: 'https://m.media-amazon.com/images/I/816JXR4tzWL._AC_SL1500_.jpg',
    descripcion:
      'Pantalla de 16 pulgadas QHD a 165 Hz, AMD Ryzen 7, 16 GB de RAM y SSD de 1 TB; refrigeración con 4 salidas.',
    compatibilidad:
      'Windows 11; HDMI 2.1, USB-C con DisplayPort, dos USB-A y Wi-Fi 6E.',
    precio: 5999900,
    colorMarca: '#0096D6',
    colorAmbiente: '#2B2F3A',
  }),
];

const MONITORES: IArticuloDestacado[] = [
  crearArticulo({
    id: 34,
    marca: 'SAMSUNG',
    categoria: 'Monitores',
    nombre: 'Monitor Samsung Odyssey G5 Curvo 27" QHD 144Hz',
    imagen: 'https://m.media-amazon.com/images/I/81cSdJuBbFL._AC_SL1500_.jpg',
    descripcion:
      'Curvatura de 1000R, resolución QHD 2K y tasa de refresco de 144 Hz con AMD FreeSync Premium.',
    compatibilidad:
      'PC y consolas por dos HDMI 2.0 y un DisplayPort 1.4; la altura no es ajustable (solo inclina).',
    precio: 999900,
    precioOriginal: 1299900,
    colorMarca: '#1428A0',
    colorAmbiente: '#2A2F3A',
  }),
  crearArticulo({
    id: 35,
    marca: 'LG',
    categoria: 'Monitores',
    nombre: 'Monitor LG UltraGear 27GR75Q-B IPS 27" QHD 165Hz',
    imagen: 'https://m.media-amazon.com/images/I/71g9q4saOcL._AC_SL1500_.jpg',
    descripcion:
      'Panel IPS con 1 ms, QHD a 165 Hz (OC 180) y HDR10 con FreeSync Premium y G-Sync compatible.',
    compatibilidad:
      'PC por dos HDMI 2.0 y un DisplayPort 1.4; montaje VESA 100x100 para brazo de monitor.',
    precio: 1149900,
    colorMarca: '#A50034',
    colorAmbiente: '#25282D',
  }),
  crearArticulo({
    id: 36,
    marca: 'ASUS',
    categoria: 'Monitores',
    nombre: 'Monitor ASUS TUF Gaming VG249Q1A IPS 24" 165Hz',
    imagen:
      'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/123390627_01/w=800,h=800',
    descripcion:
      'Panel IPS de 165 Hz, 1 ms MPRT y tecnología Shadow Boost para ver mejor en zonas oscuras.',
    compatibilidad:
      'PC y consolas por dos HDMI 1.4 y un DisplayPort 1.2; montaje VESA 100x100.',
    precio: 749900,
    precioOriginal: 899900,
    colorMarca: '#00529A',
    colorAmbiente: '#2C3038',
  }),
  crearArticulo({
    id: 37,
    marca: 'AOC',
    categoria: 'Monitores',
    nombre: 'Monitor AOC 24G2SP IPS 24" FHD 165Hz',
    imagen: 'https://m.media-amazon.com/images/I/71dqrdXvfnL._AC_SL1500_.jpg',
    descripcion:
      'IPS de 165 Hz, 1 ms y FreeSync; modos gamer y punto de mira ajustable.',
    compatibilidad:
      'PC y consolas por dos HDMI 1.4 y un DisplayPort 1.2; montaje VESA 100x100.',
    precio: 649900,
    precioOriginal: 799900,
    colorMarca: '#CC0000',
    colorAmbiente: '#262A2F',
  }),
  crearArticulo({
    id: 38,
    marca: 'MSI',
    categoria: 'Monitores',
    nombre: 'Monitor MSI G274F IPS 27" FHD 180Hz',
    imagen: 'https://m.media-amazon.com/images/I/71fUR8jc1sL._AC_SL1500_.jpg',
    descripcion:
      'Panel Rapid IPS de 180 Hz, 1 ms y HDR Ready; marco ultra delgado de 3.5 mm.',
    compatibilidad:
      'PC y consolas por dos HDMI 2.0 y un DisplayPort 1.4; montaje VESA 100x100.',
    precio: 899900,
    precioOriginal: 1199900,
    colorMarca: '#E4002B',
    colorAmbiente: '#2E2A33',
  }),
  crearArticulo({
    id: 39,
    marca: 'DELL',
    categoria: 'Monitores',
    nombre: 'Monitor Dell S2722DGM Curvo 27" QHD 165Hz',
    imagen:
      'https://i5.walmartimages.com/asr/54b406c4-9fd1-4f27-9715-c73530f2beab.79ff987a65422ae7b8388204202f2a3b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    descripcion:
      'Curva de 1000R con panel VA, QHD a 165 Hz, FreeSync Premium Pro y dos parlantes integrados.',
    compatibilidad:
      'PC y consolas por dos HDMI 2.0 y un DisplayPort 1.4; montaje VESA 100x100.',
    precio: 1099900,
    colorMarca: '#007DB8',
    colorAmbiente: '#252A2E',
  }),
  crearArticulo({
    id: 40,
    marca: 'XIAOMI',
    categoria: 'Monitores',
    nombre: 'Monitor Xiaomi Curvo Gaming 34" WQHD 144Hz',
    imagen: 'https://m.media-amazon.com/images/I/61gcteVgClL._AC_SL1500_.jpg',
    descripcion:
      'Ultrapanorámico de 34 pulgadas con relación 21:9, curvatura de 1500R y 121% del espectro sRGB.',
    compatibilidad:
      'PC por dos HDMI 2.0 y un DisplayPort 1.4; compatible con brazos VESA 100x100.',
    precio: 1299900,
    precioOriginal: 1699900,
    colorMarca: '#FF6900',
    colorAmbiente: '#2B2F36',
  }),
  crearArticulo({
    id: 41,
    marca: 'BENQ',
    categoria: 'Monitores',
    nombre: 'Monitor BenQ ZOWIE XL2411K 24" 144Hz Para Esports',
    imagen:
      'https://http2.mlstatic.com/D_NQ_NP_841302-MLV82099302139_012025-O.webp',
    descripcion:
      'Pensado para competencia: 144 Hz, 1 ms y tecnología DyAc; menú S-Switch y perfiles de color por juego.',
    compatibilidad:
      'PC y consolas por tres HDMI y un DVI; incluye cables DVI y DisplayPort en la caja.',
    precio: 1399900,
    colorMarca: '#E60012',
    colorAmbiente: '#232329',
  }),
  crearArticulo({
    id: 42,
    marca: 'VIEWSONIC',
    categoria: 'Monitores',
    nombre: 'Monitor ViewSonic VX2479-HD-PRO IPS 24" 180Hz',
    imagen:
      'https://ecommerce.datablitz.com.ph/cdn/shop/files/6_44748bd5-de25-43dd-9e78-cc77127da2f9_1024x.jpg?v=1718847523',
    descripcion:
      'IPS de 180 Hz, 1 ms MPRT y HDR10; modo Eco y luz azul reducida para sesiones largas.',
    compatibilidad:
      'PC y consolas por dos HDMI 2.0 y un DisplayPort 1.2; montaje VESA 100x100.',
    precio: 599900,
    precioOriginal: 849900,
    colorMarca: '#CC0000',
    colorAmbiente: '#262A2E',
  }),
  crearArticulo({
    id: 43,
    marca: 'PHILIPS',
    categoria: 'Monitores',
    nombre: 'Monitor Philips 272E2AE IPS 27" FHD 75Hz',
    imagen: 'https://m.media-amazon.com/images/I/61pIcSJxdEL.jpg',
    descripcion:
      'Panel IPS a 75 Hz con tecnología Flicker-Free y modo LowBlue; ideal para oficina y estudio.',
    compatibilidad:
      'PC y laptops por un HDMI 1.4 y un VGA; montaje VESA 100x100.',
    precio: 549900,
    precioOriginal: 699900,
    colorMarca: '#0B5ED7',
    colorAmbiente: '#2A2E33',
  }),
];

const PANTALLAS: IArticuloDestacado[] = [
  crearArticulo({
    id: 44,
    marca: 'SAMSUNG',
    categoria: 'Pantallas',
    nombre: 'Pantalla Inteligente Samsung Smart Monitor M8 32" UHD',
    imagen: 'https://m.media-amazon.com/images/I/81I0Qntd2HL._AC_SL1500_.jpg',
    descripcion:
      'Monitor y Smart TV en uno: sistema Tizen con apps de streaming, mando incluido y cámara SlimFit magnética.',
    compatibilidad:
      'Wi-Fi y Bluetooth; HDMI 2.0, tres USB y compatibilidad con AirPlay 2 y Samsung DeX.',
    precio: 2199900,
    precioOriginal: 2699900,
    colorMarca: '#1428A0',
    colorAmbiente: '#DADDE3',
  }),
  crearArticulo({
    id: 45,
    marca: 'LG',
    categoria: 'Pantallas',
    nombre: 'Pantalla Portátil LG StanbyME 27" Con Base Móvil',
    imagen: 'https://m.media-amazon.com/images/I/81jJ3UE0kjL._AC_SL1500_.jpg',
    descripcion:
      'Pantalla táctil de 27 pulgadas con ruedas y batería interna; gira de horizontal a vertical en un movimiento.',
    compatibilidad:
      'AirPlay 2 y Miracast, HDMI mini, USB-C y apps de streaming integradas.',
    precio: 2499900,
    colorMarca: '#A50034',
    colorAmbiente: '#E2E2E8',
  }),
  crearArticulo({
    id: 46,
    marca: 'XIAOMI',
    categoria: 'Pantallas',
    nombre: 'Pantalla Inteligente Xiaomi Mi Smart Monitor 32" UHD',
    imagen: 'https://m.media-amazon.com/images/I/71+J5CAuRnL._AC_SL1500_.jpg',
    descripcion:
      'Smart TV con Google TV,4K HDR10+ y altavoces de 30 W con sonido DTS.',
    compatibilidad:
      'Chromecast integrado, HDMI 2.1, dos USB, Wi-Fi y Bluetooth 5.0.',
    precio: 1499900,
    precioOriginal: 1999900,
    colorMarca: '#FF6900',
    colorAmbiente: '#D6D8DE',
  }),
  crearArticulo({
    id: 47,
    marca: 'SAMSUNG',
    categoria: 'Pantallas',
    nombre: 'Pantalla Inteligente Samsung Smart Monitor M5 27" FHD',
    imagen: 'https://m.media-amazon.com/images/I/81Lc1nu2T+L._AC_SL1500_.jpg',
    descripcion:
      'Monitor Smart con Tizen, mando incluido y modo PC remoto (Workspace) para trabajar desde cualquier parte.',
    compatibilidad:
      'Wi-Fi, HDMI 2.0, dos USB y AirPlay 2 para iPhone y Mac.',
    precio: 1099900,
    precioOriginal: 1399900,
    colorMarca: '#1428A0',
    colorAmbiente: '#DADDE3',
  }),
  crearArticulo({
    id: 48,
    marca: 'LENOVO',
    categoria: 'Pantallas',
    nombre: 'Pantalla Portátil Lenovo ThinkVision M14t 14" Táctil',
    imagen: 'https://media.falabella.com/falabellaPE/114059076_01/w=800,h=800,fit=pad',
    descripcion:
      'Pantalla de 14 pulgadas FHD táctil con lápiz incluido y solo 700 g; para llevar a todas partes.',
    compatibilidad:
      'Un solo cable USB-C con DisplayPort y carga de 65 W; funciona con Windows y Android.',
    precio: 1299900,
    colorMarca: '#E2231A',
    colorAmbiente: '#B9BDC4',
  }),
  crearArticulo({
    id: 49,
    marca: 'LG',
    categoria: 'Pantallas',
    nombre: 'Pantalla LG UltraFine Ergo 32UN880 4K Con Brazo Ergonómico',
    imagen:
      'https://http2.mlstatic.com/D_NQ_NP_963752-MLM86360968541_062025-O.webp',
    descripcion:
      '4K IPS de 32 pulgadas con brazo Ergo ajustable (altura, giro y profundidad) y 99% del espectro sRGB.',
    compatibilidad:
      'USB-C con 90 W de carga, dos HDMI, DisplayPort y altavoces de 5 W por canal.',
    precio: 1799900,
    precioOriginal: 2199900,
    colorMarca: '#A50034',
    colorAmbiente: '#C3C7CE',
  }),
  crearArticulo({
    id: 50,
    marca: 'HP',
    categoria: 'Pantallas',
    nombre: 'Pantalla HP E27d G4 QHD Con Hub USB-C',
    imagen:
      'https://comptechdirect.com/cdn/shop/files/HP_6PA56AA_ABB_INT_5_b998d857-e355-412c-bd54-918e8da8dd93_1024x1024.jpg?v=1693027222',
    descripcion:
      '27 pulgadas QHD con hub USB-C de 100 W, red RJ-45 y cuatro puertos USB-A; pensada para notebooks.',
    compatibilidad:
      'USB-C con video, red y carga; dos HDMI, DisplayPort y gestión remota vía IP.',
    precio: 1399900,
    colorMarca: '#0096D6',
    colorAmbiente: '#C8CBD1',
  }),
  crearArticulo({
    id: 51,
    marca: 'DELL',
    categoria: 'Pantallas',
    nombre: 'Pantalla Dell UltraSharp U2723QE 4K Con Hub USB-C',
    imagen: 'https://m.media-amazon.com/images/I/71KiwqT9PuL._AC_SL1500_.jpg',
    descripcion:
      '4K IPS Black de 27 pulgadas con 120% sRGB, hub USB-C de 90 W y cuatro puertos USB-A.',
    compatibilidad:
      'USB-C, HDMI, DisplayPort, red RJ-45 y tres USB-A; compatible con Dell Command.',
    precio: 2099900,
    precioOriginal: 2499900,
    colorMarca: '#007DB8',
    colorAmbiente: '#BFC3CA',
  }),
  crearArticulo({
    id: 52,
    marca: 'AOC',
    categoria: 'Pantallas',
    nombre: 'Pantalla AOC P2765C Curva QHD Con USB-C',
    imagen:
      'https://www.notebookcheck.org/fileadmin/_processed_/c/9/csm_AOC_U27B3CF_B_07f777b16f.jpg',
    descripcion:
      '27 pulgadas curva QHD con hub USB-C de 65 W y organizador de cables integrado.',
    compatibilidad:
      'USB-C con Power Delivery, HDMI, DisplayPort y red RJ-45.',
    precio: 1199900,
    precioOriginal: 1499900,
    colorMarca: '#CC0000',
    colorAmbiente: '#2E3138',
  }),
  crearArticulo({
    id: 53,
    marca: 'PHILIPS',
    categoria: 'Pantallas',
    nombre: 'Pantalla Philips 279P1FR 4K Con USB-C Y Bocinas',
    imagen:
      'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6446/6446577_sd.jpg',
    descripcion:
      '27 pulgadas UHD IPS con USB-C de 65 W, bocinas de 5 W por canal y brazo SmartErgoBase.',
    compatibilidad:
      'USB-C, HDMI 2.0, DisplayPort 1.2 y cuatro USB 3.2; modos LowBlue y Flicker-Free.',
    precio: 1699900,
    colorMarca: '#0B5ED7',
    colorAmbiente: '#C6CAD1',
  }),
];

const TELEVISORES: IArticuloDestacado[] = [
  crearArticulo({
    id: 54,
    marca: 'LG',
    categoria: 'Televisores',
    nombre: 'Televisor LG UR3400 50" UHD 4K Con webOS',
    imagen:
      'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/137104947_01/public',
    descripcion:
      'Panel UHD con inteligencia AI ThinQ, HDR10 Pro y webOS con todas las apps de siempre.',
    compatibilidad:
      'Dos HDMI 2.1, dos USB, Wi-Fi y Bluetooth; compatible con AirPlay 2 y Google Asistente.',
    precio: 1399900,
    precioOriginal: 1799900,
    colorMarca: '#A50034',
    colorAmbiente: '#232529',
  }),
  crearArticulo({
    id: 55,
    marca: 'SAMSUNG',
    categoria: 'Televisores',
    nombre: 'Televisor Samsung Crystal UHD CU7000 55" 4K',
    imagen: 'https://m.media-amazon.com/images/I/71Z1TGx92nL._AC_SL1500_.jpg',
    descripcion:
      'Crystal Processor 4K, HDR10+ y modo de juego con baja latencia; diseño casi sin bordes.',
    compatibilidad:
      'Tres HDMI 2.1, dos USB, Wi-Fi y Bluetooth; SmartThings, Alexa y Bixby incluidos.',
    precio: 1599900,
    colorMarca: '#1428A0',
    colorAmbiente: '#252A31',
  }),
  crearArticulo({
    id: 56,
    marca: 'XIAOMI',
    categoria: 'Televisores',
    nombre: 'Televisor Xiaomi TV A Pro 55" 4K Con Google TV',
    imagen: 'https://m.media-amazon.com/images/I/61-m2Yyi5JL._AC_SL1000_.jpg',
    descripcion:
      '4K con HDR10+, Google TV con Chromecast, altavoces de 2×10 W y frontal metálica.',
    compatibilidad:
      'Tres HDMI 2.1, dos USB, Wi-Fi 6 y Bluetooth 5.0; Google Asistente desde el mando de voz.',
    precio: 1499900,
    precioOriginal: 1999900,
    colorMarca: '#FF6900',
    colorAmbiente: '#232529',
  }),
  crearArticulo({
    id: 57,
    marca: 'SONY',
    categoria: 'Televisores',
    nombre: 'Televisor Sony Bravia 2 X55L 55" 4K Con Google TV',
    imagen: 'https://m.media-amazon.com/images/I/71ULLfhSU6L.jpg',
    descripcion:
      'Procesador X1, HDR10 y Dolby Vision con modo de juego pensado para PlayStation 5.',
    compatibilidad:
      'Dos HDMI 2.1 con 4K a 120 Hz, dos USB, AirPlay 2 y Bravia Core; Google TV incluido.',
    precio: 1999900,
    colorMarca: '#F5F5F7',
    colorAmbiente: '#26282D',
  }),
  crearArticulo({
    id: 58,
    marca: 'TCL',
    categoria: 'Televisores',
    nombre: 'Televisor TCL P635 50" 4K Con Google TV',
    imagen:
      'https://http2.mlstatic.com/D_NQ_NP_699647-MLA74781929491_022024-O.webp',
    descripcion:
      '4K con HDR10+, procesamiento dinámico de imagen y bocinas de 15 W.',
    compatibilidad:
      'Tres HDMI 2.1, dos USB, Wi-Fi 5 y Bluetooth; Google Asistente y Chromecast integrados.',
    precio: 1149900,
    precioOriginal: 1499900,
    colorMarca: '#E60012',
    colorAmbiente: '#242629',
  }),
  crearArticulo({
    id: 59,
    marca: 'HISENSE',
    categoria: 'Televisores',
    nombre: 'Televisor Hisense A6 55" 4K Google TV',
    imagen: 'https://m.media-amazon.com/images/I/71yOGr7C3VL._AC_.jpg',
    descripcion:
      '4K con HDR10+ y Game Mode; Google TV con apps de streaming y control por voz.',
    compatibilidad:
      'Tres HDMI 2.1, dos USB, Wi-Fi y Bluetooth; Chromecast y Apple AirPlay integrados.',
    precio: 1299900,
    precioOriginal: 1699900,
    colorMarca: '#0072CE',
    colorAmbiente: '#25272C',
  }),
  crearArticulo({
    id: 60,
    marca: 'LG',
    categoria: 'Televisores',
    nombre: 'Televisor LG OLED C4 55" 4K evo Con webOS',
    imagen: 'https://m.media-amazon.com/images/I/81iSxTSYQ2L.jpg',
    descripcion:
      'Panel OLED evo con negros perfectos, 144 Hz y Dolby Vision IQ con Dolby Atmos.',
    compatibilidad:
      'Cuatro HDMI 2.1 con 4K a 144 Hz, cuatro USB, webOS; compatible con NVIDIA G-Sync y FreeSync.',
    precio: 4499900,
    precioOriginal: 5999900,
    colorMarca: '#A50034',
    colorAmbiente: '#1F2126',
  }),
  crearArticulo({
    id: 61,
    marca: 'SAMSUNG',
    categoria: 'Televisores',
    nombre: 'Televisor Samsung QLED Q60D 65" 4K',
    imagen: 'https://m.media-amazon.com/images/I/512+ZnNFA6L._AC_.jpg',
    descripcion:
      'QLED con 100% de volumen de color, Quantum HDR y modo Ambiente para usarlo como mural.',
    compatibilidad:
      'Cuatro HDMI 2.1, dos USB, Wi-Fi y Bluetooth; SmartThings, Alexa y AirPlay 2.',
    precio: 2999900,
    colorMarca: '#1428A0',
    colorAmbiente: '#242A33',
  }),
  crearArticulo({
    id: 62,
    marca: 'PHILIPS',
    categoria: 'Televisores',
    nombre: 'Televisor Philips PUS7505 43" 4K Con Ambilight',
    imagen:
      'https://m.media-amazon.com/images/I/71WakEOJZZL._AC_SX679_.jpg',
    descripcion:
      'Ambilight de tres lados que proyecta los colores de la imagen, 4K HDR y Dolby Vision con Atmos.',
    compatibilidad:
      'Tres HDMI 2.0, dos USB, Wi-Fi; Alexa y Google Asistente integrados en el televisor.',
    precio: 1099900,
    precioOriginal: 1599900,
    colorMarca: '#0B5ED7',
    colorAmbiente: '#262A30',
  }),
  crearArticulo({
    id: 63,
    marca: 'XIAOMI',
    categoria: 'Televisores',
    nombre: 'Televisor Xiaomi TV S Mini LED 65" 4K 144Hz',
    imagen:
      'https://cdn.kemik.gt/2025/07/59500-Xiaomi-TV-S-Mini-65-2025-1200X1200-2.-700x700.jpg',
    descripcion:
      'Tecnología Mini LED con 1200 nits de brillo, 144 Hz y cientos de zonas de atenuación local.',
    compatibilidad:
      'Cuatro HDMI 2.1 con 4K a 144 Hz, tres USB, Wi-Fi 6 y Bluetooth 5.2; Google TV y AirPlay.',
    precio: 2599900,
    precioOriginal: 3499900,
    colorMarca: '#FF6900',
    colorAmbiente: '#232529',
  }),
];

// El orden del concat define el orden de las categorías en la portada
export const ARTICULOS_NUEVOS: IArticuloDestacado[] = [
  ...AUDIFONOS,
  ...MESAS,
  ...PORTATILES,
  ...MONITORES,
  ...PANTALLAS,
  ...TELEVISORES,
];
