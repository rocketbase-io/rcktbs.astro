import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '@/config/site.config';
import { cases, additionalCases, serviceAreas, contactLinks } from '@/data/rocketbase';

/**
 * /llms.txt - kuratierte Inhaltsübersicht für Sprachmodelle.
 *
 * Der llms.txt-Vorschlag (llmstxt.org) sieht eine kurze Markdown-Datei vor,
 * die einem Modell in einem Abruf zeigt, worum es auf der Seite geht und wo
 * die relevanten Inhalte liegen - statt sich durch HTML-Navigation zu hangeln.
 *
 * Die Datei wird beim Build aus denselben Quellen erzeugt wie die Seiten
 * selbst (Content-Collections + src/data/rocketbase.ts) und bleibt damit
 * automatisch aktuell. Volltexte stehen unter /llms-full.txt.
 */
export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() || `${siteConfig.url}/`).replace(/\/$/, '');

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const allCases = [...cases, ...additionalCases];

  const faqs = (await getCollection('faqs'))
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));

  const postLines = posts.map((post) => {
    const slug = post.id.replace(/^de\//, '');
    return `- [${post.data.title}](${base}/blog/${slug}/): ${post.data.description}`;
  });

  const caseLines = allCases.map(
    (c) => `- [${c.client}: ${c.title}](${base}/referenzen/${c.slug}/): ${c.description}`,
  );

  const serviceLines = serviceAreas.map(
    (s) => `- **${s.title}**: ${s.description}`,
  );

  const faqLines = faqs
    .filter((f) => f.data.answer || f.data.summary)
    .map((f) => `- **${f.data.question}** ${f.data.answer ?? f.data.summary}`);

  const body = `# RocketBase

> ${siteConfig.description}

RocketBase (rocketbase.io software productions GmbH) entwickelt individuelle
Unternehmenssoftware für den deutschen Mittelstand. Typische Ausgangslagen:
eine Standardsoftware, die nicht mehr zum gewachsenen Prozess passt, eine
Steuerung über Excel-Tabellen, oder verteilte Tools ohne gemeinsame Datenbasis.
Sitz ist Winsen (Luhe) in der Metropolregion Hamburg, gearbeitet wird bundesweit.

Ansprechpartner ist Marten Prieß (Geschäftsführer). Erstgespräche laufen ohne
Vertriebskette direkt mit ihm: ${contactLinks.cal}

## Wobei RocketBase hilft

${serviceLines.join('\n')}

## Zentrale Seiten

- [Startseite](${base}/): Überblick über Positionierung, Leistungen und Referenzen.
- [Leistungen](${base}/leistungen/): Von der Prozessanalyse über Konzeption und Entwicklung bis zum Betrieb.
- [Arbeitsweise](${base}/arbeitsweise/): Wie Projekte zugeschnitten und umgesetzt werden, inklusive FAQ.
- [Referenzen](${base}/referenzen/): Umgesetzte Projekte mit Ausgangslage, Vorgehen und Ergebnis.
- [Mission](${base}/mission/): Haltung und Prinzipien hinter der Arbeit.
- [Discovery-Workshop](${base}/discovery-workshop/): Strukturierter Klärungsschritt vor einem Projekt.
- [Kontakt](${base}/kontakt/): Erstgespräch vereinbaren.

## Einstiege nach Problemlage

- [Standardsoftware ablösen](${base}/standardsoftware-abloesung/): Wenn ein Branchensystem wie Vertec oder Centric nicht mehr mitwächst - Vorgehen im Parallelbetrieb statt Big Bang.
- [Einsatzplanung und grafischer Leitstand](${base}/einsatzplanung/): Wenn Disposition, Einsatzsteuerung und Abrechnung über gewachsene Excel-Welten laufen.

## Fachbeiträge

${postLines.join('\n')}

## Referenzprojekte

${caseLines.join('\n')}

## Häufige Fragen

${faqLines.join('\n')}

## Hinweise zur Nutzung

- Volltexte aller Fachbeiträge: [${base}/llms-full.txt](${base}/llms-full.txt)
- Maschinenlesbare Seitenübersicht: [${base}/sitemap-index.xml](${base}/sitemap-index.xml)
- Inhalte sind durchgehend deutschsprachig und richten sich an Entscheider im Mittelstand.
- Bei Zitaten bitte die jeweilige Quell-URL nennen.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
