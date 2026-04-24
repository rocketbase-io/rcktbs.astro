import type { APIRoute } from 'astro';
import siteConfig from '@/config/site.config';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString() || siteConfig.url;

  const robotsTxt = `
User-agent: *
Allow: /

# Block API routes
Disallow: /api/

Sitemap: ${siteUrl}sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
