export const strengths = [
  {
    title: 'Direkte Zusammenarbeit mit Marten Prieß',
    description:
      'Ihr sprecht mit dem Gründer von RocketBase. Er sitzt in den Workshops, trifft die Architekturentscheidungen mit und bleibt euer Ansprechpartner, wenn es später hakt.',
  },
  {
    title: 'Konzernniveau für den Mittelstand',
    description:
      'Sechs Jahre bonprix, mehrere Jahre Statista: Was dort an Architektur funktioniert, bauen wir in einer Größe, die ihr auch ohne eigene IT-Abteilung betreiben könnt.',
  },
  {
    title: 'Team statt Einzelkämpfer',
    description:
      'Hinter dem Gründer steht ein eingespieltes kleines Team. Für jeden Projektbereich kennen sich mindestens zwei Leute aus, auch in der Urlaubszeit.',
  },
  {
    title: 'Pragmatisch mit Open Source',
    description:
      'Für Reporting nehmen wir Metabase, für Auth einen bewährten Baustein. Selbst gebaut wird da, wo euer Prozess anders ist als der aller anderen.',
  },
  {
    title: 'Auch die alten Daten',
    description:
      'In Vertec lagen drei Jahre, Projekte und Rechnungen davor in älteren Systemen. Wir haben sie eingelesen: über 20 Jahre Kundenhistorie, und damit erstmals ein Bild davon, was eine Kundenbeziehung über ihre Laufzeit wert ist.',
  },
  {
    title: 'Direkt, mit Widerspruch',
    description:
      'Ihr schreibt in einen Channel, in dem die Leute sitzen, die es bauen. Und ihr hört es, wenn eine Anforderung in die falsche Richtung läuft, statt sie einfach umgesetzt zu bekommen.',
  },
];

export const serviceAreas = [
  {
    title: 'Discovery & Prozessanalyse',
    description:
      'Bevor wir über Umsetzung reden, schauen wir uns an, wie bei euch tatsächlich gearbeitet wird. Nicht wie es im Handbuch steht.',
    bullets: [
      'Aufnahme des Prozesses, wie er wirklich läuft',
      'Priorisierung: was schmerzt, was kann warten',
      'Lösungsrichtungen, die sich umsetzen lassen',
    ],
  },
  {
    title: 'Konzeption & UX',
    description:
      'Fachlogik und Bedienung entstehen zusammen. Eine Anwendung, die fachlich stimmt, aber niemand gern benutzt, wird umgangen.',
    bullets: [
      'Datenmodell und Prozessdesign',
      'Klickbare Mockups für die kritischen Abläufe',
      'Übersetzung zwischen Fachbereich und Technik',
    ],
  },
  {
    title: 'Individualsoftware & Integration',
    description:
      'Plattformen, Portale und interne Werkzeuge, die mit euren Prozessen wachsen und sich in das einfügen, was ihr schon habt.',
    bullets: [
      'Webbasierte Individualsoftware',
      'Migration aus Standard- oder Altsystemen, inklusive Datenbereinigung',
      'Schnittstellen zu ERP, PIM, CRM und BI',
    ],
  },
  {
    title: 'Betrieb & Weiterentwicklung',
    description:
      'Nach dem Go-live sind wir weiter da. Die meisten unserer Projekte laufen seit Jahren und werden Stück für Stück ausgebaut.',
    bullets: [
      'Monitoring und Qualitätssicherung',
      'Weiterentwicklung in kleinen Schritten',
      'Dokumentation, mit der auch andere weiterarbeiten können',
    ],
  },
];

