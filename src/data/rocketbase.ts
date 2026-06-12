export const strengths = [
  {
    title: 'Direkte Zusammenarbeit mit Marten Prieß',
    description:
      'Ihr arbeitet nicht primär mit Vertrieb oder Projektweitergaben, sondern direkt mit dem Gründer von RocketBase, der fachliche, technische und strukturelle Entscheidungen mitträgt.',
  },
  {
    title: 'Konzernniveau für den Mittelstand',
    description:
      'Erfahrungen aus Projekten mit bonprix und Statista fließen in Lösungen ein, die ambitionierte mittelständische Unternehmen tatsächlich betreiben und weiterentwickeln können.',
  },
  {
    title: 'Team statt Einzelkämpfer',
    description:
      'RocketBase arbeitet als eingespieltes kleines Team mit klarer Kommunikation, schlanken Prozessen und hoher Verbindlichkeit.',
  },
  {
    title: 'Pragmatisch mit Open Source',
    description:
      'Nicht alles wird neu gebaut. Wir integrieren bewährte Bausteine und entwickeln nur dort individuell, wo euer Prozess echten Vorsprung braucht.',
  },
  {
    title: 'Zukunftssichere Übergabe',
    description:
      'Saubere Architektur, dokumentierbare Lösungen und bewährte Standards sorgen dafür, dass ihr nicht in unnötige Abhängigkeiten geratet.',
  },
];

export const serviceAreas = [
  {
    title: 'Discovery & Prozessanalyse',
    description:
      'Wir verstehen Ziele, Engpässe, Medienbrüche und bestehende Systeme, bevor wir über Umsetzung sprechen.',
    bullets: [
      'Aufnahme des Zielprozesses',
      'Priorisierung von Schwachstellen und Potenzialen',
      'Machbare Lösungsrichtungen statt PowerPoint-Strategie',
    ],
  },
  {
    title: 'Konzeption & UX',
    description:
      'Geschäftslogik, Nutzerführung und UI werden gemeinsam gedacht, damit Fachlichkeit und Bedienbarkeit zusammenpassen.',
    bullets: [
      'Informationsarchitektur und Prozessdesign',
      'Mockups für kritische Abläufe',
      'Schnitt zwischen Fachbereich und Technik',
    ],
  },
  {
    title: 'Individualsoftware & Integration',
    description:
      'Wir bauen Plattformen, Portale und interne Werkzeuge, die mit euren Prozessen wachsen und sich sauber in bestehende Systeme einfügen.',
    bullets: [
      'Webbasierte Individualsoftware',
      'Migration aus Standard- oder Altsystemen',
      'Schnittstellen zu ERP, PIM, CRM, BI und Drittsystemen',
    ],
  },
  {
    title: 'Betrieb & Weiterentwicklung',
    description:
      'Nach dem Go-live bleibt RocketBase technischer Ansprechpartner für Qualität, Betrieb und die nächsten sinnvollen Ausbaustufen.',
    bullets: [
      'Qualitätssicherung und Monitoring',
      'Iterative Weiterentwicklung',
      'Dokumentation und übergebbare Architektur',
    ],
  },
];

