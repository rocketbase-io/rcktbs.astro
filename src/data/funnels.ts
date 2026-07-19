/**
 * Funnel-Definitionen für Anzeigen-Landingpages (/f/[slug]).
 *
 * Jeder Eintrag ist eine eigenständige Landingpage für eine Anzeigen-Variante.
 * Für eine neue Variante: Eintrag kopieren, Slug + Hero/Details anpassen –
 * Fragen können zwischen Varianten geteilt werden (siehe analyseQuestions).
 */

export interface FunnelQuizOption {
  id: string;
  label: string;
  description?: string;
  /** Zeigt nach Auswahl ein Freitextfeld statt direkt weiterzuspringen */
  allowText?: boolean;
  textPlaceholder?: string;
}

export interface FunnelQuizQuestion {
  id: string;
  question: string;
  hint?: string;
  options: FunnelQuizOption[];
}

export interface FunnelDetailBlock {
  icon: string;
  title: string;
  text: string;
}

export interface FunnelStep {
  icon: string;
  title: string;
  text: string;
}

export interface FunnelDefinition {
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
  /** Vertiefungs-Blöcke unterhalb des Quiz – pro Anzeigen-Variante anpassbar */
  details: {
    heading: string;
    intro?: string;
    blocks: FunnelDetailBlock[];
  };
  /** Ablauf-Schritte für Vertrauen ("was passiert nach dem Absenden?") */
  steps: FunnelStep[];
  questions: FunnelQuizQuestion[];
  contact: {
    heading: string;
    text: string;
  };
  success: {
    heading: string;
    text: string;
    calUrl?: string;
    calLabel?: string;
  };
}

/**
 * Geteilte Quiz-Fragen der Software-Analyse-Funnels.
 * Frage 2 lässt den Interessenten sein Budget indirekt selbst einordnen.
 */
export const analyseQuestions: FunnelQuizQuestion[] = [
  {
    id: 'problem',
    question: 'Was ist aktuell euer größtes Problem?',
    hint: 'Wählt aus, was am ehesten zutrifft – es zählt der Bauch, nicht die perfekte Antwort.',
    options: [
      {
        id: 'handarbeit',
        label: 'Zu viel Handarbeit & Excel',
        description: 'Daten werden mehrfach gepflegt, Abläufe laufen über Listen und Zuruf.',
      },
      {
        id: 'altsystem',
        label: 'Ein Altsystem bremst uns',
        description: 'Die gewachsene Lösung passt nicht mehr zu den heutigen Prozessen.',
      },
      {
        id: 'schnittstellen',
        label: 'Systeme sprechen nicht miteinander',
        description: 'Insellösungen, doppelte Datenpflege, fehlende Schnittstellen.',
      },
      {
        id: 'abhaengigkeit',
        label: 'Abhängigkeit von Personen oder Dienstleistern',
        description: 'Kritisches Wissen steckt in einzelnen Köpfen oder bei einem externen Partner.',
      },
      {
        id: 'unklar',
        label: 'Schwer zu sagen – es hakt an vielen Stellen',
        description: 'Genau dafür ist eine strukturierte Analyse da.',
      },
      {
        id: 'sonstiges',
        label: 'Etwas anderes',
        allowText: true,
        textPlaceholder: 'Beschreibt euer Problem in ein, zwei Sätzen …',
      },
    ],
  },
  {
    id: 'impact',
    question: 'Was kostet es euch, wenn das die nächsten 6–12 Monate ungelöst bleibt?',
    hint: 'Grobe Schätzung reicht: Mehraufwand, entgangene Aufträge, gebremstes Wachstum.',
    options: [
      { id: 'lt10', label: 'Unter 10.000 €' },
      { id: '10-50', label: '10.000 – 50.000 €' },
      { id: '50-250', label: '50.000 – 250.000 €' },
      { id: 'gt250', label: 'Über 250.000 €' },
      {
        id: 'wachstum',
        label: 'Schwer zu beziffern',
        description: 'Es bremst vor allem unser Wachstum und die nächsten Schritte.',
      },
    ],
  },
];

