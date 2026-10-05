/**
 * Vergleichsdaten für das Angebotsmodul (/f/angebote/ und /angebote/<tool>-alternative/).
 *
 * Eine Tabelle, zwei Ansichten: Die Funnel-Seite zeigt die Zeilen mit `kurz: true`,
 * die Vergleichsseiten alle. So steht jede Aussage über Qwilr oder PandaDoc genau
 * einmal im Repo und driftet nicht zwischen den Seiten.
 *
 * Die Spalte „Angebotsmodul" nennt nur, was im Code der Lösung tatsächlich gebaut
 * ist (Inventur 05.10.2026). Zwei Punkte bewusst nicht behauptet: keine E-Signatur
 * (Annahme ist ein Formular, das PDF hat Unterschriftslinien) und Tracking nur
 * als Öffnungen plus Zeitpunkt, nicht je Abschnitt oder Gerät.
 *
 * Wettbewerber-Angaben: Preise und Datenstandort von den Herstellerseiten,
 * Stand siehe `STAND`. Zeilen mit `pruefen: true` sind vor der Veröffentlichung
 * gegen die aktuellen Hersteller-Seiten zu prüfen (Philipp, vor Launch).
 */

export const STAND = 'Oktober 2026';

export type VergleichSpalte = 'office' | 'qwilr' | 'pandadoc' | 'modul';

export const vergleichSpalten: Record<VergleichSpalte, string> = {
  office: 'Word/Excel + PDF',
  qwilr: 'Qwilr',
  pandadoc: 'PandaDoc',
  modul: 'Angebotsmodul',
};

export interface VergleichZeile {
  merkmal: string;
  office: string;
  qwilr: string;
  pandadoc: string;
  modul: string;
  /** Erscheint in der Kurzfassung auf /f/angebote/. */
  kurz?: boolean;
  /** Vor Veröffentlichung gegen die Herstellerseiten prüfen. */
  pruefen?: boolean;
}

export const vergleichZeilen: VergleichZeile[] = [
  {
    merkmal: 'Angebot als Web-Seite mit Optionen',
    office: 'Anhang',
    qwilr: 'ja',
    pandadoc: 'ja, als Dokument',
    modul: 'ja, PDF entsteht daraus',
    kurz: true,
  },
  {
    merkmal: 'Preis und Aufwand aus eurer Kalkulation',
    office: 'Excel von Hand',
    qwilr: '–',
    pandadoc: '–',
    modul: 'ja',
    kurz: true,
  },
  {
    merkmal: 'Deckungsbeitrag vor dem Versand',
    office: 'Nachkalkulation',
    qwilr: '–',
    pandadoc: '–',
    modul: 'ja, je Baustein und Vertrag, Ampel sperrt',
    kurz: true,
  },
  {
    merkmal: 'Laufzeit-Konditionen als Daten (Preisanpassung, Kündigungsfrist, Intervall)',
    office: 'Textbaustein',
    qwilr: '–',
    pandadoc: '–',
    modul: 'ja',
  },
  {
    merkmal: 'Öffnungs-Tracking',
    office: '–',
    qwilr: 'ja, auch je Abschnitt',
    pandadoc: 'ja, auch je Seite',
    modul: 'Öffnungen und Zeitpunkt, zieht die Wiedervorlage vor',
    kurz: true,
    pruefen: true,
  },
  {
    merkmal: 'Annahme online',
    office: 'Unterschrift auf Papier',
    qwilr: 'E-Signatur',
    pandadoc: 'E-Signatur',
    modul: 'Annahme per Klick mit Optionen und Startdatum, PDF mit Unterschriftsfeld',
    kurz: true,
  },
  {
    merkmal: 'Nachfassen automatisch',
    office: '–',
    qwilr: 'Erinnerungen',
    pandadoc: 'Erinnerungen',
    modul: 'ja, Mail-Sequenz je Vorlage aus eurem Postfach',
    pruefen: true,
  },
  {
    merkmal: 'Anfrage, Vertrag, Projekt, Rechnung, Cockpit',
    office: 'getrennte Dateien',
    qwilr: '–',
    pandadoc: 'über CRM-Anbindung',
    modul: 'eine Strecke',
    kurz: true,
  },
  {
    merkmal: 'Preis',
    office: 'Office-Lizenz',
    qwilr: 'ab 35 $ je Nutzer und Monat',
    pandadoc: 'ab 19 $ je Nutzer und Monat',
    modul: 'Projekt plus Betrieb, Rahmen im Erstgespräch',
    pruefen: true,
  },
  {
    merkmal: 'Datenstandort',
    office: 'bei euch',
    qwilr: 'außerhalb der EU',
    pandadoc: 'USA, EU je Tarif',
    modul: 'Deutschland (Hetzner)',
    pruefen: true,
  },
];

