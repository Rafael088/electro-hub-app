import {
  CATEGORIAS,
  CONDICIONES_EQUIPO,
  PRODUCTOS,
  crearSku,
  crearVariantes,
} from '../../prisma/datosCatalogo';

const CONDICIONES_PERMITIDAS = ['Nuevo', 'Renovado'];

describe('datos del catálogo (seed)', () => {
  it('publica 6 categorías con nombres únicos', () => {
    expect(CATEGORIAS).toHaveLength(6);

    const nombres = CATEGORIAS.map((categoria) => categoria.nombre);
    expect(new Set(nombres).size).toBe(nombres.length);
  });

  it('publica 12 productos con nombres únicos', () => {
    expect(PRODUCTOS).toHaveLength(12);

    const nombres = PRODUCTOS.map((producto) => producto.nombre);
    expect(new Set(nombres).size).toBe(nombres.length);
  });

  it('cada producto pertenece a una categoría existente', () => {
    const nombresDeCategoria = new Set(CATEGORIAS.map((categoria) => categoria.nombre));

    const huerfanos = PRODUCTOS.filter(
      (producto) => !nombresDeCategoria.has(producto.categoria)
    ).map((producto) => producto.nombre);

    expect(huerfanos).toEqual([]);
  });

  it('cada categoría tiene al menos un producto', () => {
    const categoriasUsadas = new Set(PRODUCTOS.map((producto) => producto.categoria));

    const vacias = CATEGORIAS.filter(
      (categoria) => !categoriasUsadas.has(categoria.nombre)
    ).map((categoria) => categoria.nombre);

    expect(vacias).toEqual([]);
  });

  it('los textos están bien codificados (sin caracteres de reemplazo)', () => {
    const textos = [
      ...PRODUCTOS.map((producto) => producto.nombre),
      ...PRODUCTOS.map((producto) => producto.descripcion),
      ...CATEGORIAS.map((categoria) => categoria.nombre),
    ];

    expect(textos.filter((texto) => texto.includes('�'))).toEqual([]);
  });

  it('todos los precios son enteros mayores que cero', () => {
    const invalidos = PRODUCTOS.filter(
      (producto) => !Number.isInteger(producto.precio) || producto.precio <= 0
    ).map((producto) => producto.nombre);

    expect(invalidos).toEqual([]);
  });

  it('todos los productos tienen tags y al menos un color', () => {
    const incompletos = PRODUCTOS.filter(
      (producto) => producto.tags.length === 0 || producto.colores.length === 0
    ).map((producto) => producto.nombre);

    expect(incompletos).toEqual([]);
  });

  it('solo se usan condiciones válidas (Nuevo o Renovado)', () => {
    const condiciones = new Set(
      PRODUCTOS.flatMap((producto) => producto.condiciones).filter(
        (condicion): condicion is string => condicion !== null
      )
    );

    expect([...condiciones].every((condicion) => CONDICIONES_PERMITIDAS.includes(condicion))).toBe(
      true
    );
    expect(CONDICIONES_EQUIPO).toEqual(['Nuevo', 'Renovado']);
  });
});

describe('crearSku', () => {
  it('arma el SKU con nombre y color en mayúsculas y la condición tal cual', () => {
    // La condición se une sin pasar a mayúsculas: es el comportamiento actual del seed
    expect(crearSku('Mouse Gamer', 'Nuevo', 'Negro')).toBe('MOUSE-GAMER-Nuevo-NEGR');
  });

  it('usa UNICA cuando el producto no tiene condición', () => {
    expect(crearSku('Mouse Gamer', null, 'Blanco')).toBe('MOUSE-GAMER-UNICA-BLAN');
  });

  it('trata acentos y signos como separadores (quedan guiones)', () => {
    // 'Mecánico' se parte en MEC-NICO y el '%' deja un guión final
    expect(crearSku('Teclado Mecánico 60%', 'Nuevo', 'Gris espacial')).toBe(
      'TECLADO-MEC-NICO-60--Nuevo-GRIS'
    );
  });

  it('recorta la base del nombre a 20 caracteres', () => {
    const skuLargo = crearSku('Auriculares Inalámbricos Pro', 'Nuevo', 'Negro');

    // La á es separadora: 'AURICULARES-INAL-MBRICOS-PRO' se corta en 20 caracteres
    expect(skuLargo).toBe('AURICULARES-INAL-MBR-Nuevo-NEGR');
  });
});

describe('crearVariantes con el catálogo real', () => {
  const variantes = PRODUCTOS.flatMap(crearVariantes);

  it('genera una variante por cada combinación de condición y color', () => {
    const esperadas = PRODUCTOS.reduce(
      (total, producto) => total + producto.condiciones.length * producto.colores.length,
      0
    );

    expect(variantes).toHaveLength(esperadas);
    // Cada producto debe poder comprarse: ninguna queda sin variantes
    expect(PRODUCTOS.every((producto) => crearVariantes(producto).length > 0)).toBe(true);
  });

  it('genera SKUs únicos en todo el catálogo', () => {
    const skus = variantes.map((variante) => variante.sku);

    expect(new Set(skus).size).toBe(skus.length);
  });

  it('todas las variantes nacen con stock disponible', () => {
    expect(variantes.every((variante) => variante.stock > 0)).toBe(true);
  });
});