export const funnels: FunnelDefinition[] = [
  {
    slug: 'software-analyse',
    meta: {
      title: 'Software-Analyse: Schwachpunkte in 2 Minuten einordnen',
      description:
        'Beantwortet zwei kurze Fragen und erhaltet eine ehrliche Ersteinschätzung, wo eure Softwarelandschaft Geld verliert.',
    },
    hero: {
      eyebrow: 'Software-Analyse',
      headline: 'Wo verliert eure Softwarelandschaft Geld?',
      headlineAccent: 'Findet es in 2 Minuten heraus.',
      subline:
        'Zwei kurze Fragen, eure Kontaktdaten – und ihr bekommt eine ehrliche Ersteinschätzung von einem Softwarearchitekten mit über 15 Jahren Praxis. Kein Verkaufsgespräch, keine Massenmail.',
    },
    details: {
      heading: 'Was eine Software-Analyse aufdeckt',
      intro:
        'Gewachsene Systemlandschaften verlieren selten an einer großen Stelle Geld – sondern an vielen kleinen, die niemand auf dem Zettel hat.',
      blocks: [
        {
          icon: 'share',
          title: 'Versteckte Doppelarbeit',
          text: 'Daten, die in mehreren Systemen parallel gepflegt werden, kosten jeden Tag Arbeitszeit – und erzeugen Fehler, die später teuer korrigiert werden.',
        },
        {
          icon: 'layers',
          title: 'Prozesse, die um Software herumgebaut wurden',
          text: 'Wenn Abläufe sich der Software anpassen statt umgekehrt, entstehen Workarounds, Excel-Schatten-IT und Wissen, das nur in Köpfen existiert.',
        },
        {
          icon: 'zap',
          title: 'Blockierte Wachstumsschritte',
          text: 'Neue Standorte, neue Produkte, mehr Volumen: Oft ist nicht der Markt der Engpass, sondern die Systemlandschaft, die nicht mitskaliert.',
        },
        {
          icon: 'shield',
          title: 'Riskante Abhängigkeiten',
          text: 'Ein einzelner Dienstleister, ein Altsystem ohne Dokumentation, ein Kollege kurz vor der Rente – Risiken, die erst auffallen, wenn es ernst wird.',
        },
      ],
    },
    steps: [
      {
        icon: 'check-circle',
        title: 'Quiz beantworten',
        text: 'Zwei Fragen, unter zwei Minuten – direkt hier auf der Seite.',
      },
      {
        icon: 'file-text',
        title: 'Ersteinschätzung erhalten',
        text: 'Wir melden uns werktags innerhalb von 24 Stunden mit einer ehrlichen ersten Einordnung.',
      },
      {
        icon: 'users',
        title: 'Optional: Vorabgespräch',
        text: 'Wenn es passt, sprechen wir 30 Minuten unverbindlich über die nächsten Schritte.',
      },
    ],
    questions: analyseQuestions,
    contact: {
      heading: 'Wohin dürfen wir die Ersteinschätzung schicken?',
      text: 'Wir melden uns werktags innerhalb von 24 Stunden persönlich – kein Newsletter, keine Weitergabe eurer Daten.',
    },
    success: {
      heading: 'Danke – eure Angaben sind angekommen.',
      text: 'Wir schauen uns eure Antworten an und melden uns werktags innerhalb von 24 Stunden mit einer ersten Einschätzung.',
      calUrl: 'https://cal.com/rocketbase-marten/discovery-vorabgesprach',
      calLabel: 'Direkt 30-Minuten-Gespräch buchen',
    },
  },
];

export function getFunnelBySlug(slug: string): FunnelDefinition | undefined {
  return funnels.find((funnel) => funnel.slug === slug);
}
