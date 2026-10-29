# Ideas de proyecto — ENTRE NOSOTROS

> Este archivo es local y privado. **No se sube a la nube** (ni se commitea) hasta que
> se diga la frase exacta: **"subelo a la nube"**.

---

## prueba1 — Vitrina de audífonos (26/10/2026)

**Portada**
- Arriba a la izquierda: logo `Electro-Hub` + botón de 3 líneas (menú).
- Arriba a la derecha: texto llamativo **"Carrito"** que lleva al carrito.
- Debajo del título: tarjetas interactivas en secuencia, alineadas a la izquierda con
  margen. Cada tarjeta = imagen + nombre debajo.
- Al tocar una tarjeta → se abre una **pestaña nueva** con el detalle de ese artículo.

**Pestaña de detalle**
- El logo NO se quita.
- Imagen arriba a la izquierda.
- A la derecha, un poco más abajo: marca, nombre, descripción y botón
  **"Agregar al carrito"** (color a gusto, por ahora púrpura).
- Al agregar: se guarda la info del artículo elegido en el carrito (el mismo carrito
  que ya existe) y aparece un aviso:
  - **"Quiero pagar"** → ejecuta el flujo de compra existente (`/checkout`).
  - **"Seguir comprando"** → el usuario vuelve a lo que estaba viendo.

**Artículos de la prueba** (precios provisionales, descripciones por definir)

| # | Marca | Nombre | Precio provisorio |
|---|-------|--------|-------------------|
| 1 | G9000 | Audifono Diadema Cascos Gamer G9000 Para Ps4 Y Xbox One | $119.900 |
| 2 | SONY | Audífonos Sony Bluetooth Con Función Manos Libres WH-CH520 - Azul | $249.900 |
| 3 | XIAOMI | Audífonos earbuds Xiaomi Bluetooth Redmi Buds 6 Play | $129.900 |

**Pendiente de ti**: definir las descripciones reales y confirmar/cambiar los precios.

---

## proyecto 2 — Decoración, colores y rebajas (26/10/2026)

**Zona de guardado y facturación**
- "Carrito" en el encabezado manda a la **zona de guardado de pedidos** (`/carrito`),
  donde queda guardado lo que el usuario montó.
- Desde ahí, "Finalizar compra" pasa a la **zona de facturación** (`/checkout`).
- Al dar "Quiero pagar" en el aviso: **se elimina la pestaña del detalle** y el usuario
  queda en la facturación (si la pestaña no se puede cerrar, navega en la misma).

**Decoración de la portada**
- Llamas difuminadas azules que suben desde el fondo, puramente estéticas (no
  interactuables), con juego de perspectiva.
- Título "Destacados" más grande y **centrado**.
- Las **3 rayas (menú) solo aparecen en la portada**.
- Divisor bajo el encabezado: línea difuminada tirando a negro para marcar el inicio.
- Nombres de los artículos en colores propios (el morado no se veía) → amarillo (G9000),
  celeste (SONY), coral (XIAOMI).

**Colores disponibles — Sony WH-CH520 (los "audífonos" empezamos por ahí)**
- **Azul** (por defecto, marcado) → `https://media.falabella.com/falabellaCO/120300311_01/w=1500,h=1500,fit=cover`
- **Negro** → `https://media.falabella.com/falabellaCO/120300131_01/w=1500,h=1500,fit=cover`
- **Rosa** → `https://sony.scene7.com/is/image/sonyglobalsolutions/WH-CH520_Product_intro_Pink_01_M?$productIntroPlatemobile$&fmt=png-alpha`
- Cada color cambia la **imagen**, la **decoración de la página** (luces de fondo) y el
  **botón "Agregar al carrito"**. Animación minimalista de luces al ver el producto.

**Rebajas de precio**
- Artículo con rebaja (G9000): precio anterior tachado + badge de descuento.
- Se ve en la portada, en la página del producto, **en el carrito** y en la facturación.

**Pendiente de ti**: confirmar qué artículo lleva la rebaja y el porcentaje final.

---

## proyecto 3 — Rediseño de portada, categorías y ficha formal (26/10/2026)

**Portada**
- Logo **Electro-Hub centrado** y más presente (decoración sutil estética).
- Las 3 rayas solo en la portada; abajo del encabezado: **"Envío gratis en Colombia"**
  un poco más grande, sin ser llamativo.
- Etiqueta **"Destacados"** pequeña, a la izquierda llegando al medio; debajo los artículos
  **subdivididos por categorías** (Cascos gamer / Audífonos inalámbricos).
- Tarjetas: **solo nombre y precio, sin descripción**, con **perímetro oscuro difuminado**.
- Animación de decoración nueva: **destellitos que suben de abajo hacia arriba** y se
  pierden arriba (estética, no interactiva).

**Colores**
- Los artículos en **rebaja** se pintan de **amarillito** (nombre, badge y precios).
- El color de fondo/decoración de cada producto = **color real de su imagen**
  (G9000 → azul; Sony → el color elegido; Xiaomi → azul profundo moradito por defecto).
- Si un artículo no tiene más colores: **"Este artículo no tiene más colores."** bajo la
  descripción.

