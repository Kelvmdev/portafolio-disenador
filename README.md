# Estudio — Portafolio de diseñadora

Portafolio de una diseñadora gráfica (especializada en redes sociales) con **galería en lightbox**, **CMS editable desde el navegador** y **OG + favicon generados en cada build**.

🔗 **En vivo:** https://portafolio-disenador.vercel.app

---

## Qué es

Sitio-portafolio de una página con hero, galería de trabajos (bento grid), bio, servicios y contacto. La dueña edita todo —textos, SEO, trabajos e imágenes— desde un **panel `/admin`**; los cambios se guardan como commit en GitHub y Vercel reconstruye solo.

## Características

- **Galería de trabajos** en *bento grid* con **lightbox** sobre `<dialog>` nativo: navegación por flechas/teclado, contador y backdrop inerte.
- **CMS propio** (`/admin`) — edita nombre, rol, SEO (title/description), hero (titular + métricas), bio, servicios y trabajos, con **subida de imágenes a Cloudinary**.
- **Métricas animadas** en el hero (respetando `prefers-reduced-motion`).
- **Formulario de contacto** con **Formspree**, validación y redirección a `/gracias`.
- **SEO editable** — title/description/keywords desde el JSON y el panel; **JSON-LD `Person`** con `sameAs`, canonical por página, Open Graph y Twitter Card; `sitemap` que excluye `/admin` y `/gracias`.
- **OG y favicon en build** — `prebuild` con Sharp genera `public/og.png` (1200×630), `apple-touch-icon.png` y favicon (SVG + ICO) a partir del `data.json`.
- **Accesible** — skip-link, **foco visible de doble anillo**, `aria-*`, lightbox con foco atrapado y `prefers-reduced-motion`.
- **Contraste AA/AAA** — tinta `#1c1a17` sobre hueso `#fbf8f2` (~17:1) y coral `#c5371a` para acentos (~9:1).
- **Rendimiento** — fuentes self-host (`@fontsource`), imágenes lazy + `decoding="async"` y páginas públicas estáticas.

## Stack

- **Astro 6** (híbrido: público estático + `/admin` y APIs SSR con adapter de Vercel)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **@fontsource** (Instrument Serif + Space Grotesk, self-host) · **Sharp** + **png-to-ico** (OG/favicon en build)
- **GitHub Contents API** como almacén de datos · **Cloudinary** para imágenes · **Formspree** para el formulario
- Deploy en **Vercel** · Node ≥ 22.12

## Decisiones técnicas

- **Datos en `src/data.json`:** sitio, servicios y trabajos en un solo JSON (sin CMS headless externo).
- **GitHub como backend:** `/api/guardar` empuja los cambios con la GitHub API (commit en `main`); el panel se protege con cookie de sesión y `ADMIN_PASSWORD`.
- **OG/favicon dinámicos:** el script `generar-og.mjs` corre en `prebuild`, así la imagen social y los íconos siempre reflejan el contenido y la marca (coral) actuales.
- **Tipografía sin Google Fonts:** `@fontsource` self-host elimina el render-blocking de fuentes externas (mejor LCP).

## Correr en local

```bash
git clone https://github.com/Kelvmdev/portafolio-disenador.git
cd portafolio-disenador
npm install
npm run dev
```

Abre http://localhost:4321

### Variables de entorno

Crea un `.env` (no se versiona):

```
ADMIN_PASSWORD=<contraseña del panel /admin>
GITHUB_TOKEN=<PAT con scope repo>
GITHUB_OWNER=Kelvmdev
GITHUB_REPO=portafolio-disenador
GITHUB_BRANCH=main
```

El `cloud name` y el `upload preset` de Cloudinary se usan en el panel para la subida sin firma.

## Scripts

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo (`localhost:4321`) |
| `npm run build` | Genera OG/favicon (`prebuild`) y construye a `./dist/` |
| `npm run preview` | Previsualiza el build |

---

Hecho por [Kervin Martínez](https://mi-portafolio-eta-hazel.vercel.app) · Asistido con Claude Code.