export interface VergleichSeite {
  /** URL-Segment: /angebote/<slug>/ */
  slug: string;
  /** Name des Tools, wie er im Text steht. */
  tool: string;
  /** Spalte in der Tabelle, die diesem Tool gehört. */
  spalte: Exclude<VergleichSpalte, 'office' | 'modul'>;
  meta: { title: string; description: string };
  hero: { headline: string; headlineAccent: string; subline: string };
  /** Drei Sätze Kurzantwort, die erste Frage einer Vergleichsseite. */
  kurzantwort: { toolReicht: string; modulLohnt: string; keinsVonBeiden: string };
  /** Was das Tool gut macht, in eigenen Worten und ohne Häme. */
  staerken: string[];
  /** Die drei Unterschiede, die den Preis rechtfertigen. */
  unterschiede: { title: string; text: string }[];
  /** Rechenbeispiel, bewusst mit runden Zahlen. */
  preisbeispiel: { nutzer: number; jahre: number; monatlichJeNutzer: number; waehrung: string };
  faqs: { q: string; a: string }[];
}

export const vergleichSeiten: VergleichSeite[] = [
  {
    slug: 'qwilr-alternative',
    tool: 'Qwilr',
    spalte: 'qwilr',
    meta: {
      title: 'Qwilr-Alternative: Angebote mit Kalkulation und Marge',
      description:
        'Qwilr macht aus einem Angebot eine Seite. Das Angebotsmodul rechnet es vorher nach eurer Regel, zeigt den Deckungsbeitrag vor dem Versand und läuft bis Vertrag und Rechnung weiter. Hosting in Deutschland. Ehrlicher Vergleich, Stand Oktober 2026.',
    },
    hero: {
      headline: 'Qwilr macht das Angebot schön.',
      headlineAccent: 'Rechnen müsst ihr es trotzdem selbst.',
      subline:
        'Wenn eure Angebote aus einer Kalkulation entstehen, aus Fläche, Stückzahl, Anlagen oder Stunden, dann liegt die Arbeit vor dem Dokument. Genau dort setzt das Angebotsmodul an. Hier steht, wann Qwilr reicht und wann nicht.',
    },
    kurzantwort: {
      toolReicht:
        'Qwilr reicht, wenn ihr wenige Angebote im Monat schreibt, jedes anders aussieht und die Kalkulation in zehn Minuten im Kopf passiert. Dann ist ein Dokumenten-Tool für 35 Dollar je Nutzer die richtige Größe.',
      modulLohnt:
        'Das Angebotsmodul lohnt, wenn eure Angebote aus einer Kalkulation entstehen, ihr wiederkehrend ähnlich rechnet und die Marge eines Auftrags heute erst in der Nachkalkulation sichtbar wird. Dann ist das Dokument der kleinste Teil des Problems.',
      keinsVonBeiden:
        'Beides passt nicht, wenn ihr überwiegend in Ausschreibungen arbeitet. Dort gibt die Gegenseite das Format vor, und weder eine schöne Seite noch eine eigene Kalkulation ändern daran etwas.',
    },
    staerken: [
      'Angebote als Web-Seite mit Vorlagen, Blöcken und Branding, in Minuten gebaut.',
      'Interaktive Preistabellen, bei denen der Kunde Optionen wählt und die Summe mitläuft.',
      'E-Signatur, Tracking je Abschnitt und Integrationen in HubSpot oder Salesforce.',
    ],
    unterschiede: [
      {
        title: 'Die Regel rechnet, nicht der Vertriebler',
        text: 'In Qwilr tippt jemand Positionen und Preise in eine Tabelle. Im Angebotsmodul stehen die Größen, die bei euch den Aufwand bestimmen, am Kunden, und Stunden und Mengen je Baustein folgen daraus. Ändert sich die Regel, ändert sie sich einmal, nicht in jeder Datei.',
      },
      {
        title: 'Der Deckungsbeitrag steht vor dem Versand',
        text: 'Jeder Baustein kennt seine Stunden, die Anfahrt und die Person, die ihn ausführt. Daraus ergibt sich die Marge in Euro und Prozent, je Baustein und je Vertrag. Eine Ampel sperrt den Versand, wenn sie rot ist. Qwilr kennt eure Kosten nicht.',
      },
      {
        title: 'Die Strecke endet nicht beim Klick',
        text: 'Nach der Zusage wird aus dem Angebot ein Auftrag, der Vertrag entsteht aus Bausteinen, die Rechnung geht als ZUGFeRD oder XRechnung raus, und das Cockpit zeigt, welcher wiederkehrende Umsatz nächstes Jahr ausläuft. Qwilr übergibt an ein CRM und ist dann fertig.',
      },
    ],
    preisbeispiel: { nutzer: 10, jahre: 3, monatlichJeNutzer: 35, waehrung: '$' },
    faqs: [
      {
        q: 'Können wir unsere Qwilr-Vorlagen übernehmen?',
        a: 'Die Texte ja, die Struktur meistens auch. Vorlagen im Angebotsmodul bestehen aus Textbausteinen, Präsentationsblöcken und den Konditionen je Geschäftsbereich. Was in Qwilr eine Seite war, wird hier eine Vorlage, die zusätzlich die Kalkulation kennt.',
      },
      {
        q: 'Gibt es eine E-Signatur?',
        a: 'Nein. Der Kunde nimmt auf der Angebotsseite an, mit Name, Startdatum, Rechnungsadresse und seiner Auswahl der optionalen Positionen. Das PDF trägt Unterschriftsfelder für die Akte. Für die Verträge, um die es hier geht, hat das in der Praxis gereicht; eine qualifizierte Signatur lässt sich anbinden, wenn eure Branche sie verlangt.',
      },
      {
        q: 'Was wird beim Kunden getrackt?',
        a: 'Wie oft das Angebot geöffnet wurde und wann zuletzt. Kein Gerät, kein Abschnitt, keine Lesezeit. Das ist weniger als Qwilr und bewusst so: Es reicht, um die Wiedervorlage vorzuziehen, und es braucht keinen Hinweis, der den Kunden beim Lesen beobachtet fühlen lässt.',
      },
      {
        q: 'Was kostet das Angebotsmodul?',
        a: 'Es ist kein Abo je Nutzer, sondern ein Projekt mit Festpreis plus Betriebspauschale, oder ein monatliches Modell mit Einrichtung und Betrag je Nutzer. Den Rahmen nennen wir im Erstgespräch, bevor ihr etwas bucht. Er hängt vor allem daran, wie viele Kalkulationsarten ihr habt.',
      },
    ],
  },
  {
    slug: 'pandadoc-alternative',
    tool: 'PandaDoc',
    spalte: 'pandadoc',
    meta: {
      title: 'PandaDoc-Alternative: Angebote, die eure Kalkulation kennen',
      description:
        'PandaDoc ist ein Dokumenten-Tool mit E-Signatur. Das Angebotsmodul rechnet das Angebot nach eurer Regel, zeigt den Deckungsbeitrag vor dem Versand und läuft bis Vertrag und Rechnung weiter. Hosting in Deutschland. Ehrlicher Vergleich, Stand Oktober 2026.',
    },
    hero: {
      headline: 'PandaDoc verschickt Dokumente.',
      headlineAccent: 'Wer rechnet das Angebot davor?',
      subline:
        'PandaDoc nimmt euch das Versenden und Unterschreiben ab. Die Kalkulation, die Marge und alles nach der Unterschrift bleiben bei euch, in Excel, im CRM, in der Buchhaltung. Hier steht, wann das reicht und wann nicht.',
    },
    kurzantwort: {
      toolReicht:
        'PandaDoc reicht, wenn ihr vor allem Dokumente unterschreiben lassen wollt, Verträge, NDAs, Standardangebote, und die Kalkulation dahinter einfach ist. Für 19 Dollar je Nutzer bekommt ihr Vorlagen, Versand, Signatur und Erinnerungen.',
      modulLohnt:
        'Das Angebotsmodul lohnt, wenn das Angebot aus einer Regel entsteht und ihr wissen wollt, was ihr an jedem Vertrag verdient, bevor er rausgeht. Und wenn nach der Annahme Projekt, Einsatz und Rechnung folgen sollen, ohne dass jemand abtippt.',
      keinsVonBeiden:
        'Beides passt nicht, wenn eure Angebote weitgehend identisch sind. Dann reicht eine gute Vorlage, und jede Software ist zu viel.',
    },
    staerken: [
      'Dokumente aus Vorlagen, Versand, Erinnerungen und rechtsgültige E-Signatur in einem Werkzeug.',
      'Preistabellen mit optionalen Positionen, Tracking je Seite, Anbindung an die großen CRMs.',
      'Günstiger Einstieg und eine breite Nutzerbasis, also viele Anleitungen und Vorlagen.',
    ],
    unterschiede: [
      {
        title: 'Das Angebot entsteht aus Daten, nicht aus einer Vorlage',
        text: 'In PandaDoc füllt ihr eine Vorlage. Im Angebotsmodul entstehen Positionen, Stunden und Preise aus den Daten des Kunden und eurer Regel. Die Kundenseite und das PDF sind zwei Ansichten derselben Kalkulation, nicht zwei Dokumente.',
      },
      {
        title: 'Die Marge steht am Angebot, nicht im Jahresabschluss',
        text: 'Je Baustein und je Vertrag, in Euro und Prozent, aus den Stunden und der Person, die sie leistet. Eine Ampel sperrt den Versand bei roter Marge. PandaDoc kennt nur den Verkaufspreis.',
      },
      {
        title: 'Nach der Annahme geht es weiter',
        text: 'Auftrag anlegen, Vertrag aus Bausteinen, Planung, Rechnung als ZUGFeRD oder XRechnung, DATEV-Export, Cockpit mit dem wiederkehrenden Umsatz, der nächstes Jahr ausläuft. PandaDoc endet bei der Unterschrift und übergibt an das nächste Tool.',
      },
    ],
    preisbeispiel: { nutzer: 10, jahre: 3, monatlichJeNutzer: 19, waehrung: '$' },
    faqs: [
      {
        q: 'Brauchen wir trotzdem eine E-Signatur?',
        a: 'Für die meisten Aufträge hat die Zusage auf der Angebotsseite in der Praxis gereicht: Name, Startdatum, Rechnungsadresse, Auswahl der Optionen. Das PDF trägt Unterschriftsfelder. Verlangt eure Branche eine qualifizierte Signatur, binden wir einen Dienst dafür an.',
      },
      {
        q: 'PandaDoc hat Erinnerungen. Das Angebotsmodul auch?',
        a: 'Ja. Jede Vorlage trägt eine Nachfass-Sequenz mit Tagesabständen. Die Mails gehen werktags aus eurem eigenen Postfach raus und stoppen, sobald der Kunde entscheidet. Öffnet er das Angebot, rückt die nächste Mail und die Wiedervorlage des Vertrieblers vor.',
      },
      {
        q: 'Was passiert mit den Daten?',
        a: 'Die Lösung läuft auf Servern in Deutschland. Das Tracking auf der Angebotsseite speichert Öffnungen und Zeitpunkt, keine Geräte und keine Lesezeiten je Abschnitt. Den Datenschutzhinweis dafür liefern wir mit.',
      },
      {
        q: 'Was kostet das im Vergleich?',
        a: 'PandaDoc kostet je Nutzer und Monat, solange ihr es nutzt. Das Angebotsmodul ist ein Projekt mit Festpreis plus Betriebspauschale, oder ein monatliches Modell mit Betrag je Nutzer. Welches Modell passt und in welchem Rahmen, besprechen wir im Erstgespräch, vor jeder Buchung.',
      },
    ],
  },
];

export function getVergleichSeite(slug: string): VergleichSeite | undefined {
  return vergleichSeiten.find((s) => s.slug === slug);
}
