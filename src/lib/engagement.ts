/**
 * Verhalten auf einer Landingpage beobachten und als Ereignisse melden.
 *
 * Gilt für den Brief-Kanal (/b/) und die drei Türen (/f/angebote, /f/einsatz,
 * /f/zahlen), wenn sie per persönlicher Mail mit `?r=`-Kennung verlinkt sind.
 *
 * Warum das nötig ist: Ein `page_view` sagt nur, dass die Seite geladen wurde.
 * Nach einer Absage ist die eigentliche Frage, ob der Inhalt nicht überzeugt
 * hat oder gar nicht angesehen wurde — und die beantwortet erst, ob das Video
 * lief, welche Abschnitte im Bild waren und ob jemand den Rechner, die Tabs
 * oder das Quiz angefasst hat.
 *
 * Die Seiten müssen dafür nichts wissen: Beobachtet werden alle `<video>`,
 * alle `<section id>` und alle Klicks auf Buttons, Tabs, Links und
 * Formularelemente. Wer ein Element gezielt benennen will, setzt `data-track`
 * mit einem Namen; sonst wird aus Sektion und Beschriftung ein Name gebaut.
 *
 * Alles hier ist passiv und ohne Rückwirkung auf die Seite. Jeder Hook sitzt
 * in einem eigenen try/catch, damit ein fehlendes Element oder ein alter
 * Browser (kein IntersectionObserver) nicht die restlichen Beobachter
 * mitreißt.
 */

import { meldeEreignis } from '@/lib/funnelTracking';