**Xiaomi Redmi Buds 6 Play — 3 colores**
- **Azul profundo (default, moradito)** → imagen actual.
- **Azul claro** → `https://exitocol.vtexassets.com/arquivos/ids/26256120/auriculares-xiaomi-redmi-buds-6-play.jpg?v=638715355644030000`
- **Blanco** → `https://exitocol.vtexassets.com/arquivos/ids/24632550/auriculares-xiaomi-redmi-buds-6-play.jpg?v=638617718371900000`
  (fondo de decoración apagado a juego).

**Ficha del producto (formal)**
- Textos sobre paneles redondeados, oscuros y difuminados (fondo de las letras).
- **Compatibilidad** básica de cada dispositivo (investigada en la web).
- **Garantía** debajo del botón del carrito (5 / 2 / 1 años según artículo).
- Decoración de luces en la ficha: colores **opacados, amigables para la vista nocturna**
  y animación distinta a la de la portada.

**Regla entre nosotros**: cada corrección grande es un proyecto nuevo y subimos de número.
**Vamos en: proyecto 3.**

---

## proyecto 4 — Espacios, relacionados, menú cortina y Halloween (26/10/2026)

**Ficha del artículo**
- **Compatibilidad separada de la descripción** y ubicada **debajo de la imagen** del artículo.
- Debajo del artículo: **"Productos relacionados"** en letras pequeñas **amarillas** →
  artículos de la misma categoría, de izquierda a derecha.
- Espacio moderado + **línea divisoria** y debajo otros artículos distintos.
- 🎃 Calabazas sonrientes decorando el logo **Electro-Hub** (atrás y adelante) y en la
  parte de los productos, minimalistas y pequeños.

**Portada**
- "Envío gratis en Colombia" más pequeño y **debajo de "Carrito"** (arriba a la derecha).
- Color de nombres de artículos: **en oferta = amarillito**, **sin promoción = azul**
  (como los audífonos de Sony).

**Menú de las 3 rayas (cortina)**
- Se abre cubriendo **una parte del inicio (≈40%), no todo**.
- Animación: **izquierda → un poco antes del centro** al abrir; **derecha → izquierda**
  al cerrar (vuelve a tocar las 3 rayas y se esconde).
- Adentro, elegante: **barra de búsqueda con lupa** → escribes el nombre y el producto
  aparece **al instante** en el menú; **texto de ayuda** bajo la lupa que se actualiza.
- Debajo (ligeramente tapado por la lupa): **categorías de izquierda a derecha**, nombre
  con **línea azul debajo**; al presionar lleva directo a esa categoría.
- Todo se actualiza solo cuando agreguemos más categorías/productos.

**Encabezado**
- Título, 3 rayas y Carrito **pegados arriba al bajar** (sticky con desenfoque).

**Parche (mismo proyecto 4)**
- La cortina ahora ocupa **toda la pantalla** y sube **de abajo a arriba**.
- Se cierra de dos formas: volviendo a tocar las 3 rayas (ahora en **blanco neón**
  cuando está abierta) o tocando el fondo de afuera de las opciones.
- **Efecto borroso** en el fondo de afuera de las opciones (desenfoque).
- Se eliminó el menú inferior (Inicio / Catálogo completo / Carrito); solo quedan
  la lupa con ayuda, los resultados y las categorías con línea azul.

**Pulido (mismo proyecto 4)**
- Con el menú abierto, el **neón de Electro-Hub y del Carrito cambian a blanco claro**
  (igual que las 3 rayas) y al cerrar vuelven a su color.
- **Animación de destellos a los lados** del rectángulo blanco neón de las 3 rayas.
- La **barra de búsqueda baja** un poco más para que no choque con nada.
- Las **líneas bajo las categorías ahora son de neón** (azul con glow).
- La **Compatibilidad se separa más de la imagen** (misma distancia que sus semejantes).
- Entre **categoría y categoría de la portada** va una **línea diferencial** con "/"
  al centro para que se distingan unas de otras.

**Regla entre nosotros**: cada corrección grande es un proyecto nuevo y subimos de número.
**Vamos en: proyecto 4.**

---

## proyecto 5 — Espacio colorido, animaciones y araña (26/10/2026)

**Ficha del artículo**
- Arreglar: cerca de "Productos relacionados" el fondo **se aclara de repente**;
  toda la pantalla debe quedar **oscurita como antes**.
- Debajo de "Productos relacionados": **orbes de diferentes colores y tamaños**
  (moradas, azules y pequeñitas amarillas), **oscuritas**, y que **entre más
  bajas más oscuro se haga** → sensación de **espacio algo colorido**.

**Portada y catálogo**
- Las **imágenes** de los productos: al **bajar/subir la página** o con el **mouse
  cerca** → animación de **agrandarse un poco** (formal, minimalista).
- Lo mismo con el **catálogo dentro del producto** (relacionados).
- **Decoración de araña con su telaraña** en la **izquierda del todo** del catálogo
  (Halloween, sutil).

**Regla entre nosotros**: cada corrección grande es un proyecto nuevo y subimos de número.
**Vamos en: proyecto 5.**

