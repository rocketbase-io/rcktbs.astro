import type { APIRoute, GetStaticPaths } from 'astro';
import { generateOGImage } from '@/lib/og';
import siteConfig from '@/config/site.config';
import { cases } from '@/data/rocketbase';

const STATIC_PAGES = [
  { slug: 'index',        title: siteConfig.name,          description: siteConfig.description },
  { slug: 'services',    title: 'Leistungen',              description: 'Discovery, Konzeption, Individualsoftware und Betrieb. Vier Leistungsbereiche für nachhaltige Softwareprojekte.' },
  { slug: 'mission',     title: 'Mission',                 description: 'Wie und warum wir bei RocketBase arbeiten. Acht Haltungen hinter jedem Projekt.' },
  { slug: 'work',        title: 'Wie wir arbeiten',        description: 'Vier konkrete Wechsel, die unsere Projekte schneller, leichter und tragfähiger machen.' },
  { slug: 'referenzen',  title: 'Referenzen',              description: 'Ausgewählte Referenzen mit Hintergrund zu Ausgangslage, Vorgehen und Projektrahmen.' },
  { slug: 'contact',     title: 'Kontakt',                 description: `Sprechen Sie direkt mit Marten Prieß von ${siteConfig.name}.` },
  { slug: 'impressum',   title: 'Impressum',               description: 'Rechtliche Informationen zu RocketBase.' },
  { slug: 'datenschutz', title: 'Datenschutz',             description: 'Datenschutzinformationen und Ihre Rechte als Nutzer.' },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const staticPaths = STATIC_PAGES.map((page) => ({
    params: { slug: page.slug },
    props: {
      title: page.title,
      description: page.description,
      type: 'website' as const,
    },
  }));

  const casePaths = cases.map((c) => ({
    params: { slug: `referenzen/${c.slug}` },
    props: {
      title: `${c.client} | Referenz`,
      description: c.description,
      type: 'website' as const,
    },
  }));

  return [...staticPaths, ...casePaths];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, type } = props as {
    title: string;
    description?: string;
    type: 'website' | 'article';
  };

  const png = await generateOGImage({
    title,
    description,
    type,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