const casesRaw = [
  {
    slug: 'bonprix',
    client: 'bonprix',
    title: 'PLM/PIM-Neubau mit internationaler Teamintegration',
    description:
      'Neubau einer Produktdaten-Plattform bei bonprix: RocketBase übernahm die technische Führung und brachte die Hamburger Delivery mit einem indischen Entwicklungsteam zusammen.',
    navTeaser: 'PLM/PIM-Plattform für den Konzernalltag.',
    kicker:
      'Ein Monolith, aufgeteilt in Microservices. Über mehrere Jahre, mit Teams auf zwei Kontinenten.',
    highlights: [
      'Technische Führung und Teamaufbau über mehrere Jahre',
      'Aufteilung eines Monolithen in Microservices',
      'Delivery zwischen Hamburg und einem indischen Entwicklungsteam',
    ],
    challenge:
      'Ein Produktdatenmodell mit jahrelang gewachsener Logik sollte neu gebaut werden. Gleichzeitig arbeiteten Teams in Hamburg und Indien daran, mit allem, was das an Zeitverschiebung, Sprache und unterschiedlichen Arbeitsweisen mitbringt.',
    approach:
      'RocketBase schrieb Code und strukturierte daneben die Zusammenarbeit: Workshops, Übergaben, Zuständigkeiten. In einem verteilten Setup entscheidet das oft mehr über die Delivery als die Architektur.',
    impact:
      'Aus dem Monolithen wurden Microservices, und die Teams über zwei Kontinente spielten am Ende zusammen. Das Muster passt überall, wo ein gewachsenes Datenmodell und verteilte Teams gleichzeitig zu handhaben sind.',
    processFocus: 'Pflege und Abstimmung von Produktdaten über mehrere Teams und Standorte hinweg.',
    outcomes: [
      'Klare Übergaben und Zuständigkeiten zwischen den Standorten',
      'Eine Architektur, die sich in Teilen weiterentwickeln lässt statt im Ganzen',
    ],
    services: [
      'Technische Führung',
      'Team- und Schnittstellenintegration',
      'Workshops und Zusammenarbeit im Projektsetup',
    ],
    screenshots: [
      { key: 'bonprix-wizard', alt: 'Create Wizard' },
      { key: 'bonprix-datasheet', alt: 'Produkt Datenblatt' },
      { key: 'bonprix-search', alt: 'Flexible Suche' },
    ],
    testimonial: {
      quote:
        'Unsere Zusammenarbeit mit RocketBase war durchweg positiv. Die langjährige Erfahrung in der Individualentwicklung und das umfassende Know-how von Bonrpix haben sich wirklich ausgezahlt. Selbst die Herausforderung, mit indischen Entwicklungsteams zu kooperieren, hat RocketBase hervorragend gemeistert. Letztendlich sind wir äußerst zufrieden, dass wir unseren Monolithen erfolgreich in Microservices aufgeteilt haben, was uns nun eine flexible und effiziente Systemarchitektur ermöglicht.',
      author: 'Lars Globisch',
      position: 'Head of Product & Technology',
      portraitKey: 'globisch',
    },
  },
  {
    slug: 'statista',
    client: 'Statista',
    title: 'Neue Content-Plattform statt gewachsener Altsysteme',
    description:
      'Eine neue Plattform für die Pflege von Statistiken und Inhalten bei Statista, inklusive Migration, Parallelbetrieb und neuer Redaktionsoberflächen.',
    navTeaser: 'Redaktionsplattform für Statistik-Inhalte.',
    kicker: 'Ein Altsystem ablösen, während die Redaktion jeden Tag damit arbeitet.',
    highlights: [
      'Ablösung einer kritischen Kernanwendung im laufenden Betrieb',
      'Spring-Boot-Backend, React-Oberflächen',
      'Fachanwender von Anfang an mit am Tisch',
    ],
    challenge:
      'Die Redaktion pflegte Statistiken und Inhalte in einem über Jahre gewachsenen System. Es sollte ersetzt werden, ohne dass die tägliche Arbeit stehen bleibt und ohne dass die Redakteure ihre eingespielten Abläufe verlieren.',
    approach:
      'Statt zuerst die Architektur zu entwerfen, saß RocketBase bei den Redakteuren und schaute zu, wie sie arbeiten. Was dabei auffiel, prägte den Zuschnitt der neuen Oberflächen. Migration und Parallelbetrieb liefen so, dass beide Systeme eine Zeit lang nebeneinander standen.',
    impact:
      'Das Altsystem ist abgelöst, die Redaktion hat ihren Alltag behalten. Das lag daran, dass die Fachanwender vom ersten Workshop an dabei waren und nicht erst beim Abnahmetermin.',
    processFocus:
      'Pflege, Strukturierung und Veröffentlichung von Statistik- und Content-Daten in redaktionellen Abläufen.',
    outcomes: [
      'Weniger Umwege und Handarbeit in der redaktionellen Pflege',
      'Mehr Zeit für Inhalte statt für Systemkompromisse',
      'Eine Basis, die sich weiterentwickeln lässt',
    ],
    services: [
      'Plattformmodernisierung',
      'Enge Abstimmung mit Fachanwendern',
      'Migration und Parallelbetrieb',
    ],
    screenshots: [
      { key: 'statista-search', alt: 'Flexible Suche' },
      { key: 'statista-visual-editor', alt: 'Visueller Editor' },
      { key: 'statista-editor', alt: 'Flexibler Editor' },
    ],
    testimonial: {
      quote:
        'Die Zusammenarbeit mit Marten und seinem Team war äußerst inspirierend und hat unsere Produktvision maßgeblich bereichert. Dank ihrer tiefgreifenden Expertise in maßgeschneiderten Datenverwaltungssystemen konnten sie ein präzises technisches Konzept entwickeln, das effizient und zielgerichtet umgesetzt wurde. Besonders beeindruckend war der nahtlose Wissenstransfer innerhalb des Teams, bei dem keine Unterscheidung zwischen externen und internen Beteiligten erkennbar war.',
      author: 'Ingo Schellhammer',
      position: 'CTO',
      portraitKey: 'schellhammer',
    },
  },
  {
    slug: 'fkc-consulting',
    client: 'FKC Consulting',
    title: 'Von der Vertec-Welt zur individuellen Beratungsplattform',
    description:
      'Eine etablierte Standardsoftware (Vertec) sollte das Beratungsgeschäft tragen, passte aber an entscheidenden Stellen nie richtig zum Unternehmen. RocketBase löste sie ab: Bestandsdaten herausgelöst und migriert, der reale Angebots- und Projektprozess sauber neu modelliert – von der Pipeline über die Durchführung bis zur Rechnung.',
    kicker:
      'Genau das Standard-Dilemma: technisch sauber gebaut, aber als ein System für alle – die eierlegende Wollmilchsau, in der die eigenen, entscheidenden Strukturen keinen Platz finden. Abgelöst durch eine Anwendung, die das tatsächliche Beratungsmodell abbildet.',
    highlights: [
      'Ablösung einer Standardsoftware, die nicht zum Prozess passte',
      'Migration und Bereinigung aus proprietären Bestandsstrukturen',
      'Angebot, Kalkulation und Rechnung nativ am realen Prozess',
    ],
    challenge:
      'Eine etablierte Standardsoftware sollte das Beratungsgeschäft tragen, wurde aber binnen weniger Jahre eher zur Last als zur Entlastung. Der eigene Angebots- und Projektprozess passte nur über Umwege hinein, das Team musste immer mehr von Hand auffangen, und für Steuerung und Prognosen fehlten die Auswertungen im nötigen Detail. Gleichzeitig steckten wertvolle Bestandsdaten in Strukturen, die sauber herausgelöst werden mussten.',
    approach:
      'RocketBase arbeitete sich in das Bestandssystem ein und nahm den realen Prozess auf – nicht die Systemlandschaft. Auf dieser Basis wurde die Datenmigration geplant. In Vertec lagen nur die letzten drei Jahre; Projekte und Rechnungen davor steckten in älteren Systemen. Beides wurde eingelesen und bereinigt, sodass heute über 20 Jahre Kundenhistorie in einer Anwendung liegen. Darauf aufbauend entstand eine individuelle Anwendung, die das tatsächliche Beratungsmodell abbildet: vom Vertrieb als Kanban-Board über die automatische Angebotskalkulation und die integrierte Terminplanung bis zur Rechnung mit direktem Versand – Angebot und Durchführung sauber getrennt, damit Plan und Ergebnis auswertbar bleiben.',
    // TODO: Vorher/Nachher-Zahlen ergänzen (Minuten pro Angebot, Angebote pro Monat).
    impact:
      'Ein Muster, das viele inhabergeführte Beratungen kennen: Die Standardsoftware, die entlasten sollte, bindet am Ende Personal, statt es freizusetzen. Weil Beratungszeit das Produkt ist, schlägt jede Stunde, die ins Auffangen statt in Kundenarbeit fließt, direkt auf die Marge. Der zweite Effekt zeigt sich beim Kunden. FKC hat die eigenen Wettbewerber verglichen: Alle verschicken Angebote als Word oder PDF und klären Rückfragen per Mail. FKC schickt heute eine Web-Seite, auf der der Kunde Optionen an- und abwählt und die Summe mitläuft, holt fehlende Angaben über ein vorbefülltes Formular und sieht, wann das Angebot geöffnet wurde. Relevant für jedes projektgetriebene Haus, dessen Software mehr verwaltet als trägt.',
    processFocus:
      'Der Kernprozess der Beratung: vom Angebot über die Projektdurchführung bis zur Rechnung. Im Standard waren Angebot und Durchführung so verwoben, dass sich Plan und Ergebnis kaum noch gegenüberstellen ließen.',
    outcomes: [
      'Über 20 Jahre Projekt- und Rechnungshistorie zusammengeführt, Grundlage für einen Customer Lifetime Value, den es vorher nicht gab',
      'Der reale Angebots- und Projektprozess steht im System, für alle nachvollziehbar',
      'Weniger Handarbeit im Tagesgeschäft, weil Vertrieb, Kalkulation und Rechnung ineinandergreifen',
      'Kalkulation und Deckungsbeitrag direkt am Prozess statt nachgelagert zusammengesucht',
      'Eine Basis, auf der sich das Geschäft weiterentwickeln lässt',
    ],
    services: [
      'Ablösung angepasster Standardsoftware (Vertec)',
      'Datenmigration und -bereinigung aus Bestandssystemen',
      'Individuelle Beratungsplattform: Angebot, Kalkulation, Abrechnung',
    ],
    solved: [
      {
        title: 'Vertrieb als Kanban-Board',
        benefit: 'Jedes Angebot auf einen Blick – vom ersten Kontakt bis zum Auftrag.',
      },
      {
        title: 'Angebot rechnet sich selbst',
        benefit:
          'Mitarbeiter und Aufwände fließen automatisch in die Kalkulation, samt Deckungsbeitrag.',
      },
      {
        title: 'Angebote, die etwas hermachen',
        benefit:
          'Eine Web-Seite mit auf- und zuklappbaren Optionen und mitlaufender Summe, während der Wettbewerb PDFs schickt – aus demselben System.',
      },
      {
        title: 'Rückfragen über ein vorbefülltes Formular',
        benefit:
          'Fehlende Angaben trägt der Kunde selbst nach, auf einer Seite, die schon weiß, worum es geht.',
      },
      {
        title: 'Sehen, wann das Angebot geöffnet wurde',
        benefit: 'Nachfassen zum richtigen Zeitpunkt statt auf Verdacht.',
      },
      {
        title: 'Termine direkt im Projekt',
        benefit: 'Planung und Durchführung an einer Stelle, statt in getrennten Tools nebenher.',
      },
      {
        title: 'Rechnung raus per Klick',
        benefit: 'Versand direkt aus dem System, mit einem Klick beim fertigen Beleg.',
      },
      {
        title: 'Plan gegen Ergebnis auswertbar',
        benefit:
          'Angebot und Durchführung sauber getrennt – Kalkulation und Realität endlich vergleichbar.',
      },
    ],
    screenshots: [
      { key: 'fkc-sales-kanban', alt: 'Sales-Pipeline im Kanban-Board' },
      { key: 'fkc-proposal-calculate', alt: 'Angebotskalkulation' },
      { key: 'fkc-poroposal-presentation', alt: 'Angebotspräsentation' },
      { key: 'fkc-invoice', alt: 'Rechnungsansicht' },
    ],
  },
  {
    slug: 'schlosserei-diezinger',
    client: 'Schlosserei Diezinger',
    title: 'Einsatzplanung, die den Betrieb wirklich kennt',
    description:
      'Wer wann an was arbeitet, wer ausfällt, welche Aufträge laufen – das alles lief bei Schlosserei Diezinger über Excel. Jetzt gibt es dafür ein System, das den handwerklichen Alltag versteht.',
    kicker:
      'Ablösung aufwändiger manueller Planung durch eine flexible, rollenbasierte Lösung für Einsatz- und Auftragssteuerung.',
    highlights: [
      'Dynamischer Kalender- und Aufgabenflow für Mitarbeiter und Abteilungen',
      'Automatische Anzeige von Abwesenheiten wie Krankheit oder Urlaub',
      'Rollenbasierte Dashboards, Barcode-Scan und Anmeldung per Personalkarte',
    ],
    challenge:
      'Die Planung lief bisher über manuelle Excel-Tabellen. Es fehlte ein zentraler Überblick, wer wann an welchem Auftrag arbeitet, und Abwesenheiten mussten gesondert gepflegt werden. Mit wachsendem Betrieb wurde das System zunehmend unhandlich.',
    approach:
      'RocketBase entwickelte eine flexible Individuallösung mit lebendigem Kalender- und Aufgabenplan, je Rolle zugeschnittenen Dashboards und automatischer Abwesenheitsberücksichtigung – ergänzt um Barcode-Scan und eine eigens gebaute Anmeldung per Personalkarte für den Alltag im handwerklichen Betrieb.',
    impact:
      'Vorher: ein Excel-Blatt pro Woche, ohne flexibles Verschieben, ohne Blick über mehrere Wochen – und Konflikte fielen erst auf, wenn es zu spät war. Heute läuft die Planung im Büro mit allen Details und am Werkstatt-Terminal genauso bedienbar. Relevant für jeden Betrieb, dessen Disposition über gewachsene Tabellen läuft.',
    processFocus:
      'Mitarbeiter- und Auftragsplanung, Ressourcenzuweisung und tägliche Betriebssteuerung im handwerklichen Umfeld.',
    outcomes: [
      'Deutlich weniger manueller Aufwand durch Wegfall der Excel-Planung',
      'Transparenz über Auslastung, Verfügbarkeit und Auftragsstand in Echtzeit',
      'Einfachere Bedienung im Alltag durch Barcodes, Druckfunktion und Anmeldung per Personalkarte',
    ],
    services: [
      'Individualentwicklung einer Planungs- und Steuerungslösung',
      'Rollenbasierte Dashboards und Konfigurationsmanagement',
      'NFC-Login und Barcode-Integration',
    ],
    solved: [
      {
        title: 'Planung über mehrere Wochen',
        benefit:
          'Auslastung und freie Kapazitäten auf einen Blick – statt Ausdrucke und Behelfslösungen für den Blick nach vorn.',
      },
      {
        title: 'Abwesenheiten automatisch berücksichtigt',
        benefit:
          'Urlaub, Krankheit und Berufsschule fließen direkt in die Planung – wer nicht da ist, taucht gar nicht erst als verplanbar auf.',
      },
      {
        title: 'Aufträge flexibel aufteilen',
        benefit:
          'Ein Auftrag lässt sich auf mehrere Mitarbeiter und über mehrere Tage splitten und gezielt steuern.',
      },
      {
        title: 'Wareneingang sauber protokolliert',
        benefit:
          'Teilelieferungen werden direkt im Tool erfasst – jederzeit nachvollziehbar, was wann angekommen ist.',
      },
      {
        title: 'Jeder sieht, was er braucht',
        benefit:
          'Werkstatt, Planung und Leitung bekommen je ein eigenes Dashboard, auf dem das Wichtige direkt oben steht.',
      },
      {
        title: 'Anmeldung per Personalkarte',
        benefit:
          'Login am Werkstatt-Terminal mit der Karte, die jeder ohnehin dabei hat – schnell genug für den Alltag.',
      },
    ],
    screenshots: [
      { key: 'metall-dashboard', alt: 'Rollenbasiertes Dashboard' },
      { key: 'metall-board', alt: 'Einsatzplanungs-Board' },
      { key: 'metall-board-highlighted', alt: 'Einsatzplanung mit hervorgehobenem Auftrag' },
      { key: 'metall-order', alt: 'Auftragsübersicht' },
    ],
  },
];

