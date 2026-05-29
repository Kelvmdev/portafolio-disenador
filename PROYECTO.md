# 🧭 PROYECTO — Portafolio Diseñador (arnés del proyecto)

> Este archivo es el **"arnés"** del proyecto: define qué es, **dónde estamos**, **qué hicimos** y **a dónde vamos**. Se actualiza a medida que avanzamos.
> Es también el tipo de archivo que lee **Claude Code** para entender un proyecto (lo que se llama `CLAUDE.md`).

---

## 🎯 Objetivo

Portafolio web para un **diseñador** (amigo del mentor de Kervin) que hace diseño para **redes sociales**. Muestra sus trabajos con **nombre, título e imagen**.
A futuro: un **CMS** para que el diseñador edite el contenido (textos/imágenes) sin tocar código.

## 👤 Contexto

- **Cliente:** diseñador de contenido para redes (llega vía el amigo freelancer de Kervin).
- **Desarrollador:** Kervin (GitHub: Kelvmdev).
- **Entorno:** Windows, CMD (no PowerShell), VS Code, Node, Git. Carpeta: `C:\Proyectos\portafolio-disenador`.

## 🧰 Stack

- **Astro** (contenido estático) + **Tailwind CSS v4** (plugin de Vite + `global.css`, sin `tailwind.config`).
- **Deploy:** Vercel. **Repo:** GitHub (Kelvmdev).
- **Patrón clave:** datos en array + `.map()` para listas (los trabajos).

## 📐 Convenciones (mini-reglas)

- Estilos **solo con Tailwind**.
- **Responsive** de 320px a pantallas grandes; unidades relativas; `max-w-*` + `mx-auto` para contener.
- Código **DRY**: si un patrón se repite, extraer a componente en `src/components/`.
- Al editar código se usan etiquetas: **AGREGAR / REEMPLAZAR / PEGAR DESDE CERO**.

---

## 📍 Estado actual

- ✅ Proyecto Astro creado (plantilla **minimal**).
- ✅ Tailwind v4 agregado (`astro.config.mjs` actualizado + `src/styles/global.css` creado).
- ⬜ **Falta importar `global.css`** vía un Layout (acción requerida por Astro para activar Tailwind).
- La plantilla minimal trae: `src/pages/index.astro` (con el `<h1>Astro</h1>` por defecto).

---

## 🗺️ Roadmap por fases

### Fase 1 — Setup ⚡ (en curso)
- [x] Crear proyecto Astro (minimal)
- [x] Agregar Tailwind v4
- [ ] Crear `Layout.astro` que importe `global.css` (activa Tailwind + estructura compartida)
- [ ] Verificar que Tailwind funciona (`npm run dev`)

### Fase 2 — Página de portafolio ⬜
- [ ] Datos de trabajos en un array (nombre, título, imagen) — contenido de ejemplo
- [ ] Componente `TarjetaTrabajo.astro` (props: nombre, título, imagen)
- [ ] Encabezado (nombre del diseñador + título)
- [ ] Grilla de trabajos con `.map()` + `TarjetaTrabajo`
- [ ] Responsive (1 / 2 / 3 columnas según pantalla)

### Fase 3 — Contenido real ⬜
- [ ] Reemplazar los ejemplos por los trabajos reales del diseñador (imágenes + textos)

### Fase 4 — Publicar ⬜
- [ ] Subir a GitHub (repo nuevo)
- [ ] Deploy en Vercel (cada `git push` actualiza el sitio)

### Fase 5 — CMS (avanzado · proyecto guiado) ⬜
> Login + editar textos/imágenes + guardar en GitHub + re-deploy automático.
> Nivel: API routes + env vars + GitHub API + auth. Se hace **paso a paso, entendiendo cada pieza** (no copiar a ciegas). Basado en el patrón de `INTEGRACION_CMS.md` del amigo, **adaptado a Astro SSR**.
- [ ] Entender SSR + API routes en Astro
- [ ] Login con clave (auth básica + cookie)
- [ ] Panel para editar un `data.json`
- [ ] Guardar cambios vía GitHub API → re-deploy en Vercel

---

## 📌 Decisiones y notas

- **Framework: Astro, no Next.js.** Es contenido → Astro es lo ideal y es lo que Kervin domina. El CMS se hará en **Astro SSR** (mismo patrón que el doc Next del amigo, adaptado).
- El contenido del diseñador aún **no llega** → se construye con **placeholders**.
- **Manejo de secretos** (cuando llegue el CMS): tokens en **env vars**, nunca en git.

---

## 🔜 Próximo paso inmediato

Crear `src/layouts/Layout.astro` que importe `global.css`, y hacer que `index.astro` lo use. (Activa Tailwind + da estructura compartida.)

---
*Arnés vivo — se actualiza en cada sesión.*
