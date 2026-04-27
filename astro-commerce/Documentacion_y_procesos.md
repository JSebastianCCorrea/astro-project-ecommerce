## Infraestructura general

- Proyecto Astro en `astro-commerce/apps/web` con salida `server` y adaptador Node en modo `standalone`.
- Frontend consume un API externo; la URL base viene de `import.meta.env.PUBLIC_API_URL` y tiene fallback a `http://localhost:4000/api`.

## Instalacion de librerias y requerimientos (consola)

Requerimientos minimos del proyecto:

- Node.js `>=22.12.0` (definido en `astro-commerce/apps/web/package.json`).
- npm como gestor (existe `package-lock.json`).
- Variable `PUBLIC_API_URL` si se requiere un API distinto al default.

Pasos en consola (PowerShell):

1. `cd astro-commerce/apps/web`
2. `node -v` (validar que cumple `>=22.12.0`)
3. `npm -v` (validar que npm esta disponible)
4. `npm install` (instala dependencias segun `package-lock.json`)
5. Para nuevas librerias:
   - `npm install <paquete>` (dependencia de runtime)
   - `npm install -D <paquete>` (dependencia de desarrollo)

## Validaciones y pruebas (actualizacion y kernels)

Validaciones paso a paso para confirmar que todo este actualizado y que el runtime corresponde:

1. `node -v` debe cumplir `>=22.12.0`.
2. `node -p "process.platform + ' ' + process.arch"` debe coincidir con el entorno (ej. `win32 x64`).
3. `npm install` no debe cambiar `package-lock.json` si todo esta sincronizado.
4. `npm ls --depth=0` debe listar dependencias sin errores.
5. `npm outdated` muestra si hay versiones nuevas; si aparece salida, decidir si actualizar.

Pruebas funcionales minimas:

1. `npm run build` para validar el build SSR.
2. `npm run preview` para validar el bundle generado.
3. `npm run dev` para smoke test local y revisar la pagina principal.

## Estructura y correspondencia de archivos

- `astro-commerce/apps/web/astro.config.mjs`: configura el runtime (SSR server) y el adaptador Node.
- `astro-commerce/apps/web/src/pages/index.astro`: pagina principal; orquesta el layout y el componente inicial.
- `astro-commerce/apps/web/src/layouts/Layout.astro`: layout HTML base (head + body + slot).
- `astro-commerce/apps/web/src/components/Welcome.astro`: componente UI de bienvenida (contenido y estilos locales).
- `astro-commerce/apps/web/src/services/auth.ts`: servicios de autenticacion (login y registro).
- `astro-commerce/apps/web/src/services/products.ts`: servicios de productos (listar, detalle, crear).
- `astro-commerce/apps/web/src/lib/fetcher.ts`: wrapper de `fetch` con headers JSON y manejo de errores.
- `astro-commerce/apps/web/src/lib/config.ts`: fuente de configuracion para `API_URL`.
- `astro-commerce/apps/web/src/types/index.ts`: contratos de datos (`user`, `product`, `authResponse`).
- `astro-commerce/apps/web/src/styles/global.css`: sistema de estilos global (tokens, layout, utilidades).

## Flujo de ejecucion (coherencia de codigo)

1. Astro inicia con `astro.config.mjs` y levanta el servidor Node.
2. Al solicitar la ruta `/`, se renderiza `src/pages/index.astro`.
3. `index.astro` compone `Layout.astro` y el componente `Welcome.astro`.
4. Los componentes UI pueden consumir datos via servicios en `src/services/*`.
5. Cada servicio delega la peticion HTTP a `apiFetch` en `src/lib/fetcher.ts`.
6. `apiFetch` arma la URL con `API_URL`, agrega headers JSON y propaga errores HTTP.
7. Las respuestas tipadas se describen en `src/types/index.ts` para mantener coherencia.

## Modulos y logica de negocio

### `auth.ts`
- `loginUser(email, password)`: POST a `/auth/login`, retorna `authResponse`.
- `registerUser(name, email, password)`: POST a `/auth/register`, retorna `authResponse`.
- Ambas funciones dependen de `apiFetch` para consistencia de headers y errores.

### `products.ts`
- `getProducts()`: GET a `/products`, retorna `product[]`.
- `getProduct(id)`: GET a `/products/{id}`, retorna `product`.
- `createProduct(product)`: POST a `/products`, retorna `product`.
- Mantiene el mismo contrato de tipos y el mismo wrapper HTTP.

### `fetcher.ts`
- Centraliza la logica de red para evitar duplicacion en servicios.
- Inserta `Content-Type: application/json` y `Authorization` si se pasa `token`.
- Lanza error cuando `response.ok` es falso para un flujo de error uniforme.

## Estilos y presentacion

- `global.css` define tokens (`--primary`, `--text`, `--radius`, etc.) y utilidades (`.grid`, `.btn`, `.card`).
- Los estilos locales del componente `Welcome.astro` permanecen encapsulados, mientras lo global aporta consistencia visual.

## Notas de coherencia y mantenimiento

- Los servicios deben seguir usando `apiFetch` para mantener el mismo manejo de errores.
- Los tipos en `src/types/index.ts` son la fuente unica de verdad para respuestas del API.
- Cualquier nueva pagina debe componer `Layout.astro` para mantener el HTML base.