// Anzeige-Reihenfolge der Hauptreferenzen (Nav-Dropdown nimmt die ersten drei,
// die Referenz-Übersicht zeigt sie in genau dieser Folge). bonprix bewusst zuletzt.
const caseOrder = ['fkc-consulting', 'statista', 'schlosserei-diezinger', 'bonprix'];
export const cases = [...casesRaw].sort(
  (a, b) => caseOrder.indexOf(a.slug) - caseOrder.indexOf(b.slug)
);

export const additionalCases = [
  {
    slug: 'statista-canva',
    client: 'Statista',
    title: 'Statista-Daten direkt in Canva nutzbar',
    description:
      'RocketBase entwickelte die Statista-App für das Canva-Ökosystem, über die Nutzerinnen und Nutzer geprüfte Statistiken direkt in ihre Designs und Präsentationen einbinden können – samt neu entwickeltem Image-Service für Preview-Grafiken.',
    kicker: 'Statistiken landen dort, wo die Präsentation ohnehin entsteht.',
    highlights: [
      'Pilot-App in der Alpha-Phase einer neuen Canva-Schnittstelle',
      'Eigenständiger Image-Service für On-the-fly-Previews',
      'AWS-Deployment über CDK und GitHub-Pipelines',
    ],
    challenge:
      'Statista suchte einen Weg, Inhalte außerhalb der eigenen Plattform dort verfügbar zu machen, wo Anwender sie direkt weiterverarbeiten. Die neue Canva-Datenintegration war noch in der Alpha, inklusive offener technischer Fragen zu Preview-Bildern und Authentifizierung.',
    approach:
      'Wir übernahmen Konzeption und Umsetzung: Integration ins Canva SDK, direkte Abstimmung mit dem Canva-Team und ein eigener Image-Service samt Betriebsinfrastruktur auf AWS. Weil die Schnittstelle noch Alpha war, änderten sich Vorgaben teilweise während der Entwicklung.',
    impact:
      'Statista hat einen neuen Kanal: Die Inhalte sind da, wo die Nutzer arbeiten. Interessant für jeden, der Daten in fremde Plattformen bringen will, statt zu warten, dass Kunden auf die eigene Seite kommen.',
    processFocus:
      'Bereitstellung und Integration statistischer Daten in fremde Gestaltungsumgebungen über geprüfte Schnittstellen.',
    outcomes: [
      'Neuer Distributionskanal für Statista-Inhalte im Canva-Ökosystem',
      'Robustere Bildgenerierung über einen dedizierten, skalierbaren Service',
      'Belastbare Grundlage für weitere Integrationen in Dritt-Plattformen',
    ],
    services: [
      'Konzeption und Plattformintegration',
      'Image-Service und Infrastruktur auf AWS',
      'CI/CD und Betrieb',
    ],
    screenshots: [
      { key: 'statista-canva-chart-drawing', alt: 'Canva-Chart erstellen mit Statista-Daten' },
      { key: 'statista-canva-search-results', alt: 'Suche nach Statistiken innerhalb der App' },
      { key: 'statista-canva-data-load', alt: 'Datenladen und Integration in Canva' },
    ],
    testimonial: {
      quote:
        'Durch die Integration der Statista-Daten in das Canva-Ökosystem ermöglichen wir unseren Nutzern eine neue, direkte Integration in ihre Arbeitsabläufe.',
      author: 'Lars Leipson',
      position: 'VP Data Production',
      portraitKey: 'leipson',
    },
  },
  {
    slug: 'stage-cml',
    client: 'Stage Entertainment',
    title: 'Budgetplanung raus aus Excel, rein in einen belastbaren Prozess',
    description:
      'RocketBase überführte die Excel-gestützte Budgetplanung von Stage Entertainment in eine datenbankbasierte Plattform mit Validierung, nächtlichem Abgleich zur Buchhaltung und sauberen Reportings.',
    kicker: 'Eine Planung, die in der Datenbank liegt. Und Zahlen, die zur Buchhaltung passen.',
    highlights: [
      'Ablösung gewachsener Excel-Modelle durch eine zentrale Plattform',
      'Automatisierter nächtlicher Abgleich mit dem Buchhaltungssystem',
      'Deutliche Entlastung im Monatsabschluss',
    ],
    challenge:
      'Die Budgetplanung lief auf komplexen, gewachsenen Excel-Modellen. Das System skalierte nicht mehr, parallele Arbeit war fehleranfällig und eine saubere Verbindung zur Buchhaltung fehlte.',
    approach:
      'Wir überführten die bestehenden Modelle in eine datenbankgestützte Plattform, bauten Validierungen ein und richteten einen nächtlichen Abgleich zwischen Planung und Buchhaltungssystem ein. Die Fachleute planen weiter nach derselben Logik wie vorher, nur ohne die Tabellen.',
    impact:
      'Die Zahlen stimmen jetzt mit der Buchhaltung überein, und der Monatsabschluss dauert kürzer. Als Stage später das Buchhaltungssystem wechselte, überstand die Plattform das ohne Neubau.',
    processFocus: 'Finanzplanung, Reporting und Abgleich mit dem Buchhaltungssystem.',
    outcomes: [
      'Spürbar weniger unentdeckte Fehlbuchungen im laufenden Betrieb',
      'Deutlich kürzere Wege im Monatsabschluss durch automatisiertes Reporting',
      'Systemlandschaft, die einen Wechsel des Buchhaltungssystems überstanden hat',
    ],
    services: [
      'Prozessanalyse und Beratung',
      'Individualentwicklung der Planungsplattform',
      'Integration mit dem Buchhaltungssystem',
    ],
    screenshots: [
      { key: 'stage-cml-planausgaben', alt: 'Erfassung von Planausgaben' },
      { key: 'stage-cml-buchungsliste', alt: 'Buchungsliste mit Validierungs-Info' },
      { key: 'stage-cml-reports', alt: 'Reports und Exporte' },
    ],
    testimonial: {
      quote:
        'Mit RocketBase als Partner haben wir eine signifikante Qualitätssteigerung in unserer Finanzabwicklung erzielt.',
      author: 'Dirk Schwartzkopff',
      position: 'Managing Director',
      portraitKey: 'schwartzkopff',
    },
  },
  {
    slug: 'sam-vorteilsguru',
    client: 'Smart Active Media',
    title: 'Gutscheinportal, das sich in fremde Checkouts einbettet',
    description:
      'Für Smart Active Media baute RocketBase ein Gutscheinportal, das per JavaScript in Partner-Websites und Checkouts eingebunden wird und Leads aus Käufen und Gewinnspielen weiterverwertet.',
    kicker: 'Ein Produkt, das in fremden Shops läuft, über die man keine Kontrolle hat.',
    highlights: [
      'Einbettung per JavaScript in Partner-Shops und Landingpages',
      'Hohe Last stabil betrieben, fünfstellige Impressions pro Tag',
      'Vom Start bis zur ersten Live-Einbindung in sechs Monaten',
    ],
    challenge:
      'Smart Active Media brauchte eine Lösung, die sich reibungsarm in fremde Checkouts einbauen lässt, dabei performant bleibt und gleichzeitig verschiedene Kooperationspartner sauber bedient.',
    approach:
      'RocketBase begleitete Konzept und Wettbewerbsanalyse, setzte Frontend und Backend um und betrieb den Dienst auf einer Infrastruktur, die für hochfrequentierte Einbindungen ausgelegt ist.',
    impact:
      'Aus einer Startup-Idee wurde ein Produkt, das zuverlässig in fremden Shops läuft und auch bei hoher Last nicht wegbricht. Relevant für alle, die ein Produkt bei Partnern einbinden wollen, ohne dass es bei Andrang ausfällt.',
    processFocus: 'Leadverwertung über eingebettete Gutscheinflächen in Partner-Websites.',
    outcomes: [
      'Belastbares Produkt mit hoher Verfügbarkeit ab Go-live',
      'Skalierbarer Betrieb bei fünfstelligen Impressions pro Tag',
      'Tragfähige Basis, um weitere Partner und Varianten aufzuschalten',
    ],
    services: [
      'Beratung, Konzept und Wettbewerbsanalyse',
      'Frontend- und Backend-Entwicklung',
      'Hosting und Betrieb unter Last',
    ],
    screenshots: [
      { key: 'sam-vorteilsguru-embed', alt: 'Embed-Testumgebung' },
      { key: 'sam-vorteilsguru-einbindung', alt: 'Flexible Einbindung in Partner-Sites' },
      { key: 'sam-vorteilsguru-workflows', alt: 'Ausgefeilte Workflows' },
    ],
    testimonial: {
      quote:
        'RocketBase hat unsere Startup-Idee erfolgreich zum Leben erweckt und uns eine solide technische Grundlage geschaffen.',
      author: 'Thorsten Blöcker',
      position: 'CEO & Founder',
      portraitKey: 'bloecker',
    },
  },
  {
    slug: 'mavox-winterdienst',
    client: 'MAVOX Winterdienst',
    title: 'Tourenplanung und mobile Einsatzerfassung im Außendienst',
    description:
      'RocketBase löste ein nicht mehr tragfähiges Altsystem ab und entwickelte eine hybride App inklusive neuem Backend für Routen, Fahrzeuge, Objekte und Einsätze – mit Offline-Funktion für den harten Außendienst.',
    kicker:
      'Ein System, das auch dann funktioniert, wenn draußen kein Netz ist – und trotzdem sauber synchronisiert.',
    highlights: [
      'Ablösung eines undokumentierten Altsystems inklusive Migration',
      'Hybride Mobile-App mit Offline-Funktion und Push-Nachrichten',
      'Erweiterung auf Mandantenfähigkeit und weitere Dienstleistungen',
    ],
    challenge:
      'Die bestehende Lösung war ein gewachsenes Altsystem, dessen Datenmodell kaum dokumentiert war. Gleichzeitig wuchs MAVOX und brauchte mobile Erfassung im Einsatz – auch ohne stabiles Netz.',
    approach:
      'RocketBase analysierte und migrierte das Bestandssystem, baute ein neues Backend für Routen, Objekte und Mitarbeiter und entwickelte eine hybride App, die offline arbeitet und später synchronisiert.',
    impact:
      'Der Außendienst erfasst seine Einsätze jetzt direkt vor Ort – auch mit Handschuhen und ohne Netz, mit späterer Synchronisierung. Schluss mit dem Nachtragen am Abend. Relevant für jeden Betrieb, dessen Leute draußen arbeiten und drinnen abrechnen.',
    processFocus: 'Einsatzplanung, Tourenführung und Leistungserfassung im mobilen Außendienst.',
    outcomes: [
      'Weniger manuelle Nacharbeit durch direkte Erfassung im Einsatz',
      'Transparenz über Touren, Einsätze und Objekte in Echtzeit',
      'Basis, um neue Dienstleistungen und weitere Mandanten aufzunehmen',
    ],
    services: [
      'Analyse und Migration des Altsystems',
      'Backend und Hybrid-App mit Offline-Funktionalität',
      'Hosting und Veröffentlichung in App Store und Play Store',
    ],
    screenshots: [
      { key: 'mavox-winterdienst-mobile', alt: 'Mobile App im Einsatz' },
      { key: 'mavox-winterdienst-tourenplanung', alt: 'Tourenplanung' },
      { key: 'mavox-winterdienst-planung', alt: 'Umfassende Planung' },
    ],
    // testimonial: deaktiviert, bis ein echtes Portrait von Christian Grupp verfügbar ist.
    // Ursprüngliche Daten:
    //   quote:    'Die Software von RocketBase hat unsere Prozesse exakt so abgebildet, wie wir es benötigen, wodurch wir unsere Effizienz und Effektivität weiter steigern konnten.'
    //   author:   'Christian Grupp'
    //   position: 'Head of IT'
  },
  {
    slug: 'bonprix-collection-planning',
    client: 'bonprix',
    title: 'VK- und Sortimentsplanung aus Excel in eine kollaborative Plattform überführt',
    description:
      'RocketBase übertrug das in Excel entstandene VK-Planungsmodell und Sortimentsmengenmodell in eine datenbankgestützte Plattform mit Massenbearbeitung, Versionierung und verlässlichen Referenzwerten.',
    kicker:
      'Die Flexibilität von Excel erhalten – und gleichzeitig Mehrbenutzerbetrieb, Datenqualität und Versionierung gewinnen.',
    highlights: [
      'Portierung komplexer Excel-Modelle mit allen Formeln',
      'Mehrbenutzerbetrieb ohne Kollisionen und Formel-Verluste',
      'Versionierung mit Sperr- und Freigabeprozessen',
    ],
    challenge:
      'Die Planungsmodelle waren in Excel über Jahre verfeinert worden. Der Betrieb stieß an Grenzen bei paralleler Arbeit, Schutz vor Formelüberschreibung und der Frage, wie Planwerte sauber festgeschrieben und später als Referenz genutzt werden.',
    approach:
      'RocketBase analysierte die Modelle und Abläufe, portierte sie in eine Plattform mit bekannten Excel-Bedienmustern und ergänzte Prüfmechanismen, Versionierung und Freigabeprozesse.',
    impact:
      'Das Controlling plant jetzt gemeinsam an denselben Zahlen – ohne Formel-Chaos und ohne sich gegenseitig die Tabelle zu überschreiben, und trotzdem so vertraut wie in Excel. Relevant überall, wo mehrere Leute parallel an gewachsenen Planungstabellen arbeiten.',
    processFocus: 'VK- und Sortimentsmengenplanung im Controlling bei bonprix.',
    outcomes: [
      'Gemeinsame Arbeit an Plänen ohne Formelverluste und Versionschaos',
      'Verlässliche Referenzwerte für Folgeplanungen durch klare Versionsstände',
      'Spürbar weniger Reibung im Alltag des Controllings',
    ],
    services: [
      'Beratung und Prozessanalyse',
      'Individualentwicklung mit Excel-nahen Bedienmustern',
      'Versionierung und Freigabeprozesse',
    ],
    screenshots: [
      { key: 'bonprix-collection-plan-report', alt: 'Plan-Report mit Prüfungen' },
      { key: 'bonprix-collection-versionierung', alt: 'Versionierung und Sperrungen' },
      { key: 'bonprix-collection-plan-wizard', alt: 'Plan-Wizard' },
    ],
    testimonial: {
      quote:
        'RocketBase hat uns nicht nur mit einer leistungsfähigen Plattform überzeugt, sondern auch mit hervorragender Beratung und kreativen Lösungen.',
      author: 'Remin',
      position: 'Controlling Specialist',
      portraitKey: 'remin',
    },
  },
];

