import { PrismaClient } from '@prisma/client';

import { CATEGORIAS, PRODUCTOS, crearVariantes } from './datosCatalogo';

const prisma = new PrismaClient();

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
    await prisma.producto.create({
      data: {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        tags: producto.tags,
        imagenes: producto.imagenes,
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
