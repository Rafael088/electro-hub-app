# Reglas para Agentes de IA

## Contexto del Proyecto

Eres un asistente de desarrollo para un e-commerce de accesorios de tecnología (Electro-Hub).
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma 6, PostgreSQL, Zod 4
- **Base de datos**: Supabase
- **Pagos**: Mercado Pago Checkout Pro
- **Email**: Resend
- **Carrito**: localStorage (sin autenticación)
- **Público**: Estudiantes aprendiendo Programación Orientada a Objetos

> 🎨 Paquete de marca: `../../electro-hub` (logos, tokens de color y tipografías pixel: Pixelify Sans, Inter, JetBrains Mono). Tema oscuro: fondo `#1A1B26`, acento cian `#00F0FF`, púrpura `#B829F7`

---

## Arquitectura y Flujos del Proyecto

### 1. Visión general del negocio

- E-commerce de accesorios de tecnología (Electro-Hub).
- Sin login: cualquiera puede comprar.
- Carrito en el navegador, persistido en `localStorage`.
- Pago con Mercado Pago Checkout Pro.
- Envío gratis incluido en el precio, solo Colombia.
- Un solo proyecto Next.js (App Router) con frontend y backend juntos.

### 2. Las piezas del sistema

#### Frontend (lo que ve el cliente) — azul
Páginas en `src/app`:

| Ruta | Propósito |
|------|-----------|
| `/` | Catálogo de productos |
| `/productos/[id]` | Detalle del producto + selector de condición/color |
| `/carrito` | Carrito y total |
| `/checkout` | Datos de envío y botón para pagar |

Componentes en `src/components`:
`ProductCard`, `ProductGrid`, `VariantSelector`, `Cart`, `CartItem`, `CheckoutForm`.

Carrito en `src/lib/cart.ts`:
`agregarItem()`, `quitarItem()`, `obtenerCarrito()`, `limpiarCarrito()`.
Todo se guarda en `localStorage`; el servidor no interviene hasta el checkout.

#### Backend (nuestro servidor / API) — violeta
Rutas API en `src/app/api`:

| Método | Ruta | Propósito |
|--------|------|-----------|
| `GET` | `/api/productos` | Listar productos |
| `GET` | `/api/productos/[id]` | Detalle de un producto con variantes |
| `POST` | `/api/orders` | Crear orden en estado `PENDIENTE` |
| `POST` | `/api/mercado-pago` | Crear preferencia de pago |
| `POST` | `/api/webhooks` | Recibir notificación de pago de Mercado Pago |

Servicios en `src/lib`:
- `prisma.ts` — singleton del cliente Prisma.
- `mercado-pago.ts` — crea la preferencia de pago.
- `email.ts` — envía confirmaciones con Resend.

Cada entrada se valida con Zod y las respuestas usan el formato `{ data, error, message }`.

#### Datos — verde
- Prisma como ORM.
- Supabase (PostgreSQL en la nube, plan gratis, 500 MB).
- Los contratos compartidos viven en `src/types/index.ts`: `IProducto`, `IVariante`, `ICarritoItem`, `IOrden`, etc.

#### Servicios externos — naranja
- **Mercado Pago**: Checkout Pro para cobrar y webhook para confirmar el pago.
- **Resend**: email de confirmación al cliente.

#### Tests — rojo
- **Jest + Testing Library**: tests unitarios y de componentes.
- **Playwright**: tests E2E del flujo completo.

### 3. El flujo de compra paso a paso

