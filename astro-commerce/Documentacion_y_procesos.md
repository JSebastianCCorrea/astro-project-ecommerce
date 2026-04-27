Resumen de trabajo realizado
Se confirmo la configuracion SSR en Astro con adaptador Node en modo standalone.
Se mantuvo la pagina principal basada en Layout.astro y Welcome.astro.
Se centralizo el consumo de API con apiFetch y servicios por dominio.
Se definieron tipos de datos compartidos para mantener coherencia.
Se consolido un sistema de estilos globales y utilidades de UI.
Infraestructura general
Proyecto Astro ubicado en astro-commerce/apps/web.
Salida server con adaptador @astrojs/node en modo standalone.
Consumo de API externo con URL base desde import.meta.env.PUBLIC_API_URL y fallback a http://localhost:4000/api.
Instalacion de librerias y requerimientos
Requerimientos minimos:

Node.js >=22.12.0 (definido en astro-commerce/apps/web/package.json).
npm como gestor de paquetes (existe package-lock.json).
Variable PUBLIC_API_URL si se requiere un API distinto al default.
Pasos en consola (PowerShell):

cd astro-commerce/apps/web
node -v para validar que cumple >=22.12.0
npm -v para validar que npm esta disponible
npm install para instalar dependencias segun package-lock.json
Para nuevas librerias:
npm install <paquete> para dependencias de runtime
npm install -D <paquete> para dependencias de desarrollo
Validaciones y pruebas
Validaciones paso a paso:

node -v debe cumplir >=22.12.0.
node -p "process.platform + ' ' + process.arch" debe coincidir con el entorno (ej. win32 x64).
npm install no debe cambiar package-lock.json si todo esta sincronizado.
npm ls --depth=0 debe listar dependencias sin errores.
npm outdated muestra si hay versiones nuevas; si aparece salida, decidir si actualizar.
Pruebas funcionales minimas:

npm run build para validar el build SSR.
npm run preview para validar el bundle generado.
npm run dev para smoke test local y revisar la pagina principal.
Estructura y correspondencia de archivos
astro-commerce/apps/web/astro.config.mjs: define salida SSR y adaptador Node.
astro-commerce/apps/web/src/pages/index.astro: pagina principal, compone layout y contenido inicial.
astro-commerce/apps/web/src/layouts/Layout.astro: layout HTML base con head, body y slot.
astro-commerce/apps/web/src/components/Welcome.astro: componente UI inicial con estilos locales.
astro-commerce/apps/web/src/services/auth.ts: funciones de autenticacion.
astro-commerce/apps/web/src/services/products.ts: funciones de productos.
astro-commerce/apps/web/src/lib/fetcher.ts: wrapper de fetch con headers y manejo de errores.
astro-commerce/apps/web/src/lib/config.ts: fuente de configuracion para API_URL.
astro-commerce/apps/web/src/types/index.ts: contratos de datos (user, product, authResponse).
astro-commerce/apps/web/src/styles/global.css: sistema de estilos globales (tokens y utilidades).
Flujo de ejecucion
Astro inicia con astro.config.mjs y levanta el servidor Node.
Al solicitar la ruta /, se renderiza src/pages/index.astro.
index.astro compone Layout.astro y el componente Welcome.astro.
Los componentes UI pueden consumir datos via servicios en src/services/*.
Cada servicio delega la peticion HTTP a apiFetch en src/lib/fetcher.ts.
apiFetch arma la URL con API_URL, agrega headers JSON y propaga errores HTTP.
Las respuestas tipadas se describen en src/types/index.ts para mantener coherencia.
Componentes y paginas
index.astro
Importa Layout y Welcome.
Renderiza la pagina principal colocando Welcome dentro del Layout.
Mantiene el flujo basico sin logica adicional para la pagina inicial.
Layout.astro
Define el HTML base con <!doctype html>, html, head y body.
Configura el idioma de la pagina en lang="en".
Incluye metadatos de charset, viewport y generador de Astro.
Define el titulo Astro Basics y enlaces a favicon.
Usa slot para renderizar contenido interno.
Contiene estilos locales para asegurar que html y body ocupen el 100% del alto.
Welcome.astro
Carga recursos locales astro.svg y background.svg.
Estructura principal con #container, main y seccion #hero.
Presenta enlaces a documentacion y comunidad con estilos locales.
Incluye una tarjeta informativa #news con titulo y descripcion.
Define estilos locales para layout, tipografia, botones y responsive.
Servicios y utilidades
auth.ts
loginUser(email, password): POST a /auth/login, retorna authResponse.
registerUser(name, email, password): POST a /auth/register, retorna authResponse.
Ambas funciones dependen de apiFetch para consistencia de headers y errores.
products.ts
getProducts(): GET a /products, retorna product[].
getProduct(id): GET a /products/${id}, retorna product.
createProduct(product): POST a /products, retorna product.
Mantiene el mismo contrato de tipos y el mismo wrapper HTTP.
fetcher.ts
apiFetch<T>(path, options, token): funcion generica para peticiones HTTP.
Usa API_URL para construir la URL de la peticion.
Inserta Content-Type: application/json y Authorization si se pasa token.
Lanza error cuando response.ok es falso para un flujo uniforme.
Retorna el JSON tipado como Promise<T>.
config.ts
API_URL: obtiene la URL base desde PUBLIC_API_URL o usa http://localhost:4000/api.
Tipos y contratos
userRole: union de "customer" y "admin".
user: define id, name, email, password, role.
product: define id, slug, name, description, price, stock, category, imageUrl, featured.
authResponse: define token y user.
Estilos y presentacion
global.css
Tokens base en :root: colores, sombras, radius y ancho maximo.
Reset ligero: *, html, body, a, img, button, input, select, textarea.
Contenedores: .container y .section para layout general.
Utilidades de UI: .card, .grid, .grid-2, .grid-3.
Botones: .btn, .btn-primary, .btn-outline con estados hover.
Inputs: .input, .select con foco y padding.
Hero: .hero, .hero_wrap, .badge.
Header y nav: .site-header, .site-header__inner, .nav, .logo.
Tarjetas de producto: .product-card, .product-card__image, .product-card__meta, .price.
Dashboard: .dashboard-grid, .sidebar, .kpi.
Footer: .footer.
Responsive: reglas para max-width: 900px ajustando hero y dashboard.
Notas de coherencia y mantenimiento
Los servicios deben seguir usando apiFetch para mantener el mismo manejo de errores.
Los tipos en src/types/index.ts son la fuente unica de verdad para respuestas del API.
Cualquier nueva pagina debe componer Layout.astro para mantener el HTML base.
