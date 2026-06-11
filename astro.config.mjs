// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URLs absolutas para OG/canonical/sitemap (sin esto la tarjeta no carga al compartir).
  site: 'https://portafolio-disenador.vercel.app',

  integrations: [
    sitemap({
      // No indexar el panel ni la página de gracias.
      filter: (page) => !page.includes('/admin') && !page.includes('/gracias'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});