**Parche (mismo proyecto 5)**
- Logo: con el mouse encima **se agranda** y las **calabazas brincan** (además de
  ponerse en blanco con el menú abierto).
- "Quiero pagar" del aviso ahora manda a **`/carrito`** (la zona de guardado),
  no directo a facturar.
- **Contador** amarillo con el **número de productos agregados** junto al Carrito
  en el encabezado (visible en cualquier página).
- Página del carrito: **encabezado con su salida** y botón **"← Volver al menú"
  siempre visible, con o sin productos**, sin perder lo agregado.

**Parche 2 (mismo proyecto 5) — solo decoración, nada más se toca**
- Dentro de las 3 rayas, sección de búsqueda:
  - Resultados de productos con su **loguito/imagen** del artículo.
  - **Tipografía distinta** en la búsqueda (pixel para lo escrito, mono para la ayuda).
  - Sobre el fondito azul de buscar: **nube espacial con animación** (nebulosa
    morada/azul/cian + estrellitas titilando), se intensifica al escribir.
- **Raya neón blanco** debajo de "Envío gratis en Colombia".
- Logo Electro-Hub: al poner el cursor sobre el título, **color y neón distintos
  más iluminados** (violeta brillante) sin perder lo estético.

**Proyecto 6 — catálogo de tecnología (60 artículos nuevos)**
- 6 categorías nuevas × 10 productos, mismo orden y estructura de siempre:
  **Audífonos, Mesas de PC, Portátiles gamer, Monitores, Pantallas, Televisores**
  (63 artículos en total con la vitrina inicial).
- Imágenes **reales verificadas** (Amazon, Falabella/Éxito, Mercado Libre y
  tiendas oficiales); 2 reemplazadas porque bloquean el referer de localhost
  (Corsair HS60 → Éxito, Xiaomi TV S Mini LED 65" → Kemik).
- **Descuentos variados**: de -15% a -50% y varios sin promoción (la regla
  amarillo en oferta / azul sin promoción se mantiene sola).
- **Dilema del color resuelto como antes**, con foto real por color:
  Sony WH-1000XM5 (Negro/Plata), JBL Tune 770NC (Negro/Azul/Blanco) y
  HyperX Cloud II (Negro/Blanco). Los demás quedan con "Este artículo no
  tiene más colores." (no había foto fiable por color).
- Ficha: **relacionados limitados a 4** y "También te puede gustar" muestra
  **6 de otras categorías** (uno por categoría, en vueltas) — antes con 60
  artículos salían decenas de tarjetas.
- **Garantía por marca** provisional con el mapa `GARANTIAS_POR_MARCA`
  (Sony 2 años, JBL 1, ASUS/ACER/MSI/DELL 2-3, etc.), pisable por artículo.
- Búsqueda del menú actualizada sola: "monitor" da **17 resultados**.
- Archivos: `src/lib/catalogoTecnologia.ts` (datos) y `catalogoDemo.ts`
  (concatena `VITRINA_INICIAL + ARTICULOS_NUEVOS` y limita las filas).
- **No se tocó** el seed de Prisma (`prisma/datosCatalogo`): tiene sus tests
  propios de 6 categorías / 12 productos; actualizarlo es otro proyecto.
- Precios, descripciones y garantías siguen provisionales (pendientes reales).

**Parche 1 (mismo proyecto 6)**
- **Emojis de categoría en la búsqueda del menú**: fuera el 📂 genérico; cada
  categoría trae su emoji relacionado (Audífonos 🎧, Cascos gamer 🎮, Mesas de
  PC 🪑, Portátiles gamer 💻, Monitores 🖥️, Pantallas 📲, Televisores 📺).
  Helper `emojiDeCategoria()` en catalogoDemo.
- **Logo con el menú abierto**: tocar "Electro-Hub" cierra la cortina con la
  misma animación que las 3 rayas (onClick → `setMenuAbierto(false)`) y sigue
  llevando al inicio.
- **Fila "Destacados" real en la portada**: `articulosDestacados()` con ids
  curados — Sony WH-1000XM5 (-18%), Corsair HS60 (-50%), Mesa Homall blanca
  (-50%), ROG Strix G16 (-15%), Odyssey G5 (-23%), LG OLED C4 (-25%): dos
  ofertas del 50% + los más pedidos.
- **"Audífonos inalámbricos" absorbida por "Audífonos"** (Sony WH-CH520 y
  Redmi Buds 6 Play movidos): la portada queda en 7 categorías sin confusión.

**Parche (mismo proyecto 6) — fallo encontrado en la demo en vivo**
- `/carrito` **se rompía** al agregar un producto nuevo: `CartItem.tsx` usaba
  `next/image` y los hosts de las fotos nuevas (Amazon, etc.) no están en
  `next.config.ts` → Runtime Error "hostname not configured".
- Solución: `CartItem` ahora usa `<img>` común, igual que toda la vitrina
  (TarjetaArticulo, DetalleArticulo, MenuCortina). Ahora son **4 warnings** de
  eslint `<img>` (los3 de antes + este), aceptados a propósito.
