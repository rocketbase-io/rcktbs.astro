/**
 * Posts für die Bio-Seite (/instagram/).
 *
 * Instagram erlaubt genau einen Link im Profil. Statt ihn bei jedem Post zu
 * tauschen, zeigt er dauerhaft auf /instagram/ — und diese Liste bestimmt, was
 * dort steht. Ein neuer Post ist ein neuer Eintrag hier, sonst nichts.
 *
 * Die **vier neuesten** Einträge erscheinen als große Kachel (quadratisches
 * Bild, Text daneben, auf dem Desktop zwei nebeneinander), alle älteren als
 * schlichte Linkzeile darunter. Die Seite wird fast nur für den jeweils
 * aktuellen Post benutzt; die Liste hält die älteren erreichbar, ohne die
 * Seite lang zu machen.
 *
 * Kein Instagram-Datum: Das Veröffentlichungsdatum ist über die öffentliche
 * Post-URL nicht abrufbar (die Seite rendert clientseitig, der Embed liefert
 * keins). `datum` wird deshalb von Hand gepflegt und dient nur der Sortierung.
 */

interface InstagramPostBasis {
  /**
   * Shortcode aus der Post-URL: instagram.com/p/<code>/
   *
   * Zugleich der Schlüssel für das Kachelbild in
   * `src/features/instagram/coverImages.ts`. Steht dort keins, zeigt die
   * Kachel das Hero-Bild des Blogbeitrags — und bei freien Zielen (siehe
   * unten) gar keins.
   */
  code: string;
  /**
   * Aufhänger der Kachel — die Frage aus der Caption, nicht der Artikeltitel.
   * Wer aus dem Post kommt, sucht die Zeile wieder, die ihn hergebracht hat.
   */
  hook: string;
  /** Erscheinungsdatum (ISO), nur für die Sortierung — neueste zuerst. */
  datum: string;
}

/**
 * Der Regelfall: Der Post verweist auf einen Blogbeitrag. Titel, Beschreibung
 * und Hero-Bild holt die Seite zur Buildzeit aus der Collection — so driftet
 * nichts, wenn jemand später eine Überschrift schärft.
 */
interface InstagramPostMitBeitrag extends InstagramPostBasis {
  /** Ordnername des Blogposts unter src/content/blog/de/ */
  postSlug: string;
  url?: never;
  titel?: never;
  text?: never;
}

/**
 * Freies Ziel: Leistungsseite, Workshop, externe Seite. Hier gibt es keine
 * Collection, aus der sich Text nachladen ließe — `titel` ist deshalb Pflicht
 * und wird von Hand gepflegt.
 */
interface InstagramPostMitUrl extends InstagramPostBasis {
  postSlug?: never;
  /** Ziel-URL. Intern bitte mit Schrägstrich am Ende (trailingSlash: 'always'). */
  url: string;
  /** Linktext bzw. Kachel-Überschrift. */
  titel: string;
  /** Optionaler Beschreibungstext für die große Kachel. */
  text?: string;
}

export type InstagramPost = InstagramPostMitBeitrag | InstagramPostMitUrl;

export const instagramPosts: InstagramPost[] = [
  {
    code: 'DdJekmNFtUk',
    postSlug: 'angebotsprozess-anfrage-bis-zusage',
    hook: 'Wurde dein letztes Angebot überhaupt geöffnet?',
    datum: '2026-09-10',
  },
];
