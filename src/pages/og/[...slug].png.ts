import type { APIRoute, GetStaticPaths } from 'astro';
import { resolve } from 'node:path';
import { generateOGImage, generateCaseOGImage } from '@/lib/og';
import siteConfig from '@/config/site.config';
import { cases, additionalCases } from '@/data/rocketbase';

const STATIC_PAGES = [
  { slug: 'index',        title: siteConfig.name,          description: siteConfig.description },
  { slug: 'leistungen',   title: 'Leistungen',             description: 'Discovery, Konzeption, Individualsoftware und Betrieb. Vier Leistungsbereiche für nachhaltige Softwareprojekte.' },
  { slug: 'mission',      title: 'Mission',                description: 'Wie und warum wir bei RocketBase arbeiten. Acht Haltungen hinter jedem Projekt.' },
  { slug: 'arbeitsweise', title: 'Wie wir arbeiten',       description: 'Vier konkrete Wechsel, die unsere Projekte schneller, leichter und tragfähiger machen.' },
  { slug: 'referenzen',   title: 'Referenzen',             description: 'Ausgewählte Referenzen mit Hintergrund zu Ausgangslage, Vorgehen und Projektrahmen.' },
  { slug: 'kontakt',      title: 'Kontakt',                description: `Sprechen Sie direkt mit Marten Prieß von ${siteConfig.name}.` },
  { slug: 'imprint',      title: 'Impressum',              description: 'Rechtliche Informationen zu RocketBase.' },
  { slug: 'privacy',      title: 'Datenschutz',            description: 'Datenschutzinformationen und Ihre Rechte als Nutzer.' },
];

// Map case slug → teaser filename under src/assets/references/
const CASE_TEASER_FILES: Record<string, string> = {
  bonprix: 'teaser-bonprix.jpeg',
  statista: 'teaser-statista.jpeg',
  'fkc-consulting': 'teaser-fkc.jpeg',
  'metall-pro': 'teaser-schlosserei.jpeg',
  'statista-canva': 'teaser-statista-canva.jpeg',
  'stage-cml': 'teaser-stage-cml.jpeg',
  'sam-vorteilsguru': 'teaser-sam-vorteilsguru.jpeg',
  'mavox-winterdienst': 'teaser-mavox-winterdienst.jpeg',
  'bonprix-collection-planning': 'teaser-bonprix-collection-planning.jpeg',
};

const ASSETS_REFERENCES_DIR = resolve(process.cwd(), 'src/assets/references');

type StaticProps = {
  kind: 'static';
  title: string;
  description?: string;
  type: 'website' | 'article';
};

type CaseProps = {
  kind: 'case';
  client: string;
  title: string;
  description?: string;
  teaserPath: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const staticPaths = STATIC_PAGES.map((page) => ({
    params: { slug: page.slug },
    props: {
      kind: 'static',
      title: page.title,
      description: page.description,
      type: 'website' as const,
    } satisfies StaticProps,
  }));

  const allCases = [...cases, ...additionalCases];
  const casePaths = allCases
    .filter((c) => CASE_TEASER_FILES[c.slug])
    .map((c) => ({
      params: { slug: `referenzen/${c.slug}` },
      props: {
        kind: 'case',
        client: c.client,
        title: c.title,
        description: c.description,
        teaserPath: resolve(ASSETS_REFERENCES_DIR, CASE_TEASER_FILES[c.slug]),
      } satisfies CaseProps,
    }));

  return [...staticPaths, ...casePaths];
};

export const GET: APIRoute = async ({ props }) => {
  const p = props as StaticProps | CaseProps;

  const buffer =
    p.kind === 'case'
      ? await generateCaseOGImage({
          teaserPath: p.teaserPath,
          client: p.client,
          title: p.title,
          description: p.description,
        })
      : await generateOGImage({
          title: p.title,
          description: p.description,
          type: p.type,
        });

  // Case OGs are JPEG (photographic background), static OGs are PNG (text-only).
  // URL extension stays .png for route simplicity; content-type reflects real format.
  const contentType = p.kind === 'case' ? 'image/jpeg' : 'image/png';

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
