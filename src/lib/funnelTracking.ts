/**
 * Stiller Versuch, einen Seitenaufruf dem versendeten Brief zuzuordnen.
 *
 * Der QR-Code auf dem Anschreiben trägt `?r=<kennung>`. Liegt die Kennung vor,
 * meldet diese Datei einmal je Seitenaufruf an das Sales-Backend, dass die
 * Landingpage geöffnet wurde. Aufgelöst wird die Kennung hier nicht — welche
 * Firma dahintersteht, weiß ausschließlich das Backend (siehe `briefRef.ts`).
 *
 * **Der Aufruf ist still, und zwar konsequent.** Kein Ergebnis, kein Fehler,
 * kein Zustand, keine Rückwirkung auf die Seite: Ein nicht erreichbares
 * Backend, ein Ad-Blocker oder eine fehlende Konfiguration bleiben für den
 * Besucher unsichtbar. Das Tracking ist eine Zugabe, die Landingpage
 * funktioniert ohne sie vollständig.
 *
 * **Kein Consent-Gate.** Der Aufruf setzt nichts auf dem Endgerät — kein
 * Cookie, kein localStorage — und fällt damit nicht unter §25 TTDSG.
 * Übertragen wird, was der Browser bei jedem Request ohnehin preisgibt, plus
 * eine grobe Geräteklasse. Ein roher User-Agent wäre zusammen mit Viewport und
 * Zeitzone ein brauchbarer Fingerabdruck und wird deshalb bewusst nicht
 * gesendet; für die einzige Frage, die daran hängt — am Handy gescannt oder am
 * Rechner abgetippt — reicht `mobile | tablet | desktop`.
 */

import { leseBriefRef } from '@/lib/briefRef';
import { sammleAttribution } from '@/lib/leadTracking';

/**
 * Basis-URL des Sales-Backends, z. B. `https://api.example.com`. Ohne diese
 * Variable passiert nichts: Ein Default würde beim ersten Deploy ins Leere
 * oder — schlimmer — an die falsche Umgebung melden.
 */
const API_BASE = import.meta.env.PUBLIC_SALES_API_URL as string | undefined;

const ENDPOINT = '/api/public/funnel-events';

/**
 * Pro Seitenaufruf nur eine Meldung. Astro rendert statisch, aber ein
 * View-Transition-Wechsel oder ein doppelt eingebundenes Skript würde die
 * Funktion sonst mehrfach auslösen und dieselbe Öffnung mehrfach zählen.
 */
let gemeldet = false;

/** Grobe Geräteklasse statt User-Agent — siehe Modul-Kommentar. */
function geraeteKlasse(): string {
  if (!window.matchMedia('(pointer: coarse)').matches) return 'desktop';
  return Math.min(window.innerWidth, window.innerHeight) >= 600 ? 'tablet' : 'mobile';
}

/**
 * Meldet einen Seitenaufruf, sofern eine Brief-Kennung vorliegt.
 *
 * @param funnel Name der Strecke, unter der die Öffnung im CRM erscheint.
 */
export function meldeSeitenaufruf(funnel: string): void {
  if (typeof window === 'undefined' || gemeldet) return;

  const ref = leseBriefRef();
  // Ohne Kennung gibt es nichts zuzuordnen. Die reine Reichweite der Seite
  // zählt Plausible bereits; eine Meldung ohne Firma wäre nur Rauschen.
  if (!ref || !API_BASE) return;
  gemeldet = true;

  const attribution = sammleAttribution();
  const body = JSON.stringify({
    companyId: ref,
    event: 'page_view',
    funnel,
    payload: {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || null,
      utm: attribution,
      device: geraeteKlasse(),
      viewport: { w: window.innerWidth, h: window.innerHeight },
      scheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      lang: navigator.language,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const url = `${API_BASE.replace(/\/+$/, '')}${ENDPOINT}`;

  try {
    // sendBeacon zuerst: Der Aufruf überlebt, wenn jemand sofort weiterklickt
    // oder den Tab schliesst — auf dem Handy nach einem QR-Scan der Normalfall.
    // Er schickt `text/plain` und löst damit keinen Preflight aus; der Endpunkt
    // nimmt beide Content-Types an.
    if (navigator.sendBeacon?.(url, new Blob([body], { type: 'text/plain' }))) return;

    // Fallback, wenn sendBeacon fehlt oder die Warteschlange voll ist.
    // `keepalive` hält den Request auch über das Entladen der Seite hinweg am
    // Leben; `catch` verschluckt jeden Fehler, inklusive Offline und CORS.
    void fetch(url, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'text/plain' },
      credentials: 'omit',
      keepalive: true,
      mode: 'cors',
    }).catch(() => {});
  } catch {
    // Auch der synchrone Pfad darf nichts nach aussen tragen: sendBeacon wirft
    // in manchen Browsern bei blockierten Requests, und ein unbehandelter
    // Fehler im Seitenskript kann nachfolgende Skripte mitreissen.
  }
}