| Paso | Cliente | Frontend | Backend | BD / Servicios externos |
|------|---------|----------|---------|-------------------------|
| 1 | Navega el catálogo | Ve la grilla de productos | `GET /api/productos` | Prisma lee productos en Supabase |
| 2 | Abre un producto | Ve detalle | `GET /api/productos/[id]` | Trae variantes: condición, color, stock |
| 3 | Elige condición/color | Agrega al carrito → `localStorage` | — | — |
| 4 | Va al checkout | Llena nombre, email, teléfono, dirección | — | — |
| 5 | Click en Pagar | Botón "Pagar" | `POST /api/orders` | Guarda orden `PENDIENTE` |
| 6 | Prepara el pago | Redirige al cliente | `POST /api/mercado-pago` | MP crea la preferencia (link de pago) |
| 7 | Paga | Abre Checkout Pro | — | Cliente paga en Mercado Pago |
| 8 | Confirma pago | — | `POST /api/webhooks` | MP avisa al servidor |
| 9 | Finaliza | Muestra confirmación | Arma el email | Orden pasa a `PAGADA`, baja stock, Resend envía email |

> Nota: los pasos 1-4 no tocan el servidor; todo pasa en el navegador.

### 4. Los datos: 5 tablas en Supabase

Definidas una sola vez en `prisma/schema.prisma`:

- **`Categoria`** → `Producto` (1 a muchos)
  - `id`, `nombre` (único), `descripcion?`
- **`Producto`** → `Variante` (1 a muchos)
  - `id`, `nombre`, `descripcion`, `precio`, `categoriaId`, `tags[]`, `imagenes[]`
- **`Variante`**
  - `id`, `productoId`, `sku` (único), `condicion?`, `color?`, `stock`
  - *Por qué existe*: un portátil viene nuevo o renovado y en varios colores; cada combinación tiene su SKU y stock.
- **`Orden`** → `OrderItem` (1 a muchos)
  - `id`, `nombre`, `email`, `teléfono`, `dirección`, `ciudad`, `departamento`, `estado` (`PENDIENTE`, `PAGADA`, `ENVIADA`, `ENTREGADA`, `CANCELADA`), `total`, `mpPaymentId?`
- **`OrderItem`**
  - `id`, `ordenId`, `productoId`, `varianteId`, `cantidad`, `precio`
  - Guarda el precio del momento de la compra.

### 5. POO en este proyecto

Cinco ideas que aparecen en archivos concretos:

1. **Interfaces**: acordamos la forma de los datos primero. Contratos en `src/types/index.ts`.
2. **Encapsulamiento**: nadie toca `localStorage` directo; todos usan `src/lib/cart.ts`.
3. **Composición**: armamos piezas grandes con piezas pequeñas. Ejemplo: `ProductGrid` compuesto de `ProductCard × N`; `Orden` compuesta de `OrderItem × N`.
4. **Responsabilidad única**: cada función/clase hace una sola cosa. Función ≤ 30 líneas, componente ≤ 100 líneas.
5. **Nombres que explican**: `calcularTotalOrden()` ✓ — `calc()` ✗.

### 6. El equipo: 3 roles, 3 semanas

Cada estudiante trabaja en su propia rama y no pisa el código del otro.

#### Frontend (Estudiante 1)
Trabaja en: `src/app/page.tsx`, `src/app/productos/[id]`, `src/app/carrito`, `src/app/checkout`, `src/components/`.
- Semana 1: `ProductCard`, `ProductGrid`, home, detalle de producto.
- Semana 2: `VariantSelector`, `Cart`, `CartItem`, páginas `/carrito` y `/checkout`, botón pagar + redirect a MP.
- Semana 3: página de confirmación, responsive mobile-first.

#### Backend (Estudiante 2)
Trabaja en: `src/app/api/`, `src/lib/prisma.ts`, `src/lib/mercado-pago.ts`, `src/lib/email.ts`, `prisma/schema.prisma`.
- Semana 1: Prisma client singleton, `GET /api/productos`, `GET /api/productos/[id]`.
- Semana 2: `POST /api/orders`, `POST /api/mercado-pago`, `POST /api/webhooks`.
- Semana 3: descontar stock tras el pago, email con Resend, validación con Zod.

