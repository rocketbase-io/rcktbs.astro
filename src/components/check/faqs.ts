import { softwareCheck } from '@/data/funnelSchlank';

/** FAQs der indexierten Seite, auch fürs FAQ-Schema und /llms-full.txt. Der Funnel bleibt bei den kurzen Fragen. */
export const softwareCheckFaqs = [
  {
    q: 'Wie prüft ihr Software, die mit KI gebaut wurde?',
    a: 'Erfahrene Entwickler prüfen den Code gegen OWASP ASVS 5.0. Jeder Bericht nennt den Standard und das geprüfte Level, jeder Fund bekommt eine Einstufung und einen Vorschlag, den eure KI umsetzen kann.',
  },
  {
    q: 'Wie lange dauert ein Software-Check?',
    a: 'Ab zwei Tagen, je nach Größe. Ein Architektur-Review ist nach wenigen Tagen fertig.',
  },
  {
    q: 'Betrifft uns der Cyber Resilience Act?',
    a: 'Das kann sein, wenn ihr Software an andere abgebt. Der CRA-Fahrplan klärt, ob er euch trifft, und legt einen Plan bis Dezember 2027 fest.',
  },
  ...softwareCheck.fragenUndAntworten,
];
