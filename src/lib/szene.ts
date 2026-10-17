/**
 * Szenen, die beim Scrollen anlaufen.
 *
 * Ein Element mit `data-szene` bekommt `data-szene="an"`, sobald seine Oberkante das
 * untere Drittel des Bildschirms erreicht hat. CSS hängt die Animationen daran, JS kann
 * auf das Ereignis `szene:an` hören (z. B. für hochzählende Zahlen). Einmalig: Was einmal
 * gelaufen ist, bleibt stehen, damit beim Zurückscrollen nichts flackert.
 *
 * Ohne JS oder bei `prefers-reduced-motion` steht alles sofort im Endzustand: Die
 * Komponenten verstecken ihre Teile nur unter `html.szenen-ready [data-szene]:not([data-szene='an'])`.
 */
export function szenenStarten(root: ParentNode = document): void {
  const els = [...root.querySelectorAll<HTMLElement>('[data-szene]')].filter(
    (el) => el.dataset.szene !== 'an'
  );
  if (!els.length) return;
  const html = document.documentElement;
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    els.forEach((el) => an(el));
    return;
  }
  html.classList.add('szenen-ready');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        an(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    },
    // Anlaufen, sobald die Oberkante gut sichtbar über dem unteren Rand steht (12 %).
    // Vorher -30 %: flache Blöcke wie das Vertrauensband liefen erst in der Bildschirmmitte an.
    { rootMargin: '0px 0px -12% 0px', threshold: 0 }
  );
  els.forEach((el) => io.observe(el));
}

function an(el: HTMLElement) {
  if (el.dataset.szene === 'an') return;
  el.dataset.szene = 'an';
  el.dispatchEvent(new CustomEvent('szene:an', { bubbles: false }));
}

/** Zahl von 0 auf den Zielwert hochzählen, Format wie im Text (de-DE, Einheit bleibt). */
export function hochzaehlen(el: HTMLElement, dauer = 900): void {
  const text = el.textContent ?? '';
  const m = text.match(/-?[\d.]+(,\d+)?/);
  if (!m) return;
  const roh = m[0];
  const dezimal = roh.includes(',') ? roh.split(',')[1]!.length : 0;
  const ziel = Number(roh.replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(ziel)) return;
  const vor = text.slice(0, m.index);
  const nach = text.slice((m.index ?? 0) + roh.length);
  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: dezimal, maximumFractionDigits: dezimal });
  const start = performance.now();
  const tick = (t: number) => {
    const p = Math.min(1, (t - start) / dauer);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = vor + fmt(ziel * eased) + nach;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  };
  requestAnimationFrame(tick);
}
