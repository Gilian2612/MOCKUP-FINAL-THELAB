# The Lab Perfumes

Sitio web de **The Lab Perfumes**, casa de perfumería independiente entre Bogotá y Dubái. Catálogo de fragancias, historia de la marca ("The House"), bitácora ("Journal"), red de puntos de venta ("Stockists") y checkout.

Website for **The Lab Perfumes**, an independent perfume house between Bogotá and Dubai. Fragrance catalog, brand story ("The House"), blog ("Journal"), stockist network, and checkout.

> Este proyecto está conectado a [Lovable](https://lovable.dev). Los commits que se suben a la rama conectada se sincronizan con el editor de Lovable.
> This project is connected to [Lovable](https://lovable.dev). Commits pushed to the connected branch sync back to the Lovable editor.

---

## Stack / Tech stack

| Tecnología / Technology | Versión / Version | Uso / Purpose |
| --- | --- | --- |
| [TanStack Start](https://tanstack.com/start) | `^1.168.60` | Framework full-stack (SSR + file-based routing) sobre Vite. / Full-stack framework (SSR + file-based routing) on top of Vite. |
| [TanStack Router](https://tanstack.com/router) | `^1.170.18` | Enrutamiento tipado. / Type-safe routing. |
| [TanStack Query](https://tanstack.com/query) | `^5.101.1` | Manejo de estado asíncrono / data fetching. / Async state management / data fetching. |
| [React](https://react.dev) | `^19.2.0` | Librería de UI. / UI library. |
| [TypeScript](https://www.typescriptlang.org) | `^5.8.3` | Tipado estático. / Static typing. |
| [Vite](https://vitejs.dev) | `^8.1.5` | Bundler / dev server. |
| [Nitro](https://nitro.unjs.io) | `3.0.260603-beta` | Servidor/build de salida, objetivo por defecto Cloudflare. / Server build output, Cloudflare target by default. |
| [Tailwind CSS](https://tailwindcss.com) | `^4.2.1` | Estilos utilitarios. / Utility-first styling. |
| [shadcn/ui](https://ui.shadcn.com) (estilo `new-york`) + [Radix UI](https://www.radix-ui.com) | varios / various | Componentes de UI accesibles (acordeones, diálogos, tabs, etc). / Accessible UI primitives (accordions, dialogs, tabs, etc). |
| [Lucide](https://lucide.dev) | `^0.575.0` | Iconos. / Icons. |
| [Framer Motion](https://www.framer.com/motion) | `^13.1.0` | Animaciones. / Animations. |
| [MapLibre GL](https://maplibre.org) | `^6.1.0` | Mapa de stockists. / Stockists map. |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | `^7.71.2` / `^3.24.2` | Formularios y validación. / Forms and validation. |
| [Recharts](https://recharts.org) | `^2.15.4` | Gráficas (componente `chart` de shadcn). / Charts (shadcn `chart` component). |
| [Embla Carousel](https://www.embla-carousel.com) | `^8.6.0` | Carruseles. / Carousels. |
| [Sonner](https://sonner.emilkowal.ski) | `^2.0.7` | Notificaciones toast. / Toast notifications. |
| [date-fns](https://date-fns.org) | `^4.1.0` | Utilidades de fecha. / Date utilities. |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | `^9.32.0` / `^3.7.3` | Linting y formato. / Linting and formatting. |
| [@lovable.dev/vite-tanstack-config](https://lovable.dev) | `^2.8.5` | Configuración base de Vite/TanStack usada por Lovable (plugins de TanStack Start, devtools, Tailwind, alias `@`, dedupe de React, etc). / Shared Vite/TanStack config used by Lovable (TanStack Start plugins, devtools, Tailwind, `@` alias, React dedupe, etc). |

**Runtime:** Node.js `24.x` · gestores de paquetes soportados: `npm` (lockfile principal) y `bun` (lockfile alterno). / **Runtime:** Node.js `24.x` · supported package managers: `npm` (primary lockfile) and `bun` (alternate lockfile).

---

## Desarrollo local / Local development

Requiere Node.js (recomendado vía [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).
Requires Node.js (recommended via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

### Scripts

| Comando / Command | Descripción / Description |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con Vite. / Vite dev server. |
| `npm run build` | Build de producción. / Production build. |
| `npm run build:dev` | Build en modo desarrollo (sin minificar). / Build in development mode (unminified). |
| `npm run preview` | Sirve el build de producción localmente. / Serves the production build locally. |
| `npm run lint` | Corre ESLint sobre todo el proyecto. / Runs ESLint across the project. |
| `npm run format` | Formatea el código con Prettier. / Formats the code with Prettier. |

---

## Estructura del proyecto / Project structure

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

### `src/routes/` — Páginas / Pages

Enrutamiento basado en archivos de TanStack Start. Cada `.tsx` define una ruta; no se usan `src/pages/` ni convenciones de Next.js/Remix. El layout raíz es `__root.tsx`.
File-based routing from TanStack Start. Each `.tsx` defines a route; `src/pages/` and Next.js/Remix conventions are not used. The root layout is `__root.tsx`.

| Archivo / File | Ruta / URL | Contenido / Content |
| --- | --- | --- |
| `__root.tsx` | — (shell) | Layout raíz, `<Outlet />`, providers globales. / Root layout, `<Outlet />`, global providers. |
| `index.tsx` | `/` | Landing page. |
| `house.index.tsx` | `/house` | "The House": historia de la marca, fundador Mario Galindo, método del atelier. / Brand story, founder Mario Galindo, atelier method. |
| `fragrances.index.tsx` | `/fragrances` | Catálogo de fragancias. / Fragrance catalog. |
| `fragrances.$slug.tsx` | `/fragrances/:slug` | Detalle de producto (ficha, specs, carrito). / Product detail (specs, add to cart). |
| `journal.index.tsx` | `/journal` | Bitácora / galería e integración con Instagram. / Blog / gallery and Instagram embeds. |
| `stockists.index.tsx` | `/stockists` | Puntos de venta por región + mapa interactivo (MapLibre). / Stockists by region + interactive map (MapLibre). |
| `checkout.index.tsx` | `/checkout` | Resumen de carrito y checkout. / Cart summary and checkout. |
| `README.md` | — | Convenciones de enrutamiento de TanStack Start. / TanStack Start routing conventions. |

### `src/components/`

| Archivo / File | Contenido / Content |
| --- | --- |
| `SiteNav.tsx` | Barra de navegación. / Site navigation bar. |
| `SiteFooter.tsx` | Pie de página. / Site footer. |
| `CartDrawer.tsx` | Panel lateral del carrito. / Cart side drawer. |
| `FilmBackdrop.tsx` | Fondo/efecto visual tipo película usado en las páginas. / Film-grain background effect used across pages. |
| `SpecAccordion.tsx` | Acordeón de especificaciones de producto (notas, familia olfativa, etc). / Product spec accordion (notes, scent family, etc). |
| `StockistMapRotating.tsx` | Mapa 3D de stockists (MapLibre), con rotación. / Rotating 3D stockists map (MapLibre). |
| `perfumeMarker.ts` | Generación del marcador/ícono usado en el mapa. / Marker/icon generation used on the map. |
| `ui/` | Componentes base de shadcn/ui (Radix + Tailwind): botones, diálogos, tabs, carrusel, etc. / Base shadcn/ui components (Radix + Tailwind): buttons, dialogs, tabs, carousel, etc. |

### `src/context/`

| Archivo / File | Contenido / Content |
| --- | --- |
| `LanguageContext.tsx` | Estado global de idioma (ES/EN) consumido por `useLanguage()`. / Global language state (ES/EN) consumed via `useLanguage()`. |
| `ThemeContext.tsx` | Estado global de tema claro/oscuro. / Global light/dark theme state. |
| `CartContext.tsx` | Estado global del carrito de compras (`useCart()`). / Global shopping cart state (`useCart()`). |

### `src/lib/`

| Archivo / File | Contenido / Content |
| --- | --- |
| `products.ts` | Datos de productos, formato de precios (`formatAED`), búsqueda de producto/adyacentes por slug. / Product data, price formatting (`formatAED`), product/adjacent lookup by slug. |
| `stockists.ts` | Datos de puntos de venta, agrupación por región, URLs de Google Maps. / Stockist data, grouping by region, Google Maps URLs. |
| `utils.ts` | Utilidades compartidas (p. ej. `cn` para clases de Tailwind). / Shared utilities (e.g. `cn` for Tailwind classes). |
| `error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts` | Captura y reporte de errores en runtime/SSR, integrado con Lovable. / Runtime/SSR error capture and reporting, integrated with Lovable. |

### `src/i18n/`

| Archivo / File | Contenido / Content |
| --- | --- |
| `translations.ts` | Diccionario de textos en español e inglés usado por `LanguageContext`. / Spanish/English text dictionary used by `LanguageContext`. |

### Otros / Other

- `src/hooks/use-mobile.tsx` — hook para detectar viewport móvil. / hook to detect mobile viewport.
- `src/fonts/` — tipografías propias: `LaPresse.ttf`, `SpecialElite-Regular.ttf`. / custom typefaces: `LaPresse.ttf`, `SpecialElite-Regular.ttf`.
- `src/assets/` — imágenes del sitio (fondos, galería, `story/light` y `story/dark` para modo claro/oscuro, `notes`). / site images (backgrounds, gallery, `story/light` and `story/dark` for light/dark mode, `notes`).

---

## Configuración / Configuration

| Archivo / File | Propósito / Purpose |
| --- | --- |
| `vite.config.ts` | Configura TanStack Start sobre `@lovable.dev/vite-tanstack-config` (ya incluye plugins de TanStack Start, Tailwind, alias `@`, Nitro apuntando a Cloudflare, etc). Excluye `maplibre-gl` del pre-bundling para evitar problemas con su worker. / Configures TanStack Start on top of `@lovable.dev/vite-tanstack-config` (already includes TanStack Start plugins, Tailwind, `@` alias, Nitro targeting Cloudflare, etc). Excludes `maplibre-gl` from dep pre-bundling to avoid worker issues. |
| `components.json` | Configuración de shadcn/ui (estilo `new-york`, iconos Lucide, alias de rutas). / shadcn/ui config (`new-york` style, Lucide icons, path aliases). |
| `tsconfig.json` | TypeScript en modo estricto, alias `@/*` → `src/*`. / Strict TypeScript, `@/*` → `src/*` alias. |
| `eslint.config.js` | Reglas de lint (React Hooks, React Refresh, Prettier). / Lint rules (React Hooks, React Refresh, Prettier). |
| `.prettierrc`, `.prettierignore` | Formato de código. / Code formatting. |
| `bunfig.toml` | Config de Bun para instalación de paquetes (guardia de 24h contra paquetes recién publicados). / Bun install config (24h guard against newly published packages). |
| `AGENTS.md` | Reglas para agentes de IA que trabajan en el repo (no reescribir historial publicado, ya que sincroniza con Lovable). / Rules for AI agents working in the repo (never rewrite published history, since it syncs with Lovable). |

---

## Build con Lovable / Build with Lovable

- **Edición visual**: abre el proyecto en el [editor de Lovable](https://lovable.dev) para seguir construyendo con prompts.
  **Visual editing**: open the project in the [Lovable editor](https://lovable.dev) to keep building with prompts.
- **Sincronización**: conecta el repo a GitHub y cada cambio hecho en Lovable se commitea directo al repositorio, y viceversa.
  **Sync**: connect the repo to GitHub and every change made in Lovable is committed straight to the repository, and vice versa.
- **Propiedad total**: el código es tuyo. Haz push a tu repositorio y tus cambios se sincronizan de vuelta a Lovable.
  **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable.

> ⚠️ No reescribas historial ya publicado (force push, rebase/amend/squash de commits ya subidos) — eso reescribe el historial del lado de Lovable y se puede perder el historial del proyecto.
> ⚠️ Do not rewrite already-published history (force push, rebase/amend/squash of pushed commits) — it rewrites history on Lovable's side and project history can be lost.