export function verfolgeEngagement(funnel: string): void {
  if (typeof window === 'undefined') return;

  // --- Videos ------------------------------------------------------------
  // Marken bei 25/50/75 % statt reiner Sekunden: Die Videos sind
  // unterschiedlich lang, "zur Hälfte gesehen" bleibt vergleichbar. Mehrere
  // Videos auf einer Seite werden über ihre Quelle auseinandergehalten.
  try {
    document.querySelectorAll<HTMLVideoElement>('video').forEach((v) => {
      const name = videoName(v);
      const opt = { schluessel: name };
      const marken: Array<[number, 'video_25' | 'video_50' | 'video_75']> = [
        [0.25, 'video_25'],
        [0.5, 'video_50'],
        [0.75, 'video_75'],
      ];
      let maxSekunden = 0;

      v.addEventListener('play', () => {
        meldeEreignis(
          funnel,
          'video_start',
          { video: name, dauer: Math.round(v.duration || 0) },
          opt
        );
      });
      v.addEventListener('timeupdate', () => {
        if (!v.duration) return;
        maxSekunden = Math.max(maxSekunden, v.currentTime);
        const anteil = v.currentTime / v.duration;
        for (const [grenze, ereignis] of marken) {
          if (anteil >= grenze) {
            meldeEreignis(
              funnel,
              ereignis,
              { video: name, sekunden: Math.round(v.currentTime) },
              opt
            );
          }
        }
      });
      v.addEventListener('ended', () => {
        meldeEreignis(
          funnel,
          'video_ende',
          { video: name, sekunden: Math.round(v.duration || maxSekunden) },
          opt
        );
      });
    });
  } catch {
    /* still */
  }

  // --- Sichtbarkeit von Abschnitten -------------------------------------
  // Jede Sektion mit `id` zählt, sobald 40 % davon im Bild sind. "Termin-
  // Bereich war im Bild" trennt "hat nur den Hero gesehen" von "hat bis unten
  // gescrollt und trotzdem nicht geklickt" — zwei verschiedene Gründe für ein
  // Nein. `video` und `termin` bekommen zusätzlich ihr altes, eigenes Ereignis,
  // damit die Brief-Auswertung weiterläuft.
  try {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (eintraege) => {
          for (const e of eintraege) {
            if (!e.isIntersecting) continue;
            const id = (e.target as HTMLElement).id;
            meldeEreignis(funnel, 'sektion_sichtbar', { sektion: id }, { schluessel: id });
            if (id === 'video') meldeEreignis(funnel, 'video_sichtbar', {}, { plausible: false });
            if (id === 'termin') meldeEreignis(funnel, 'termin_sichtbar', {}, { plausible: false });
            io.unobserve(e.target);
          }
        },
        { threshold: 0.4 }
      );
      document.querySelectorAll('section[id]').forEach((el) => io.observe(el));
    }
  } catch {
    /* still */
  }

  // --- Klicks -------------------------------------------------------------
  // Delegiert auf document, damit auch Elemente zählen, die React später
  // nachrendert. Telefon und "Weiter" behalten ihre eigenen Ereignisse; alles
  // andere Bedienbare (Tabs, Regler, Rechner, Akkordeons) wird als
  // `interaktion` mit Sektion und Beschriftung gemeldet — einmal pro Element,
  // nicht pro Klick. `tel:` ist auf dem Handy oft der eigentliche
  // Konversionsweg.
  try {
    document.addEventListener(
      'click',
      (ev) => {
        const ziel = ev.target as Element | null;
        const el = ziel?.closest?.<HTMLElement>(
          'a, button, [role="tab"], [role="button"], summary, input[type="range"], select, [data-track]'
        );
        if (!el) return;

        const href = el.getAttribute('href') ?? '';
        if (href.startsWith('tel:')) {
          meldeEreignis(funnel, 'telefon_klick');
          return;
        }
        if (el.hasAttribute('data-brief-weiter')) {
          meldeEreignis(funnel, 'weiter_klick', { ziel: href });
          return;
        }
        // Rechtliches und Footer sind kein Interesse am Produkt. Das Quiz
        // meldet seine Schritte selbst (FunnelQuiz.tsx), sonst zählt jede
        // Antwort doppelt.
        if (el.closest('footer, [data-quiz]') || /impressum|datenschutz/.test(href)) return;

        const sektion = el.closest('section[id]')?.id ?? '';
        const name = el.dataset.track ?? beschriftung(el);
        if (!name) return;
        meldeEreignis(
          funnel,
          'interaktion',
          { sektion, element: name },
          { schluessel: `${sektion}/${name}` }
        );
      },
      { capture: true }
    );
  } catch {
    /* still */
  }

  // --- Verweildauer und Scrolltiefe ---------------------------------------
  // Gezählt wird nur sichtbare Zeit: Ein Tab, der im Hintergrund offen bleibt,
  // ist kein Interesse. Gemeldet beim Verlassen bzw. beim ersten Verstecken;
  // ein zweiter Bericht mit höherem Wert ist erlaubt, das Backend nimmt das
  // Maximum. sendBeacon in `meldeEreignis` sorgt dafür, dass der Bericht das
  // Schließen des Tabs überlebt.
  try {
    let sichtbarSeit = document.visibilityState === 'visible' ? Date.now() : 0;
    let summe = 0;
    let maxScroll = 0;

    const scrollTiefe = () => {
      const h = document.documentElement;
      const gesamt = h.scrollHeight - window.innerHeight;
      if (gesamt <= 0) return 100;
      return Math.min(100, Math.round(((window.scrollY || h.scrollTop) / gesamt) * 100));
    };
    window.addEventListener('scroll', () => (maxScroll = Math.max(maxScroll, scrollTiefe())), {
      passive: true,
    });

    const berichte = () => {
      if (sichtbarSeit) {
        summe += Date.now() - sichtbarSeit;
        sichtbarSeit = 0;
      }
      const sekunden = Math.round(summe / 1000);
      // Unter zwei Sekunden ist es ein Scanner oder ein Fehlklick — nicht wert,
      // eine Zeile im CRM zu belegen.
      if (sekunden < 2) return;
      meldeEreignis(funnel, 'verweildauer', {
        sekunden,
        scroll: Math.max(maxScroll, scrollTiefe()),
      });
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') berichte();
      else sichtbarSeit = Date.now();
    });
    window.addEventListener('pagehide', berichte);
  } catch {
    /* still */
  }
}

/** Dateiname der Videoquelle ohne Endung, sonst Position auf der Seite. */
function videoName(v: HTMLVideoElement): string {
  const src = v.currentSrc || v.querySelector('source')?.getAttribute('src') || '';
  const datei = src
    .split('/')
    .pop()
    ?.replace(/\.[a-z0-9]+$/i, '');
  if (datei) return datei;
  const alle = Array.from(document.querySelectorAll('video'));
  return `video-${alle.indexOf(v) + 1}`;
}

/** Sichtbare Beschriftung eines Elements, gekürzt — für den Ereignisnamen. */
function beschriftung(el: HTMLElement): string {
  const text =
    el.getAttribute('aria-label') ||
    el.getAttribute('title') ||
    (el as HTMLInputElement).name ||
    el.textContent ||
    '';
  return text.replace(/\s+/g, ' ').trim().slice(0, 40);
}
