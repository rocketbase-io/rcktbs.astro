export const de = {
  site: {
    name: 'RocketBase',
    description:
      'Digitalpartner für individuelle Software, Prozessoptimierung und nachhaltige Plattformen mit direkter Begleitung durch Marten Prieß.',
  },

  nav: {
    home: 'Start',
    about: 'Über RocketBase',
    blog: 'Blog',
    contact: 'Kontakt',
    features: 'Leistungen',
    components: 'Komponenten',
    docs: 'Dokumentation',
    getStarted: 'Kontakt',
    services: 'Leistungen',
    work: 'Wie wir arbeiten',
    mission: 'Mission',
    references: 'Referenzen',
  },

  common: {
    readMore: 'Mehr erfahren',
    loading: 'Lädt...',
    error: 'Ein Fehler ist aufgetreten',
    notFound: 'Seite nicht gefunden',
    backHome: 'Zur Startseite',
    copied: 'Kopiert',
    copy: 'Kopieren',
  },

  footer: {
    copyright: '© {year} RocketBase. Alle Rechte vorbehalten.',
    madeWith: 'Made with',
    maintainedBy: 'Betreut von',
    links: {
      documentation: 'Blog',
      github: 'GitHub',
      twitter: 'LinkedIn',
      license: 'Kontakt',
    },
  },

  about: {
    title: 'Über RocketBase',
    description:
      'RocketBase verbindet Konzern-Erfahrung, Prozessverständnis und pragmatische Softwareentwicklung für ambitionierte mittelständische Unternehmen.',
  },

  services: {
    title: 'Leistungen',
    description:
      'Von Discovery und Konzeption bis zu individueller Software, Integration und Betrieb.',
  },

  contact: {
    meta: {
      title: 'Kontakt: Erstgespräch zu Individualsoftware',
      description:
        'Kostenloses 30-Minuten-Erstgespräch zu Individualsoftware, Standardsoftware-Ablösung und Prozessdigitalisierung – ohne Vertriebskette, direkt mit Marten Prieß. Raum Hamburg und bundesweit remote.',
    },
    hero: {
      badge: 'Direkter Kontakt',
      title: 'Lassen Sie uns',
      titleHighlight: 'über Ihr Vorhaben sprechen.',
      description:
        'Kein klassischer Vertrieb, kein Agentur-Pingpong. Sie sprechen direkt mit Marten Prieß über Ziele, Prozesse und die sinnvollste nächste Ausbaustufe.',
    },
    form: {
      title: 'Projekt anfragen',
      name: 'Name',
      namePlaceholder: 'Ihr Name',
      email: 'E-Mail',
      emailPlaceholder: 'name@unternehmen.de',
      subject: 'Thema',
      subjectPlaceholder: 'Worum geht es?',
      message: 'Nachricht',
      messagePlaceholder:
        'Beschreiben Sie Ihr Vorhaben, bestehende Systeme oder Engpässe im Prozess...',
      submit: 'Nachricht senden',
      sending: 'Wird gesendet...',
      success: 'Nachricht erfolgreich gesendet. Wir melden uns zeitnah zurück.',
      error: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    },
    info: {
      title: 'Direkte Wege zu RocketBase',
      email: {
        label: 'E-Mail',
        value: 'marten@rocketbase.io',
      },
      github: {
        label: 'GitHub',
        value: 'rocketbase-io',
      },
      twitter: {
        label: 'LinkedIn',
        value: 'rocketbase-io',
      },
    },
  },

  blog: {
    title: 'Individualsoftware & Prozesse: Praxisberichte',
    description:
      'Standardsoftware am Limit, Tool-Wildwuchs, Reporting aus Excel, Legacy-Hosting: Praxisbeiträge aus echten Ablöse- und Digitalisierungsprojekten im Mittelstand.',
    descriptionHtml:
      'Einblicke aus echten Projekten: <strong>Standardsoftware-Ablösung</strong>, <strong>Prozessoptimierung</strong>, Reporting und der Weg vom Tool-Wildwuchs zur belastbaren Steuerung.',
    allPosts: 'Alle Beiträge',
    featured: 'Empfohlen',
    noPosts: 'Noch keine Beiträge vorhanden.',
    relatedPosts: 'Weitere Beiträge',
    backToBlog: 'Zurück zum Blog',
    subscribe: 'Updates erhalten',
    subscribeDescription:
      'Neue Beiträge zu Produktstrategie, Plattformen und Delivery direkt ins Postfach.',
    emailPlaceholder: 'E-Mail-Adresse eingeben',
    subscribeButton: 'Abonnieren',
  },

  consent: {
    heading: 'Cookie-Einstellungen',
    description:
      'Wir verwenden Cookies, um die Website zuverlässig zu betreiben, Inhalte zu verbessern und Nutzung zu analysieren.',
    acceptAll: 'Alle akzeptieren',
    declineAll: 'Alle ablehnen',
    customize: 'Anpassen',
    savePreferences: 'Einstellungen speichern',
    settingsHeading: 'Datenschutzeinstellungen',
    privacyPolicyLabel: 'Datenschutz',
    alwaysOn: 'Immer aktiv',
  },
} as const;

export type TranslationKeys = typeof de;
