import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import { instagramPosts } from '@/data/instagram';
import { instagramCovers } from '@/features/instagram/coverImages';
import { defaultLocale } from '@/i18n/config';

/**
 * Löst die Einträge aus `src/data/instagram.ts` zu allem auf, was die Bio-Seite
 * zum Rendern braucht: Ziel-URL, Überschrift, Text und Bild.
 *
 * Bewusst hier und nicht im Frontmatter von `src/pages/instagram.astro`: Der
 * Astro-Compiler stolperte über den mehrzeiligen Arrow-Body im Frontmatter
 * ("Unexpected token" auf dem jeweils ersten Statement in `.map()`). Als
 * normales TypeScript-Modul ist die Logik ohnehin besser aufgehoben — testbar,
 * und die Seite bleibt bei Layout.
 */

export interface InstagramEintrag {
  /** Shortcode des Posts, zugleich Schlüssel der Cover-Map. */
  code: string;
  /** Ziel des Links. Intern immer mit Schrägstrich am Ende. */
  href: string;
  /** Überschrift der Kachel bzw. Text der Linkzeile. */
  titel: string;
  /** Beschreibungstext für die große Kachel; bei Linkzeilen ungenutzt. */
  text: string | null;
  /** Kachelbild: echtes Instagram-Cover, sonst Hero des Beitrags, sonst nichts. */
  bild: ImageMetadata | null;
  /** Alt-Text zum Bild. */
  bildAlt: string;
}

export async function ladeInstagramEintraege(): Promise<InstagramEintrag[]> {
  const alleBeitraege = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );

  const sortiert = [...instagramPosts].sort((a, b) => b.datum.localeCompare(a.datum));
  const eintraege: InstagramEintrag[] = [];

  for (const eintrag of sortiert) {
    const cover = instagramCovers[eintrag.code] ?? null;

    // Freies Ziel (Leistungsseite, Workshop, extern): Es gibt keine Collection,
    // aus der sich Text nachladen ließe — die Angaben stehen in der Datendatei.
    // Auf den Wert prüfen, nicht auf das Vorhandensein des Schlüssels: Die
    // Beitrags-Variante deklariert `url?: never`, damit gilt `'url' in eintrag`
    // für beide Varianten und die Union wird nicht eingegrenzt.
    if (eintrag.url !== undefined) {
      eintraege.push({
        code: eintrag.code,
        href: eintrag.url,
        titel: eintrag.titel,
        text: eintrag.text ?? null,
        bild: cover,
        bildAlt: eintrag.hook,
      });
      continue;
    }

    // Ein Tippfehler im postSlug darf nicht still durchrutschen: Die Kachel
    // würde fehlen, ohne dass es jemand merkt — und das ausgerechnet auf der
    // Seite, die hinter dem einzigen Link im Profil hängt.
    const beitrag = alleBeitraege.find((p) => p.id === `${defaultLocale}/${eintrag.postSlug}`);
    if (!beitrag) {
      throw new Error(
        `src/data/instagram.ts: Kein Blogbeitrag für postSlug "${eintrag.postSlug}" ` +
          `(Post ${eintrag.code}). Erwartet wird ein Ordner unter ` +
          `src/content/blog/${defaultLocale}/.`,
      );
    }

    const slug = beitrag.id.replace(`${defaultLocale}/`, '');

    // Das echte Kachelbild gewinnt: Wer gerade den Post gesehen hat, sucht
    // dieselbe Kachel wieder. Fehlt es, tritt das Hero-Bild des Beitrags an
    // seine Stelle.
    eintraege.push({
      code: eintrag.code,
      href: `/blog/${slug}/`,
      titel: eintrag.hook,
      text: beitrag.data.description,
      bild: cover ?? beitrag.data.image ?? null,
      bildAlt: cover ? eintrag.hook : (beitrag.data.imageAlt ?? beitrag.data.title),
    });
  }

  return eintraege;
}

/**
 * Hängt die Herkunft an interne Ziele. Fremde Domains bleiben unangetastet —
 * dort hat unsere Attribution nichts zu suchen.
 */
export function mitTracking(href: string): string {
  return href.startsWith('/') ? `${href}?utm_source=instagram&utm_medium=bio` : href;
}
