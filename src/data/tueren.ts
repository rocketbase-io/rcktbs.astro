/**
 * Die drei Türen, die Ablösung und der Workshop als Ziele für Querverweise.
 * Blogartikel nennen sie im Frontmatter (`doors`), Referenzen über `referenzTueren`.
 * Daraus entstehen: Artikel unter der Tür (BlogQuerverweis), „Passende Lösung“ am
 * Ende eines Artikels und auf Referenzseiten. Nicht auf Funnel-Seiten (/f/).
 */
export const tuerIds = ['angebot', 'einsatz', 'zahlen', 'abloesung', 'workshop'] as const;
export type TuerId = (typeof tuerIds)[number];

export const tueren: Record<TuerId, { titel: string; href: string; icon: string; text: string }> = {
  angebot: {
    titel: 'Angebot & Kalkulation',
    href: '/angebote/',
    icon: 'edit',
    text: 'Angebote, die nach eurer Regel rechnen. Als Seite statt PDF, Zusage per Klick.',
  },
  einsatz: {
    titel: 'Einsatz & Abrechnung',
    href: '/einsatzplanung/',
    icon: 'users',
    text: 'Plantafel, Ablauf je Auftrag, Leistung, Rechnung und Mahnwesen in einem System.',
  },
  zahlen: {
    titel: 'Zahlen & Steuerung',
    href: '/zahlen/',
    icon: 'table',
    text: 'Umsatz, Auslastung bis zur Person und auslaufende Verträge, live statt am Monatsende.',
  },
  abloesung: {
    titel: 'Standardsoftware ablösen',
    href: '/standardsoftware-abloesung/',
    icon: 'layers',
    text: 'Branchensoftware samt Excel drumherum Schritt für Schritt ablösen, mit allen Daten.',
  },
  workshop: {
    titel: 'Der Workshop',
    href: '/discovery-workshop/',
    icon: 'check-circle',
    text: 'Drei Termine, in denen wir euren Ablauf aufnehmen. Danach steht der Festpreis.',
  },
};

/** Welche Lösungen aus welcher Referenz entstanden sind (Slug aus data/rocketbase.ts). */
export const referenzTueren: Record<string, TuerId[]> = {
  'fkc-consulting': ['abloesung', 'angebot', 'zahlen'],
  'schlosserei-diezinger': ['einsatz'],
  'mavox-winterdienst': ['einsatz'],
};