export const processSteps = [
  {
    title: 'Verstehen',
    description:
      'Wir schauen uns an, wie ihr arbeitet: Rollen, Systeme, die Stellen wo es klemmt. Bevor Budget in die falsche Richtung läuft.',
  },
  {
    title: 'Priorisieren',
    description:
      'Nicht alles muss gebaut werden. Wir trennen, wo sich Eigenentwicklung lohnt und wo ein fertiger Baustein schneller ans Ziel bringt.',
  },
  {
    title: 'Umsetzen',
    description:
      'Konzept, Architektur und Entwicklung bleiben in einer Hand. Ihr müsst Entscheidungen nicht zwischen mehreren Parteien übersetzen.',
  },
  {
    title: 'Weiterentwickeln',
    description:
      'Der Go-live ist der Anfang. Die meisten unserer Projekte laufen seit Jahren und wachsen in kleinen Schritten weiter.',
  },
];

export const discoveryOffer = {
  title: 'Discovery-Workshop',
  subtitle: 'Ein Tag, ein Dokument, eine Entscheidung.',
  description:
    'Wir sitzen mit euren Keyusern zusammen, nehmen die dringendsten Baustellen auf und entwerfen ein Zielbild für die erste Ausbaustufe. Am Ende steht eine Empfehlung mit Kostenrahmen: ausbauen, ablösen oder so lassen. Ein Tag, 2.400 €, und das Dokument gehört euch, auch wenn ihr danach mit jemand anderem weiterarbeitet.',
  deliverables: [
    'Bestandsaufnahme der dringendsten Engpässe',
    'Quickwins, die sich kurzfristig umsetzen lassen',
    'Zielbild für die erste Ausbaustufe',
    'Mockups oder Prozessskizzen für die Kernabläufe',
    'Eine Empfehlung mit Kostenrahmen: ausbauen, ablösen oder so lassen',
  ],
};