const casesRaw = [
  {
    slug: 'bonprix',
    client: 'bonprix',
    title: 'PLM/PIM-Neubau mit internationaler Teamintegration',
    description:
      'RocketBase wirkte an der Neuentwicklung einer komplexen Produktdaten-Plattform mit, übernahm technische Führung und verband Hamburger Delivery mit einem indischen Entwicklungsteam.',
    navTeaser: 'PLM/PIM-Plattform für den Konzernalltag.',
    kicker:
      'Komplexe Produktlogik, internationale Zusammenarbeit und technische Führung in einem zentralen Konzernprojekt.',
    highlights: [
      'Technische Führung und Teamaufbau über mehrere Jahre',
      'Integration eines verteilten, internationalen Setups',
      'Hohe fachliche und technische Komplexität im Produktdatenmodell',
    ],
    challenge:
      'Das Projekt verband anspruchsvolle Produktdatenlogik mit der Aufgabe, ein verteiltes Setup zwischen verschiedenen Teams und Kulturen produktiv zusammenzuführen.',
    approach:
      'RocketBase übernahm nicht nur Entwicklungsarbeit, sondern half dabei, Zusammenarbeit, Workshops und operative Abläufe so zu strukturieren, dass das Projekt in der Delivery tragfähig blieb.',
    impact:
      'Ein Konzernprojekt, in dem Teams über zwei Kontinente an einem komplexen Produktdatensystem arbeiteten – und am Ende reibungslos zusammenspielten. Relevant überall dort, wo verteilte Teams und gewachsene Datenmodelle aufeinandertreffen.',
    processFocus: 'Pflege und Abstimmung von Produktdaten über mehrere Teams und Standorte hinweg.',
    outcomes: [
      'Weniger Reibung zwischen beteiligten Teams und Zuständigkeiten',
      'Mehr Klarheit in Übergaben, Zusammenarbeit und Entscheidungswegen',
      'Bessere Grundlage, um Komplexität im Produktdatenprozess kontrolliert zu skalieren',
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
      'Gemeinsam mit Statista entstand eine moderne Plattform zur Pflege von Statistiken und Inhalten, inklusive Migration, Parallelbetrieb und neuer Redaktionsoberflächen.',
    navTeaser: 'Redaktionsplattform für Statistik-Inhalte.',
    kicker:
      'Modernisierung einer zentralen Plattform mit Fokus auf redaktionelle Prozesse, Datenpflege und schrittweise Ablösung gewachsener Strukturen.',
    highlights: [
      'Modernisierung einer kritischen Kernanwendung',
      'Spring-Boot-Backend und React-Oberflächen',
      'Frühe Einbindung von Fachanwendern für hohe Akzeptanz',
    ],
    challenge:
      'Bestehende Redaktions- und Pflegeprozesse waren durch gewachsene Strukturen geprägt. Die Aufgabe war, eine belastbare neue Plattform aufzubauen, ohne die reale Arbeit der Fachanwender aus dem Blick zu verlieren.',
    approach:
      'RocketBase verband Architektur, Produktdenken und enge Zusammenarbeit mit Anwendern, um eine moderne Pflegeumgebung mit besserem Prozesszuschnitt und klarerer technischer Basis zu schaffen.',
    impact:
      'Ein gewachsenes Kernsystem wurde abgelöst, ohne dass die Redaktion ihren Alltag verlor – weil die Fachanwender von Anfang an mit am Tisch saßen. Das Muster passt überall, wo ein zentrales Altsystem modernisiert werden soll, ohne den laufenden Betrieb auszubremsen.',
    processFocus:
      'Pflege, Strukturierung und Veröffentlichung von Statistik- und Content-Daten in redaktionellen Abläufen.',
    outcomes: [
      'Weniger Umwege und manuelle Reibung in der redaktionellen Pflege',
      'Mehr Zeit für inhaltlich wichtige Arbeit statt Systemkompromisse',
      'Eine modernere Grundlage für Weiterentwicklung und künftiges Wachstum',
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
      'RocketBase arbeitete sich in das Bestandssystem ein und nahm den realen Prozess auf – nicht die Systemlandschaft. Auf dieser Basis wurde die Datenmigration geplant, Bestandsdaten bereinigt und übernommen, und eine individuelle Anwendung gebaut, die das tatsächliche Beratungsmodell abbildet: vom Vertrieb als Kanban-Board über die automatische Angebotskalkulation und die integrierte Terminplanung bis zur Rechnung mit direktem Versand – Angebot und Durchführung sauber getrennt, damit Plan und Ergebnis auswertbar bleiben.',
    impact:
      'Ein Muster, das viele inhabergeführte Beratungen kennen: Die Standardsoftware, die entlasten sollte, bindet am Ende Personal, statt es freizusetzen. Weil Beratungszeit das Produkt ist, schlägt jede Stunde, die ins Auffangen statt in Kundenarbeit fließt, direkt auf die Marge. Relevant für jedes projektgetriebene Haus, dessen Software mehr verwaltet als trägt.',
    processFocus:
      'Der Kernprozess der Beratung: vom Angebot über die Projektdurchführung bis zur Rechnung. Im Standard waren Angebot und Durchführung so verwoben, dass sich Plan und Ergebnis kaum noch gegenüberstellen ließen.',
    outcomes: [
      'Der reale Angebots- und Projektprozess steht im System – nicht im Kopf einzelner Schlüsselpersonen',
      'Weniger Handarbeit im Tagesgeschäft, weil Vertrieb, Kalkulation und Rechnung ineinandergreifen',
      'Kalkulation und Deckungsbeitrag direkt am Prozess statt nachgelagert zusammengesucht',
      'Belastbare Basis, um das Geschäft ohne Systemgrenzen weiterzuentwickeln',
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
        benefit: 'Mitarbeiter und Aufwände fließen automatisch in die Kalkulation, samt Deckungsbeitrag.',
      },
      {
        title: 'Angebote, die etwas hermachen',
        benefit: 'Eine ansprechende Präsentation, die beim Kunden den Unterschied macht – aus demselben System.',
      },
      {
        title: 'Termine direkt im Projekt',
        benefit: 'Planung und Durchführung an einer Stelle, statt in getrennten Tools nebenher.',
      },
      {
        title: 'Rechnung raus per Klick',
        benefit: 'Versand direkt aus dem System – ohne Umweg über ein einzeln geöffnetes Mailfenster.',
      },
      {
        title: 'Plan gegen Ergebnis auswertbar',
        benefit: 'Angebot und Durchführung sauber getrennt – Kalkulation und Realität endlich vergleichbar.',
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
        benefit: 'Auslastung und freie Kapazitäten auf einen Blick – statt Ausdrucke und Behelfslösungen für den Blick nach vorn.',
      },
      {
        title: 'Abwesenheiten automatisch berücksichtigt',
        benefit: 'Urlaub, Krankheit und Berufsschule fließen direkt in die Planung – wer nicht da ist, taucht gar nicht erst als verplanbar auf.',
      },
      {
        title: 'Aufträge flexibel aufteilen',
        benefit: 'Ein Auftrag lässt sich auf mehrere Mitarbeiter und über mehrere Tage splitten und gezielt steuern.',
      },
      {
        title: 'Wareneingang sauber protokolliert',
        benefit: 'Teilelieferungen werden direkt im Tool erfasst – jederzeit nachvollziehbar, was wann angekommen ist.',
      },
      {
        title: 'Jeder sieht, was er braucht',
        benefit: 'Werkstatt, Planung und Leitung bekommen je ein eigenes, auf ihre Rolle zugeschnittenes Dashboard – keine Suche nach den relevanten Infos.',
      },
      {
        title: 'Anmeldung per Personalkarte',
        benefit: 'Login am Werkstatt-Terminal mit der Karte, die jeder ohnehin dabei hat – schnell genug für den Alltag.',
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
  (a, b) => caseOrder.indexOf(a.slug) - caseOrder.indexOf(b.slug),
);

export const additionalCases = [
  {
    slug: 'statista-canva',
    client: 'Statista',
    title: 'Statista-Daten direkt in Canva nutzbar',
    description:
      'RocketBase entwickelte die Statista-App für das Canva-Ökosystem, über die Nutzerinnen und Nutzer geprüfte Statistiken direkt in ihre Designs und Präsentationen einbinden können – samt neu entwickeltem Image-Service für Preview-Grafiken.',
    kicker:
      'Statistische Inhalte erreichen Nutzer dort, wo sie ohnehin gestalten – eingebettet statt nachgelagert.',
    highlights: [
      'Pilot-App in der Alpha-Phase einer neuen Canva-Schnittstelle',
      'Eigenständiger Image-Service für On-the-fly-Previews',
      'AWS-Deployment über CDK und GitHub-Pipelines',
    ],
    challenge:
      'Statista suchte einen Weg, Inhalte außerhalb der eigenen Plattform dort verfügbar zu machen, wo Anwender sie direkt weiterverarbeiten. Die neue Canva-Datenintegration war noch in der Alpha, inklusive offener technischer Fragen zu Preview-Bildern und Authentifizierung.',
    approach:
      'RocketBase begleitete Konzeption, Organisation und Umsetzung: Integration in das Canva SDK, Abstimmung mit dem Canva-Team und Aufbau eines eigenen Image-Services inklusive Betriebsinfrastruktur auf AWS.',
    impact:
      'Statista erschloss sich einen neuen Kanal: geprüfte Inhalte landen direkt dort, wo Nutzer ohnehin gestalten. Relevant für alle, die ihre Daten oder Inhalte in fremde Plattformen bringen wollen, statt darauf zu warten, dass Kunden zu ihnen kommen.',
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
    kicker:
      'Planung, die nicht mehr an einzelnen Tabellen hängt – und Zahlen, die sich mit der Buchhaltung decken.',
    highlights: [
      'Ablösung gewachsener Excel-Modelle durch eine zentrale Plattform',
      'Automatisierter nächtlicher Abgleich mit dem Buchhaltungssystem',
      'Deutliche Entlastung im Monatsabschluss',
    ],
    challenge:
      'Die Budgetplanung lief auf komplexen, gewachsenen Excel-Modellen. Das System skalierte nicht mehr, parallele Arbeit war fehleranfällig und eine saubere Verbindung zur Buchhaltung fehlte.',
    approach:
      'RocketBase transformierte die bestehenden Modelle in eine datenbankgestützte Plattform, ergänzte Validierungs- und Prüfmechanismen und etablierte einen nächtlichen Abgleichslauf zwischen Planung und Buchhaltungssystem.',
    impact:
      'Aus fehleranfälligen Excel-Modellen wurde eine Planung, auf deren Zahlen sich Stage verlassen kann – ohne dass die Fachleute ihr gewohntes Arbeiten verloren. Das Muster passt überall, wo gewachsene Tabellen an ihre Grenzen stoßen.',
    processFocus:
      'Finanzplanung, Reporting und Abgleich mit dem Buchhaltungssystem.',
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
    kicker:
      'Ein eingebettetes Produkt, das zuverlässig in fremden Umgebungen läuft – und dort Conversions generiert.',
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
    processFocus:
      'Leadverwertung über eingebettete Gutscheinflächen in Partner-Websites.',
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
    processFocus:
      'Einsatzplanung, Tourenführung und Leistungserfassung im mobilen Außendienst.',
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
    processFocus:
      'VK- und Sortimentsmengenplanung im Controlling bei bonprix.',
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
      'Wir analysieren Prozess, Rollen, Systeme und Engpässe, bevor Aufwand in falsche Richtungen läuft.',
  },
  {
    title: 'Priorisieren',
    description:
      'Wir schärfen, wo Individualsoftware sinnvoll ist und wo vorhandene Bausteine oder Open Source schneller zum Ziel führen.',
  },
  {
    title: 'Umsetzen',
    description:
      'Konzeption, Architektur und Delivery bleiben eng verzahnt. Das reduziert Reibung und hält Entscheidungen nachvollziehbar.',
  },
  {
    title: 'Weiterentwickeln',
    description:
      'Nach dem Start optimieren wir gemeinsam weiter, statt eine Lösung nach dem Go-live sich selbst zu überlassen.',
  },
];

export const discoveryOffer = {
  title: 'Discovery-Workshop',
  subtitle: 'Ein kompakter Beratungstermin mit greifbarem Ergebnis – statt unverbindlicher Sales-Folien.',
  description:
    'Gemeinsam mit euren Keyusern nehmen wir die dringendsten Baustellen auf, identifizieren Quickwins und entwerfen ein Zielbild für die erste Ausbaustufe – inklusive Mockups, mit denen ihr intern sofort weiterarbeiten könnt.',
  deliverables: [
    'Bestandsaufnahme der dringendsten Baustellen und Engpässe',
    'Identifizierte Quickwins, die kurzfristig Wirkung entfalten',
    'Zielbild für die erste Entwicklungs-Ausbaustufe',
    'Konkrete Mockups oder Prozessskizzen für die Kernabläufe',
  ],
};

export const teamPrinciples = [
  'Remote arbeitendes Team mit Kolleginnen und Kollegen in Nord- und Süddeutschland',
  'Regelmäßiger Austausch plus Offsites für konzentrierte Zusammenarbeit',
  'Schlanke Kommunikation statt künstlichem Agentur-Overhead',
  'Optimierte interne Prozesse und KI-gestützte Arbeitsweise für mehr Wirksamkeit',
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
  lead: '<strong>Acht Haltungen</strong>, wie und warum wir bei RocketBase arbeiten. Kein Leitbild fürs Schönwetter - das hier sind die <strong>Prinzipien</strong>, an denen wir uns in jedem Projekt tatsächlich messen lassen.',
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
    body:
      'Wir bringen Erfahrung aus komplexen Softwareprojekten mit – von Konzernstrukturen bis hin zu individuell gewachsenen Mittelstandsprozessen. Diese Erfahrung nutzen wir nicht, um Standardlösungen zu verkaufen, sondern um fundierte Entscheidungen zu treffen. Verantwortung bedeutet für uns: Architektur, Technologie und Umsetzung so zu wählen, dass sie auch in zwei, fünf oder zehn Jahren noch tragen.',
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
      { kicker: 'Heute', title: 'Ist-Prozess', text: 'Gewachsen, dokumentiert oder in Köpfen verteilt.' },
      { kicker: 'Reibung', title: 'Engpässe sichtbar machen', text: 'Wo Übergaben, Medienbrüche und Workarounds Tempo kosten.' },
      { kicker: 'Morgen', title: 'Zielbild', text: 'Ein Prozess, der das Geschäft trägt – nicht umgekehrt.' },
    ],
    body:
      'Unsere Stärke liegt nicht nur in der Entwicklung. Wir verstehen, wie Unternehmen arbeiten – und wo es hakt. Gemeinsam analysieren wir Prozesse, identifizieren Engpässe und denken Lösungen weiter. Erst wenn klar ist, welches Problem wirklich gelöst werden muss, beginnt die technische Umsetzung.',
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
    body:
      'Bei uns sprecht ihr nicht zuerst mit Vertrieb – und später mit jemand anderem, der es umsetzt. Beratung, Konzeption und Umsetzung liegen eng zusammen. Das reduziert Reibung, verhindert Missverständnisse und sorgt dafür, dass das, was geplant wird, auch genau so gebaut wird.',
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
    body:
      'Wir entwickeln Software nicht isoliert, sondern als Teil eures Unternehmens. Ziel ist es, Prozesse so abzubilden und zu optimieren, dass euer Unternehmen wachsen kann – ohne dass Komplexität explodiert. Gute Systeme sorgen dafür, dass neue Kollegen schneller produktiv werden und Wissen nicht verloren geht.',
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
      { title: 'Bewährter Baustein', subtitle: 'Open Source · ERP · CRM · BI', tone: 'muted' as const, icon: 'database' },
      { title: 'Bewährter Baustein', subtitle: 'Auth · Storage · Search', tone: 'muted' as const, icon: 'shield' },
      { title: 'Individuelle Logik', subtitle: 'Genau dort, wo Vorsprung entsteht', tone: 'brand' as const, icon: 'sparkles' },
      { title: 'Bewährter Baustein', subtitle: 'Monitoring · Logging · CI', tone: 'muted' as const, icon: 'monitor' },
      { title: 'Individuelle Logik', subtitle: 'Eure Geschäftsregeln, euer Vorteil', tone: 'brand' as const, icon: 'zap' },
      { title: 'Bewährter Baustein', subtitle: 'PIM · DAM · Mailing', tone: 'muted' as const, icon: 'box' },
    ],
    body:
      'Wir glauben nicht daran, alles neu zu erfinden. Stattdessen kombinieren wir bewährte Lösungen mit individueller Entwicklung. Open Source ist für uns kein Trend, sondern ein Werkzeug – genauso wie proprietäre Systeme. Entscheidend ist, was für euer Problem die beste Lösung ist.',
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
      { kicker: '03', title: 'Betrieb', text: 'Monitoring, Security, Performance.', icon: 'monitor' },
    ],
    body:
      'Wir nutzen moderne Werkzeuge, inklusive KI, um effizienter zu arbeiten. Gleichzeitig glauben wir fest daran, dass gute Software mehr ist als schnell geschriebener Code. Themen wie Sicherheit, Performance, Wartbarkeit und Datenanalyse sind keine Nachgedanken, sondern Teil der Architektur von Anfang an.',
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
    body:
      'Wir verstehen uns nicht als externer Dienstleister, sondern als Partner. Gute Lösungen entstehen im Dialog – deshalb arbeiten wir bewusst in kleinen, fokussierten Teams direkt mit unseren Kunden zusammen. Weniger Übergaben, schnellere Entscheidungen, eine gemeinsame Verantwortung für das Ergebnis.',
  },
  {
    id: 'zukunft',
    number: '08',
    eyebrow: 'Verantwortung',
    title: 'Zukunftssicherheit mitgedacht',
    keyFacts: [
      { label: 'Saubere Dokumentation und nachvollziehbare Architektur' },
      { label: 'Unabhängigkeit von einzelnen Personen oder Systemen' },
      { label: 'Optionale Exit- und Fallback-Strategien' },
    ],
    visual: 'safety' as const,
    safety: [
      { label: 'Architektur-Dokumentation', icon: 'file-text' },
      { label: 'Übergebbarer Code', icon: 'code' },
      { label: 'Offene Standards & Daten', icon: 'globe' },
      { label: 'Fallback-Pfade', icon: 'shield' },
    ],
    body:
      'Software ist eine langfristige Investition. Deshalb achten wir darauf, dass Lösungen nachvollziehbar, wartbar und übergebbar bleiben. Unser Ziel ist es, dass ihr jederzeit die Kontrolle behaltet – unabhängig von einzelnen Technologien oder Partnern.',
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