#### Testers (Estudiante 3)
Trabaja en: `tests/unit/`, `tests/components/`, `tests/e2e/`.
- Semana 1: configurar Jest + Testing Library, tests de `cart.ts`, validación de formularios.
- Semana 2: tests de componentes, configurar Playwright, E2E del flujo básico.
- Semana 3: E2E completo hasta el pago, casos de error, tests del webhook.

> Los testers **no tocan** código de producción. Si encuentran un bug, lo reportan, no lo arreglan.

Todos se coordinan con los contratos de `src/types/index.ts` y con Pull Requests revisados antes de entrar a `main`.

### 7. Cómo entregamos: flujo Git

- `main` es sagrada: solo recibe código revisado.
- Nunca push directo a `main`.
- Cada PR pasa los tests.
- 1 tarea por commit.
- Resuelve conflictos antes de subir.

Flujo típico:

```bash
git checkout -b tu-nombre      # 1. Crea tu rama
# ... commits pequeños en español ...
git pull origin main           # 2. Trae lo nuevo de main
git merge main                 # 3. Resuelve conflictos localmente
git push origin tu-nombre      # 4. Sube tu rama
# 5. Abre Pull Request en GitHub → tests + review de un compañero → merge a main
```

### 8. Programar con un agente de IA

Orden de trabajo:

1. Lee `AGENTS.md` antes de generar código.
2. Entiende la tarea asignada.
3. Revisa los archivos que ya existen.
4. Genera código siguiendo las reglas.
5. Explica qué hizo y por qué.
6. ¿Dudas? Pregunta antes de asumir.

Qué **NO** hacer con el agente:

- Usar `any` en TypeScript.
- Meter lógica de negocio dentro de componentes.
- Consultar la base sin Prisma.
- Poner API keys en el frontend.
- Hacer commits gigantes.
- Copiar código sin entenderlo.
- Tocar archivos de otro rol sin consultar.
- Dejar `console.log` en código final.
- Crear componentes de más de 100 líneas.

---

## Ojo con las versiones

- Next.js 16: en páginas y rutas dinámicas `params` es una **Promise** → `const { id } = await params`.
  En route handlers usa el helper global `RouteContext<'/api/productos/[id]'>`.
- Tailwind v4: no hay `tailwind.config.ts`; la configuración vive en `src/app/globals.css`.
- Prisma 6: el cliente se regenera con `npx prisma generate` después de cambiar el schema.
- Los ejemplos reales del repo mandan sobre los de este archivo: `src/components/ProductCard.tsx`,
  `src/app/api/productos/route.ts`, `src/lib/cart.ts`, `src/types/index.ts`.

## Reglas Obligatorias

### 1. TypeScript estricto
- SIEMPRE usar tipos explícitos, nunca `any`
- Definir interfaces en `src/types/index.ts`
- Usar tipos de Prisma generados automáticamente

### 2. Programación Orientada a Objetos
- **Encapsulamiento**: propiedades privadas con getters/setters cuando sea necesario
- **Composición**: preferir composición sobre herencia
- **Interfaces**: definir contratos en `src/types/` antes de implementar
- **Responsabilidad única**: cada función/clase hace UNA sola cosa
- **Nombres descriptivos**: `calcularTotalOrden()` no `calc()`

### 3. Estructura de Archivos
- Componentes React: PascalCase (`ProductCard.tsx`)
- Utilidades/lib: camelCase (`cart.ts`, `email.ts`)
- Rutas API: estructura de carpetas (`api/productos/route.ts`)
- Tipos: todo en `src/types/index.ts`

### 4. Convenciones de Código
- Imports: agrupar (React, librerías, componentes, tipos, utilidades)
- Funciones: máximo 30 líneas, si es más largo, dividir
- Componentes: máximo 100 líneas
- Comentarios: solo para explicar "por qué", no "qué"
- No usar `console.log` en código final