export const teamPrinciples = [
  'Remote arbeitendes Team, verteilt über Nord- und Süddeutschland',
  'Regelmäßige Offsites, weil manches am selben Tisch schneller geht',
  'Kurze Wege statt Agentur-Overhead',
  'KI da eingesetzt, wo sie Arbeit spart, nicht als Selbstzweck',
];

/**
 * Mission page – chapters with eyebrow, headline, key facts,
 * a visualization hint and a flowing body text.
 *
 * `visual` is a discriminator for the rendering layer; the page picks
 * the matching component pattern (timeline, counter, split, etc.).
 */
export const missionClaim = {
  eyebrow: 'Unsere Mission',
  headline: 'Wir bauen nicht einfach Software.',
  highlight: 'Wir denken Prozesse weiter.',
  lead: '<strong>Acht Haltungen</strong>, wie und warum wir bei RocketBase arbeiten. Kein Leitbild fürs Schönwetter, sondern die <strong>Prinzipien</strong>, an denen ihr uns im Projekt messen könnt.',
};

export const missionSections = [
  {
    id: 'fundament',
    number: '01',
    eyebrow: 'Fundament',
    title: 'Erfahrung trifft Verantwortung',
    keyFacts: [
      { label: 'Jahre Projekterfahrung', value: 15, suffix: '+' },
      { label: 'Enterprise-Plattformen mitgestaltet', value: 10, suffix: '+' },
      { label: 'Konzern- & Mittelstandsprojekte', value: 40, suffix: '+' },
    ],
    visual: 'timeline' as const,
    timeline: [
      { year: '2009', label: 'Otto Group · Projektmanager' },
      { year: '2014', label: 'Otto Group · Architect' },
      { year: '2016', label: 'RocketBase · bonprix, statista, klingel u.a.' },
      { year: 'heute', label: 'Plattformen, die in 5+ Jahren noch tragen' },
    ],
    body: 'Über fünfzehn Jahre in Softwareprojekten, vom Konzern bis zum gewachsenen Mittelstandsprozess. Diese Erfahrung nutzen wir für Entscheidungen, nicht für Verkaufsargumente. Praktisch heißt das: Wir wählen Architektur und Technologie so, dass sie auch in zehn Jahren noch tragen. Auch dann, wenn jemand anderes das Projekt übernommen hat.',
  },
  {
    id: 'beratung',
    number: '02',
    eyebrow: 'Haltung',
    title: 'Beratung vor Code',
    keyFacts: [
      { label: 'Fokus auf Prozesse statt nur Features' },
      { label: 'Direkter Austausch mit Fachbereichen' },
      { label: 'Tech Lead ab Tag 1 im Projekt' },
    ],
    visual: 'flow' as const,
    flow: [
      {
        kicker: 'Heute',
        title: 'Ist-Prozess',
        text: 'Gewachsen, dokumentiert oder in Köpfen verteilt.',
      },
      {
        kicker: 'Reibung',
        title: 'Engpässe sichtbar machen',
        text: 'Wo Übergaben, Medienbrüche und Workarounds Tempo kosten.',
      },
      {
        kicker: 'Morgen',
        title: 'Zielbild',
        text: 'Ein Prozess, der das Geschäft trägt – nicht umgekehrt.',
      },
    ],
    body: 'Bevor eine Zeile Code entsteht, muss klar sein, welches Problem sie löst. Wir setzen uns mit den Leuten zusammen, die den Prozess täglich fahren, und schauen, wo er hakt. Oft stellt sich dabei heraus, dass die ursprüngliche Anforderung gar nicht der eigentliche Engpass war.',
  },
  {
    id: 'team',
    number: '03',
    eyebrow: 'Setup',
    title: 'Kleines Team statt Übergabeketten',
    keyFacts: [
      { label: 'Kein klassischer Vertriebskanal' },
      { label: 'Direkter Draht zum Tech Lead' },
      { label: 'Hohe Verbindlichkeit in Aussage und Umsetzung' },
    ],
    visual: 'compare' as const,
    compare: {
      a: {
        kicker: 'Klassische Agentur',
        title: 'Vertrieb → PM → Konzeption → Dev',
        points: [
          'Mehrere Übergaben',
          'Wissen geht zwischen Rollen verloren',
          'Aussagen relativieren sich von Stufe zu Stufe',
        ],
      },
      b: {
        kicker: 'RocketBase',
        title: 'Ein eingespieltes Team. Eine Verantwortung.',
        points: [
          'Beratung, Konzept und Umsetzung sitzen am selben Tisch',
          'Entscheidungen werden direkt getroffen, nicht weitergereicht',
          'Was zugesagt wird, wird auch so gebaut',
        ],
      },
    },
    body: 'Ihr sprecht mit den Leuten, die das Projekt auch bauen. Wer euch etwas zusagt, setzt es anschließend selbst um. Beratung, Konzept und Umsetzung sitzen am selben Tisch, deshalb wird gebaut, was besprochen wurde.',
  },
  {
    id: 'systeme',
    number: '04',
    eyebrow: 'Anspruch',
    title: 'Prozesse verstehen. Systeme bauen, die wachsen.',
    keyFacts: [
      { label: 'Skalierbare Geschäftsprozesse statt Einzellösungen' },
      { label: 'Standardisierung individueller Abläufe' },
      { label: 'Schnellere Einarbeitung neuer Mitarbeiter' },
    ],
    visual: 'loop' as const,
    loop: [
      { label: 'Prozess', icon: 'layout' },
      { label: 'System', icon: 'box' },
      { label: 'Skalierung', icon: 'trending-up' },
      { label: 'Neue Mitarbeiter', icon: 'users' },
    ],
    body: 'Software ist Teil eures Unternehmens, nicht ein Projekt daneben. Wir bilden Prozesse so ab, dass ihr wachsen könnt, ohne dass die Komplexität mitwächst. Ein gutes System merkt man daran, dass neue Kollegen schneller produktiv werden und das Wissen im System steht statt in einzelnen Köpfen.',
  },
  {
    id: 'pragmatismus',
    number: '05',
    eyebrow: 'Technologie',
    title: 'Pragmatismus statt Dogma',
    keyFacts: [
      { label: 'Open Source dort, wo es trägt' },
      { label: 'Integration bestehender Systeme' },
      { label: 'Kein „Alles neu bauen"-Reflex' },
    ],
    visual: 'modules' as const,
    modules: [
      {
        title: 'Bewährter Baustein',
        subtitle: 'Open Source · ERP · CRM · BI',
        tone: 'muted' as const,
        icon: 'database',
      },
      {
        title: 'Bewährter Baustein',
        subtitle: 'Auth · Storage · Search',
        tone: 'muted' as const,
        icon: 'shield',
      },
      {
        title: 'Individuelle Logik',
        subtitle: 'Genau dort, wo Vorsprung entsteht',
        tone: 'brand' as const,
        icon: 'sparkles',
      },
      {
        title: 'Bewährter Baustein',
        subtitle: 'Monitoring · Logging · CI',
        tone: 'muted' as const,
        icon: 'monitor',
      },
      {
        title: 'Individuelle Logik',
        subtitle: 'Eure Geschäftsregeln, euer Vorteil',
        tone: 'brand' as const,
        icon: 'zap',
      },
      {
        title: 'Bewährter Baustein',
        subtitle: 'PIM · DAM · Mailing',
        tone: 'muted' as const,
        icon: 'box',
      },
    ],
    body: 'Nicht alles muss neu gebaut werden. Für Reporting nehmen wir Metabase, für andere Bausteine das, was sich bewährt hat. Open Source ist dabei ein Werkzeug wie jedes andere, genauso wie proprietäre Systeme. Was zu eurem Problem passt, entscheidet, nicht die Technologiepräferenz.',
  },
  {
    id: 'qualitaet',
    number: '06',
    eyebrow: 'Engineering',
    title: 'Moderne Entwicklung mit klarem Qualitätsanspruch',
    keyFacts: [
      { label: 'KI-gestützte Entwicklung für mehr Tempo' },
      { label: 'Sauberer Code, klare Architektur, Wartbarkeit' },
      { label: 'Security, Performance & Auswertbarkeit ab Tag 1' },
    ],
    visual: 'layers' as const,
    layers: [
      { kicker: '01', title: 'Mockup', text: 'Konzept und Entscheidung im Bild.', icon: 'palette' },
      { kicker: '02', title: 'Code', text: 'Sauber, getestet, KI-unterstützt.', icon: 'code' },
      {
        kicker: '03',
        title: 'Betrieb',
        text: 'Monitoring, Security, Performance.',
        icon: 'monitor',
      },
    ],
    body: 'KI beschleunigt bei uns einiges, aber schnell geschriebener Code ist noch keine gute Software. Sicherheit, Performance und Wartbarkeit gehören in die Architektur, nicht in eine Nacharbeitsphase. Was hinterher nachgerüstet wird, kostet regelmäßig mehr als der ursprüngliche Bau.',
  },
  {
    id: 'augenhoehe',
    number: '07',
    eyebrow: 'Zusammenarbeit',
    title: 'Auf Augenhöhe – als Partner, nicht als Lieferant',
    keyFacts: [
      { label: 'Enge Zusammenarbeit mit Kunden' },
      { label: 'Workshops & gemeinsame Konzeptionsphasen' },
      { label: 'Gemeinsames Wachstum statt Auftrag/Ausführung' },
    ],
    visual: 'duo' as const,
    duo: {
      a: { label: 'Kunde', sub: 'Domäne, Markt, Realität' },
      b: { label: 'RocketBase', sub: 'Prozess, Architektur, Delivery' },
    },
    body: 'Gute Lösungen entstehen im Gespräch, nicht im Ticketsystem. Deshalb arbeiten wir in kleinen Teams direkt mit euch: weniger Übergaben, schnellere Entscheidungen. Und jemand, der widerspricht, wenn eine Anforderung in die falsche Richtung läuft.',
  },
  {
    id: 'schnittstellen',
    number: '08',
    eyebrow: 'Anschlussfähigkeit',
    title: 'API-first gebaut',
    keyFacts: [
      { label: 'Dokumentierte Schnittstellen für jeden Kernprozess' },
      { label: 'Automatisierungen über n8n, Make oder eigene Skripte' },
      { label: 'KI-Modelle anbinden, ohne dass wir etwas freischalten' },
    ],
    visual: 'safety' as const,
    safety: [
      { label: 'Dokumentierte API', icon: 'book' },
      { label: 'Anbindung an eure Systeme', icon: 'globe' },
      { label: 'Automatisierung per n8n', icon: 'zap' },
      { label: 'Zugang für eigene Skripte', icon: 'terminal' },
    ],
    body: 'Jede Anwendung, die wir bauen, hat eine dokumentierte Schnittstelle. Damit hängt ihr sie an eure übrigen Systeme, baut Automatisierungen in n8n oder Make, oder lasst ein KI-Modell darauf arbeiten – ohne dass wir dafür etwas freischalten müssen. Was ihr damit anstellt, entscheidet ihr.',
  },
];

export const contactLinks = {
  email: 'marten@rocketbase.io',
  github: 'https://github.com/rocketbase-io',
  linkedin: 'https://www.linkedin.com/company/rocketbase-io/',
  instagram: 'https://www.instagram.com/rocketbase.io/',
  cal: 'https://cal.com/rocketbase-marten/erstgespraech',
  calDiscovery: 'https://cal.com/rocketbase-marten/discovery-vorabgesprach',
};
