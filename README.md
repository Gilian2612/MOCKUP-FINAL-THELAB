# The Lab Perfumes

[🇪🇸 Leer en español](#español) · [🇬🇧 Read in English](#english)

---

<a id="español"></a>

## Español

[↓ Ir a la versión en inglés](#english)

Sitio web de **The Lab Perfumes**, casa de perfumería independiente entre Bogotá y Dubái. Catálogo de fragancias, historia de la marca ("The House"), bitácora ("Journal"), red de puntos de venta ("Stockists") y checkout.

> ⚠️ Este proyecto está conectado a [Lovable](https://lovable.dev). Los commits subidos a la rama conectada se sincronizan con el editor de Lovable.

### Stack

| Tecnología | Versión | Uso |
| --- | --- | --- |
| [TanStack Start](https://tanstack.com/start) | `^1.168.60` | Framework full-stack (SSR + enrutamiento basado en archivos) sobre Vite. |
| [TanStack Router](https://tanstack.com/router) | `^1.170.18` | Enrutamiento tipado. |
| [TanStack Query](https://tanstack.com/query) | `^5.101.1` | Manejo de estado asíncrono y obtención de datos. |
| [React](https://react.dev) | `^19.2.0` | Librería de UI. |
| [TypeScript](https://www.typescriptlang.org) | `^5.8.3` | Tipado estático. |
| [Vite](https://vitejs.dev) | `^8.1.5` | Bundler y servidor de desarrollo. |
| [Nitro](https://nitro.unjs.io) | `3.0.260603-beta` | Build de salida del servidor, con Cloudflare como objetivo por defecto. |
| [Tailwind CSS](https://tailwindcss.com) | `^4.2.1` | Estilos utilitarios. |
| [shadcn/ui](https://ui.shadcn.com) (estilo `new-york`) + [Radix UI](https://www.radix-ui.com) | varios | Componentes de UI accesibles (acordeones, diálogos, tabs, etc). |
| [Lucide](https://lucide.dev) | `^0.575.0` | Iconos. |
| [Framer Motion](https://www.framer.com/motion) | `^13.1.0` | Animaciones. |
| [MapLibre GL](https://maplibre.org) | `^6.1.0` | Mapa de stockists. |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | `^7.71.2` / `^3.24.2` | Formularios y validación. |
| [Recharts](https://recharts.org) | `^2.15.4` | Gráficas (componente `chart` de shadcn). |
| [Embla Carousel](https://www.embla-carousel.com) | `^8.6.0` | Carruseles. |
| [Sonner](https://sonner.emilkowal.ski) | `^2.0.7` | Notificaciones toast. |
| [date-fns](https://date-fns.org) | `^4.1.0` | Utilidades de fecha. |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | `^9.32.0` / `^3.7.3` | Linting y formato. |
| [@lovable.dev/vite-tanstack-config](https://lovable.dev) | `^2.8.5` | Configuración base de Vite/TanStack usada por Lovable (plugins de TanStack Start, devtools, Tailwind, alias `@`, dedupe de React, etc). |

**Runtime:** Node.js `24.x` · gestores de paquetes soportados: `npm` (lockfile principal) y `bun` (lockfile alterno).

### Desarrollo local

Instalar Node.js (recomendado vía [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)) y luego ejecutar:

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

#### Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Levantar el servidor de desarrollo con Vite. |
| `npm run build` | Generar el build de producción. |
| `npm run build:dev` | Generar el build en modo desarrollo (sin minificar). |
| `npm run preview` | Servir el build de producción localmente. |
| `npm run lint` | Correr ESLint sobre todo el proyecto. |
| `npm run format` | Formatear el código con Prettier. |

### Estructura del proyecto

```
src/
├── routes/        # Rutas (file-based routing de TanStack Start)
├── components/    # Componentes de la app + components/ui (shadcn)
├── context/       # React Context providers
├── lib/           # Datos, utilidades y helpers
├── i18n/          # Traducciones ES/EN
├── hooks/         # Hooks personalizados
├── fonts/         # Tipografías propias (.ttf)
├── assets/        # Imágenes y recursos estáticos
├── styles.css     # Estilos globales / variables de Tailwind
├── router.tsx     # Creación del router de TanStack
├── routeTree.gen.ts  # Árbol de rutas autogenerado (no editar a mano)
├── server.ts      # Entry point SSR (wrapper de manejo de errores)
└── start.ts       # Bootstrap de TanStack Start
```

#### `src/routes/` — Páginas

Enrutamiento basado en archivos de TanStack Start: cada `.tsx` define una ruta. No usar `src/pages/` ni convenciones de Next.js/Remix. El layout raíz es `__root.tsx`.

| Archivo | Ruta | Contenido |
| --- | --- | --- |
| `__root.tsx` | — (shell) | Layout raíz, `<Outlet />`, providers globales. |
| `index.tsx` | `/` | Landing page. |
| `house.index.tsx` | `/house` | "The House": historia de la marca, fundador Mario Galindo, método del atelier. |
| `fragrances.index.tsx` | `/fragrances` | Catálogo de fragancias. |
| `fragrances.$slug.tsx` | `/fragrances/:slug` | Detalle de producto (ficha, specs, carrito). |
| `journal.index.tsx` | `/journal` | Bitácora / galería e integración con Instagram. |
| `stockists.index.tsx` | `/stockists` | Puntos de venta por región + mapa interactivo (MapLibre). |
| `checkout.index.tsx` | `/checkout` | Resumen de carrito y checkout. |
| `README.md` | — | Convenciones de enrutamiento de TanStack Start. |

#### `src/components/`

| Archivo | Contenido |
| --- | --- |
| `SiteNav.tsx` | Barra de navegación. |
| `SiteFooter.tsx` | Pie de página. |
| `CartDrawer.tsx` | Panel lateral del carrito. |
| `FilmBackdrop.tsx` | Fondo/efecto visual tipo película usado en las páginas. |
| `SpecAccordion.tsx` | Acordeón de especificaciones de producto (notas, familia olfativa, etc). |
| `StockistMapRotating.tsx` | Mapa 3D de stockists (MapLibre), con rotación. |
| `perfumeMarker.ts` | Generación del marcador/ícono usado en el mapa. |
| `ui/` | Componentes base de shadcn/ui (Radix + Tailwind): botones, diálogos, tabs, carrusel, etc. |

#### `src/context/`

| Archivo | Contenido |
| --- | --- |
| `LanguageContext.tsx` | Estado global de idioma (ES/EN), consumido vía `useLanguage()`. |
| `ThemeContext.tsx` | Estado global de tema claro/oscuro. |
| `CartContext.tsx` | Estado global del carrito de compras (`useCart()`). |

#### `src/lib/`

| Archivo | Contenido |
| --- | --- |
| `products.ts` | Datos de productos, formato de precios (`formatAED`), búsqueda de producto/adyacentes por slug. |
| `stockists.ts` | Datos de puntos de venta, agrupación por región, URLs de Google Maps. |
| `utils.ts` | Utilidades compartidas (p. ej. `cn` para clases de Tailwind). |
| `error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts` | Captura y reporte de errores en runtime/SSR, integrado con Lovable. |

#### `src/i18n/`

| Archivo | Contenido |
| --- | --- |
| `translations.ts` | Diccionario de textos en español e inglés usado por `LanguageContext`. |

#### Otros

- `src/hooks/use-mobile.tsx` — hook para detectar viewport móvil.
- `src/fonts/` — tipografías propias: `LaPresse.ttf`, `SpecialElite-Regular.ttf`.
- `src/assets/` — imágenes del sitio (fondos, galería, `story/light` y `story/dark` para modo claro/oscuro, `notes`).

### Configuración

| Archivo | Propósito |
| --- | --- |
| `vite.config.ts` | Configurar TanStack Start sobre `@lovable.dev/vite-tanstack-config` (ya incluye plugins de TanStack Start, Tailwind, alias `@`, Nitro apuntando a Cloudflare, etc). Excluir `maplibre-gl` del pre-bundling para evitar problemas con su worker. |
| `components.json` | Configuración de shadcn/ui (estilo `new-york`, iconos Lucide, alias de rutas). |
| `tsconfig.json` | TypeScript en modo estricto, alias `@/*` → `src/*`. |
| `eslint.config.js` | Reglas de lint (React Hooks, React Refresh, Prettier). |
| `.prettierrc`, `.prettierignore` | Formato de código. |
| `bunfig.toml` | Configuración de Bun para instalación de paquetes (guardia de 24h contra paquetes recién publicados). |
| `AGENTS.md` | Reglas para agentes de IA que trabajan en el repo (no reescribir historial publicado, ya que sincroniza con Lovable). |

### Build con Lovable

- **Edición visual**: abrir el proyecto en el [editor de Lovable](https://lovable.dev) para seguir construyendo con prompts.
- **Sincronización**: conectar el repo a GitHub para que cada cambio hecho en Lovable se commitee directo al repositorio, y viceversa.
- **Propiedad total**: el código es del usuario. Hacer push al repositorio para sincronizar los cambios de vuelta a Lovable.

> ⚠️ No reescribir historial ya publicado (force push, rebase/amend/squash de commits ya subidos) — eso reescribe el historial del lado de Lovable y se puede perder el historial del proyecto.

[↑ Volver arriba](#the-lab-perfumes)

---

<a id="english"></a>

## English

[↑ Go to the Spanish version](#español)

Website for **The Lab Perfumes**, an independent perfume house between Bogotá and Dubai. Fragrance catalog, brand story ("The House"), blog ("Journal"), stockist network, and checkout.

> ⚠️ This project is connected to [Lovable](https://lovable.dev). Commits pushed to the connected branch sync back to the Lovable editor.

### Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| [TanStack Start](https://tanstack.com/start) | `^1.168.60` | Full-stack framework (SSR + file-based routing) on top of Vite. |
| [TanStack Router](https://tanstack.com/router) | `^1.170.18` | Type-safe routing. |
| [TanStack Query](https://tanstack.com/query) | `^5.101.1` | Async state management and data fetching. |
| [React](https://react.dev) | `^19.2.0` | UI library. |
| [TypeScript](https://www.typescriptlang.org) | `^5.8.3` | Static typing. |
| [Vite](https://vitejs.dev) | `^8.1.5` | Bundler / dev server. |
| [Nitro](https://nitro.unjs.io) | `3.0.260603-beta` | Server build output, Cloudflare target by default. |
| [Tailwind CSS](https://tailwindcss.com) | `^4.2.1` | Utility-first styling. |
| [shadcn/ui](https://ui.shadcn.com) (`new-york` style) + [Radix UI](https://www.radix-ui.com) | various | Accessible UI primitives (accordions, dialogs, tabs, etc). |
| [Lucide](https://lucide.dev) | `^0.575.0` | Icons. |
| [Framer Motion](https://www.framer.com/motion) | `^13.1.0` | Animations. |
| [MapLibre GL](https://maplibre.org) | `^6.1.0` | Stockists map. |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | `^7.71.2` / `^3.24.2` | Forms and validation. |
| [Recharts](https://recharts.org) | `^2.15.4` | Charts (shadcn `chart` component). |
| [Embla Carousel](https://www.embla-carousel.com) | `^8.6.0` | Carousels. |
| [Sonner](https://sonner.emilkowal.ski) | `^2.0.7` | Toast notifications. |
| [date-fns](https://date-fns.org) | `^4.1.0` | Date utilities. |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | `^9.32.0` / `^3.7.3` | Linting and formatting. |
| [@lovable.dev/vite-tanstack-config](https://lovable.dev) | `^2.8.5` | Shared Vite/TanStack config used by Lovable (TanStack Start plugins, devtools, Tailwind, `@` alias, React dedupe, etc). |

**Runtime:** Node.js `24.x` · supported package managers: `npm` (primary lockfile) and `bun` (alternate lockfile).

### Local development

Install Node.js (recommended via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)), then run:

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

#### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server. |
| `npm run build` | Generate the production build. |
| `npm run build:dev` | Generate the build in development mode (unminified). |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |
| `npm run format` | Format the code with Prettier. |

### Project structure

```
src/
├── routes/        # Routes (TanStack Start file-based routing)
├── components/    # App components + components/ui (shadcn)
├── context/       # React Context providers
├── lib/           # Data, utilities, and helpers
├── i18n/          # ES/EN translations
├── hooks/         # Custom hooks
├── fonts/         # Custom typefaces (.ttf)
├── assets/        # Images and static assets
├── styles.css     # Global styles / Tailwind variables
├── router.tsx     # TanStack router setup
├── routeTree.gen.ts  # Auto-generated route tree (do not edit by hand)
├── server.ts      # SSR entry point (error-handling wrapper)
└── start.ts       # TanStack Start bootstrap
```

#### `src/routes/` — Pages

File-based routing from TanStack Start: each `.tsx` file defines a route. Do not use `src/pages/` or Next.js/Remix conventions. The root layout is `__root.tsx`.

| File | Route | Content |
| --- | --- | --- |
| `__root.tsx` | — (shell) | Root layout, `<Outlet />`, global providers. |
| `index.tsx` | `/` | Landing page. |
| `house.index.tsx` | `/house` | "The House": brand story, founder Mario Galindo, atelier method. |
| `fragrances.index.tsx` | `/fragrances` | Fragrance catalog. |
| `fragrances.$slug.tsx` | `/fragrances/:slug` | Product detail (specs, add to cart). |
| `journal.index.tsx` | `/journal` | Blog / gallery and Instagram embeds. |
| `stockists.index.tsx` | `/stockists` | Stockists by region + interactive map (MapLibre). |
| `checkout.index.tsx` | `/checkout` | Cart summary and checkout. |
| `README.md` | — | TanStack Start routing conventions. |

#### `src/components/`

| File | Content |
| --- | --- |
| `SiteNav.tsx` | Site navigation bar. |
| `SiteFooter.tsx` | Site footer. |
| `CartDrawer.tsx` | Cart side drawer. |
| `FilmBackdrop.tsx` | Film-grain background effect used across pages. |
| `SpecAccordion.tsx` | Product spec accordion (notes, scent family, etc). |
| `StockistMapRotating.tsx` | Rotating 3D stockists map (MapLibre). |
| `perfumeMarker.ts` | Marker/icon generation used on the map. |
| `ui/` | Base shadcn/ui components (Radix + Tailwind): buttons, dialogs, tabs, carousel, etc. |

#### `src/context/`

| File | Content |
| --- | --- |
| `LanguageContext.tsx` | Global language state (ES/EN), consumed via `useLanguage()`. |
| `ThemeContext.tsx` | Global light/dark theme state. |
| `CartContext.tsx` | Global shopping cart state (`useCart()`). |

#### `src/lib/`

| File | Content |
| --- | --- |
| `products.ts` | Product data, price formatting (`formatAED`), product/adjacent lookup by slug. |
| `stockists.ts` | Stockist data, grouping by region, Google Maps URLs. |
| `utils.ts` | Shared utilities (e.g. `cn` for Tailwind classes). |
| `error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts` | Runtime/SSR error capture and reporting, integrated with Lovable. |

#### `src/i18n/`

| File | Content |
| --- | --- |
| `translations.ts` | Spanish/English text dictionary used by `LanguageContext`. |

#### Other

- `src/hooks/use-mobile.tsx` — hook to detect mobile viewport.
- `src/fonts/` — custom typefaces: `LaPresse.ttf`, `SpecialElite-Regular.ttf`.
- `src/assets/` — site images (backgrounds, gallery, `story/light` and `story/dark` for light/dark mode, `notes`).

### Configuration

| File | Purpose |
| --- | --- |
| `vite.config.ts` | Configure TanStack Start on top of `@lovable.dev/vite-tanstack-config` (already includes TanStack Start plugins, Tailwind, `@` alias, Nitro targeting Cloudflare, etc). Exclude `maplibre-gl` from dep pre-bundling to avoid worker issues. |
| `components.json` | shadcn/ui config (`new-york` style, Lucide icons, path aliases). |
| `tsconfig.json` | Strict TypeScript, `@/*` → `src/*` alias. |
| `eslint.config.js` | Lint rules (React Hooks, React Refresh, Prettier). |
| `.prettierrc`, `.prettierignore` | Code formatting. |
| `bunfig.toml` | Bun install config (24h guard against newly published packages). |
| `AGENTS.md` | Rules for AI agents working in the repo (never rewrite published history, since it syncs with Lovable). |

### Build with Lovable

- **Visual editing**: open the project in the [Lovable editor](https://lovable.dev) to keep building with prompts.
- **Sync**: connect the repo to GitHub so every change made in Lovable is committed straight to the repository, and vice versa.
- **Full ownership**: this code belongs to the user. Push to the repository to sync changes back into Lovable.

> ⚠️ Do not rewrite already-published history (force push, rebase/amend/squash of pushed commits) — it rewrites history on Lovable's side and project history can be lost.

[↑ Back to top](#the-lab-perfumes)