### 5. Componentes React
- Usar functional components con hooks
- Props tipadas con interfaces
- No lógica de negocio en componentes (usar hooks personalizados o lib/)
- Tailwind para estilos, no CSS modules

### 6. API Routes
- Validar inputs con Zod
- Retornar respuestas con formato consistente: `{ data, error, message }`
- Manejar errores con try/catch
- Usar Prisma client singleton de `src/lib/prisma.ts`

### 7. Base de Datos
- NUNCA hacer queries sin Prisma
- Usar `include` para relaciones cuando sea necesario
- No exponer datos sensibles en respuestas

### 8. Carrito (localStorage)
- Estructura: `{ items: [{ productoId, varianteId, cantidad, precio, nombre, imagen }] }`
- Funciones en `src/lib/cart.ts`: `agregarItem()`, `quitarItem()`, `actualizarCantidad()`, `limpiarCarrito()`, `obtenerCarrito()`
- Sincronizar con estado de React (context o estado local)

### 9. Pruebas
- Tests unitarios para funciones de `src/lib/`
- Tests de componentes para UI
- Tests E2E para flujos completos
- Usar Jest + Testing Library + Playwright

### 10. Seguridad
- NUNCA exponer API keys en el frontend
- Validar TODOS los inputs del usuario
- Sanitizar datos antes de guardar en DB
- Usar variables de entorno para secrets

## Ejemplos de Código Esperado

### Interfaz TypeScript (src/types/index.ts)
```typescript
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

export interface IVariante {
  id: number;
  sku: string;
  condicion?: string;
  color?: string;
  stock: number;
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
```

### Componente React (src/components/ProductCard.tsx)
```typescript
import Link from 'next/link';
import type { IProducto } from '@/types';

interface ProductCardProps {
  producto: IProducto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <Link href={`/productos/${producto.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{producto.nombre}</h3>
          <p className="text-gray-600 text-sm mt-1">{precioFormateado}</p>
          <div className="flex gap-2 mt-2">
            {producto.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### Función de Carrito (src/lib/cart.ts)
```typescript
import type { ICarritoItem } from '@/types';

const CART_KEY = 'ecommerce-cart';

export function obtenerCarrito(): ICarritoItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function agregarItem(nuevoItem: ICarritoItem): void {
  const carrito = obtenerCarrito();
  const existente = carrito.find(
    (item) => item.productoId === nuevoItem.productoId && item.varianteId === nuevoItem.varianteId
  );

  if (existente) {
    existente.cantidad += nuevoItem.cantidad;
  } else {
    carrito.push(nuevoItem);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

export function quitarItem(productoId: number, varianteId: number): void {
  const carrito = obtenerCarrito();
  const filtrado = carrito.filter(
    (item) => !(item.productoId === productoId && item.varianteId === varianteId)
  );
  localStorage.setItem(CART_KEY, JSON.stringify(filtrado));
}

export function limpiarCarrito(): void {
  localStorage.removeItem(CART_KEY);
}
```

### API Route (src/app/api/productos/route.ts)
```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        categoria: true,
        variantes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
```

## Qué NO Hacer

- ❌ Usar `any` en TypeScript
- ❌ Lógica de negocio en componentes React
- ❌ Queries directas a la base de datos sin Prisma
- ❌ Exponer API keys en el frontend
- ❌ Commits gigantes (máximo 1 tarea por commit)
- ❌ Copiar código sin entenderlo
- ❌ Modificar archivos fuera de tu área de responsabilidad sin consultar
- ❌ Usar `console.log` en código final
- ❌ Crear componentes de más de 100 líneas
- ❌ Funciones de más de 30 líneas

## Flujo de Trabajo con Agente

1. Leer este archivo AGENTS.md antes de generar código
2. Entender la tarea asignada
3. Revisar los archivos existentes relacionados
4. Generar código siguiendo las reglas
5. Explicar qué hizo y por qué
6. Si hay dudas, preguntar antes de asumir

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
