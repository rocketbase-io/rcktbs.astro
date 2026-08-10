import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',

  site: process.env.SITE_URL || 'https://rocketbase.io',

  // i18n configuration
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de',
        },
      },
      // /f/ (Anzeigen) und /b/ (Brief) sind beide nur über ihren jeweiligen
      // Kanal erreichbar und stehen auf noindex — sie gehören nicht in die Sitemap.
      filter: (page) =>
        !/\/(impressum|datenschutz)\/?$/.test(page) &&
        !/\/f\//.test(page) &&
        !/\/b\//.test(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  security: {
    checkOrigin: true,
  },

  experimental: {
    contentIntellisense: true,
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
