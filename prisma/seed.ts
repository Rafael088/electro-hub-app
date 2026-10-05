import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductoSemilla {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tags: string[];
  condiciones: (string | null)[];
  colores: string[];
}

const CATEGORIAS = [
  { nombre: 'Portátiles', descripcion: 'Laptops nuevas y renovadas' },
  { nombre: 'Auriculares', descripcion: 'Headphones de diadema' },
  { nombre: 'Audífonos', descripcion: 'In-ear y True Wireless' },
  { nombre: 'Mouse', descripcion: 'Mouse cableados, inalámbricos y gamer' },
  { nombre: 'Teclados', descripcion: 'Teclados mecánicos y de membrana' },
  { nombre: 'Teléfonos', descripcion: 'Smartphones nuevos y renovados' },
];

const CONDICIONES_EQUIPO = ['Nuevo', 'Renovado'];

const PRODUCTOS: ProductoSemilla[] = [
  { nombre: 'Portátil Ultrabook 14"', descripcion: 'Intel Core i5, 16 GB RAM, SSD 512 GB, pantalla IPS FHD.', precio: 2899000, categoria: 'Portátiles', tags: ['ultraligero', 'ssd'], condiciones: CONDICIONES_EQUIPO, colores: ['Gris espacial', 'Negro'] },
  { nombre: 'Portátil Gamer 15.6"', descripcion: 'Ryzen 7, RTX 4050, 16 GB RAM, pantalla 144 Hz.', precio: 3799000, categoria: 'Portátiles', tags: ['gamer', 'rtx'], condiciones: ['Nuevo'], colores: ['Negro'] },
  { nombre: 'Auriculares Inalámbricos Pro', descripcion: 'Cancelación activa de ruido, 40 h de batería.', precio: 429900, categoria: 'Auriculares', tags: ['anc', 'bluetooth'], condiciones: ['Nuevo'], colores: ['Negro', 'Blanco', 'Azul'] },
  { nombre: 'Auriculares Gamer 7.1', descripcion: 'Sonido envolvente, micrófono con cancelación de ruido.', precio: 219900, categoria: 'Auriculares', tags: ['gamer', '7.1'], condiciones: ['Nuevo'], colores: ['Negro', 'Rojo'] },
  { nombre: 'Audífonos True Wireless', descripcion: 'Bluetooth 5.3, estuche de carga, resistentes al agua.', precio: 149900, categoria: 'Audífonos', tags: ['tws', 'impermeable'], condiciones: ['Nuevo'], colores: ['Blanco', 'Negro'] },
  { nombre: 'Audífonos Deportivos', descripcion: 'Gancho auricular, cable plano, micrófono inline.', precio: 79900, categoria: 'Audífonos', tags: ['deportivo'], condiciones: ['Nuevo'], colores: ['Verde', 'Naranja'] },
  { nombre: 'Mouse Inalámbrico Ergonómico', descripcion: '6 botones, DPI ajustable, receptor USB + Bluetooth.', precio: 99900, categoria: 'Mouse', tags: ['ergonómico', 'inalámbrico'], condiciones: ['Nuevo'], colores: ['Negro', 'Gris'] },
  { nombre: 'Mouse Gamer 16000 DPI', descripcion: 'Sensor óptico de alta precisión, RGB, cable paracord.', precio: 129900, categoria: 'Mouse', tags: ['gamer', 'rgb'], condiciones: ['Nuevo'], colores: ['Negro'] },
  { nombre: 'Teclado Mecánico 60%', descripcion: 'Switches hot-swap, keycaps PBT, retroiluminación RGB.', precio: 259900, categoria: 'Teclados', tags: ['mecánico', 'hot-swap'], condiciones: ['Nuevo'], colores: ['Negro', 'Blanco'] },
  { nombre: 'Teclado Inalámbrico Multimedia', descripcion: 'Silencioso, batería recargable, multi-dispositivo.', precio: 139900, categoria: 'Teclados', tags: ['inalámbrico', 'oficina'], condiciones: ['Nuevo'], colores: ['Gris', 'Rosa'] },
  { nombre: 'Teléfono 5G 128 GB', descripcion: 'Pantalla AMOLED 6.5", cámara triple 50 MP, 5000 mAh.', precio: 1699000, categoria: 'Teléfonos', tags: ['5g', 'amoled'], condiciones: CONDICIONES_EQUIPO, colores: ['Negro', 'Verde'] },
  { nombre: 'Teléfono Compacto 64 GB', descripcion: 'Pantalla 5.8", doble cámara, ideal para una mano.', precio: 849000, categoria: 'Teléfonos', tags: ['compacto'], condiciones: ['Nuevo', 'Renovado'], colores: ['Blanco', 'Azul'] },
];

function crearSku(nombre: string, condicion: string | null, color: string): string {
  const base = nombre.toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 20);
  const colorCorto = color.toUpperCase().replace(/\s+/g, '').slice(0, 4);
  return [base, condicion ?? 'UNICA', colorCorto].join('-');
}

function crearVariantes(producto: ProductoSemilla) {
  return producto.condiciones.flatMap((condicion) =>
    producto.colores.map((color) => ({
      sku: crearSku(producto.nombre, condicion, color),
      condicion,
      color,
      stock: 10,
    }))
  );
}

async function main(): Promise<void> {
  // Se limpia en orden inverso a las relaciones para poder re-ejecutar el seed
  await prisma.orderItem.deleteMany();
  await prisma.orden.deleteMany();
  await prisma.variante.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();

  for (const categoria of CATEGORIAS) {
    await prisma.categoria.create({ data: categoria });
  }

  for (const producto of PRODUCTOS) {
    const texto = encodeURIComponent(producto.nombre);
    await prisma.producto.create({
      data: {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        tags: producto.tags,
        imagenes: [`https://placehold.co/600x600/png?text=${texto}`],
        categoria: { connect: { nombre: producto.categoria } },
        variantes: { create: crearVariantes(producto) },
      },
    });
  }

  console.log(`Seed listo: ${CATEGORIAS.length} categorías, ${PRODUCTOS.length} productos`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
