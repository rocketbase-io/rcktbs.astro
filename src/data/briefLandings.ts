/**
 * Landingpages für den Brief-Kanal (/b/[slug]).
 *
 * Bewusst getrennt von `funnels.ts` (/f/), obwohl beide "Landingpage mit
 * Lead-Formular" sind:
 *
 * | | /f/ (Anzeigen) | /b/ (Brief) |
 * |---|---|---|
 * | Einstieg | Quiz, dann Kontakt | Video → Referenzen → Termin |
 * | Ansprache | Ihr/euch | Sie |
 * | Vorwissen | keins, kalter Klick | hat gerade einen Brief gelesen |
 *
 * Ein gemeinsamer Typ hätte `questions` als Pflichtfeld (die Brief-Seite hat
 * kein Quiz) und würde die Texte über ein `formal`-Flag durch jede Zeile
 * schleifen. Die Duplikation der Struktur ist hier billiger als die
 * Verzweigung.
 *
 * Eine Variante pro **Branchencluster**, nicht pro Firma: Die Brief-ID hängt
 * als `?r=` an der URL und wird nur getrackt, nie aufgelöst — auf der Seite
 * steht nichts Empfängerbezogenes.
 */

export interface BriefLandingDefinition {
  /** URL-Segment: /b/<slug> */
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subline: string;
  };
  /**
   * Kurzer Screencast aus echten Projekten. Solange `src` fehlt, zeigt die
   * Seite einen sichtbaren Platzhalter — die Sektion steht dann schon.
   */
  video: {
    heading: string;
    text?: string;
    src?: string;
    poster?: string;
  };
  referenzen: {
    heading: string;
    intro?: string;
    /**
     * Case-Slugs aus `cases`/`additionalCases` in `rocketbase.ts`. Nur die
     * Auswahl steht hier — die Texte bleiben an einer Stelle gepflegt.
     */
    slugs: string[];
  };
  /**
   * Terminbuchung — der Primärweg. Steht vor dem Kontaktformular, weil der
   * Brief-Leser vorqualifiziert ist: Beim Formular folgen noch zwei Schritte
   * mit je eigenem Abbruchrisiko, bei der Buchung steht der Slot.
   */
  termin: {
    heading: string;
    text?: string;
    calUrl: string;
    calLabel: string;
  };
  /** Sekundärer Weg für alle, die erst schreiben statt buchen wollen. */
  kontakt: {
    heading: string;
    text: string;
  };
  erfolg: {
    heading: string;
    text: string;
  };
}

/**
 * Eigener Event-Typ „Erstgespräch-Anschreiben", getrennt vom allgemeinen
 * `erstgesprach`: Die Limits (Vorlaufzeit, Buchungen pro Tag) gelten pro
 * Event-Typ. Ein gemeinsamer Typ würde die strengeren Brief-Regeln auch
 * Empfehlungen und Anzeigen-Traffic aufzwingen.
 *
 * Achtung beim Slug: `erstgesprach-anschreiben` — ohne „ae", so wie Cal.com
 * ihn beim Anlegen erzeugt hat. Ein Tippfehler hier führt zu einer 404 auf
 * einem gedruckten QR-Code, der sich nicht mehr korrigieren lässt.
 *
 * Einstellungen in Cal.com unter „Limits & Puffer":
 *   Vorlaufzeit          48 h   (Zeit, einen durchgerutschten Privattermin
 *                                zu bemerken; später auf 24 h verkürzbar)
 *   Puffer davor/danach  15 min (Vorbereitung bzw. Notizen)
 *   Buchungen pro Tag    2      (ein Erstgespräch aus Kaltakquise kostet mehr
 *                                als ein Kundentermin)
 *   Buchbar bis          30 Tage im Voraus
 *
 * Buchungsformular: Name, Geschäfts-E-Mail und Unternehmen als Pflicht —
 * letzteres, weil bei abgetippter URL (ohne `?r=`) die Firma die einzige
 * Zuordnung zum Brief ist. Telefon optional.
 */
const CAL_URL = 'https://cal.com/rocketbase-marten/erstgesprach-anschreiben';

export const briefLandings: BriefLandingDefinition[] = [
  {
    slug: 'fertigung',
    meta: {
      title: 'Software für Fertigungsbetriebe — RocketBase',
      description:
        'Individuelle Fachanwendungen für Betriebe, deren Abläufe nicht in ein Standardprodukt passen. Kurz gezeigt, was wir gebaut haben.',
    },
    hero: {
      eyebrow: 'Sie haben Post von uns bekommen',
      headline: 'Software, die Ihrem Ablauf folgt —',
      headlineAccent: 'nicht umgekehrt',
      subline:
        'Wir bauen Fachanwendungen für Fertigungs- und Handwerksbetriebe: dort, wo Serien- und Einzelfertigung nebeneinanderlaufen, Nachweise gefordert sind und die Planung heute noch in Excel hängt.',
    },
    video: {
      heading: 'So sieht das bei uns aus',
      text: 'Marten Prieß zeigt in wenigen Minuten, wie wir arbeiten und wie fertige Lösungen aussehen — keine Folien, echte Oberflächen aus laufenden Projekten.',
    },
    referenzen: {
      heading: 'Aus vergleichbaren Betrieben',
      intro:
        'Die beiden Projekte aus dem Brief — und ein drittes, das zeigt, dass dieselben Prinzipien auch in Konzerngröße tragen.',
      slugs: ['schlosserei-diezinger', 'fkc-consulting', 'statista'],
    },
    termin: {
      heading: 'Suchen Sie sich einen Termin aus',
      text: '30 Minuten mit Marten Prieß — ohne Präsentation. Wir schauen uns an, wo bei Ihnen im Ablauf Zeit liegen bleibt, und Sie bekommen eine ehrliche Einschätzung, ob sich da etwas lohnt.',
      calUrl: CAL_URL,
      calLabel: '30-Minuten-Gespräch buchen',
    },
    kontakt: {
      heading: 'Lieber erst schreiben?',
      text: 'Hinterlassen Sie Ihre Kontaktdaten — Marten Prieß meldet sich werktags persönlich. Kein Newsletter, keine Weitergabe Ihrer Daten.',
    },
    erfolg: {
      heading: 'Danke, Ihre Nachricht ist angekommen.',
      text: 'Marten Prieß meldet sich werktags bei Ihnen.',
    },
  },
];

export function getBriefLandingBySlug(slug: string): BriefLandingDefinition | undefined {
  return briefLandings.find((l) => l.slug === slug);
}
