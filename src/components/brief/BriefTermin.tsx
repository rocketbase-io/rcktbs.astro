import { useEffect, useState } from 'react';
import Cal from '@calcom/embed-react';
import { CalendarClock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/form/Button/button.variants';
import { beiConsentAenderung, hatConsent } from '@/lib/consent';
import { leseBriefRef } from '@/lib/briefRef';

/**
 * Terminbuchung — der Primärweg auf der Brief-Landingpage.
 *
 * Warum die Buchung vorn steht und nicht das Kontaktformular: Der Brief-Leser
 * ist vorqualifiziert (hat gelesen, den Brief behalten, gescannt). Beim
 * Formular folgen danach noch zwei Schritte mit je eigenem Abbruchrisiko —
 * jemand muss sich melden, dann muss ein Termin gefunden werden. Bei der
 * Buchung steht der Slot.
 *
 * Der Embed lädt ein Drittanbieter-Script von cal.com und braucht deshalb eine
 * Einwilligung. Eingestuft als `preferences` (funktional), nicht als
 * `marketing`: Die Terminbuchung ist die Funktion, die der Besucher hier sucht
 * — sie verfolgt ihn nicht und dient keiner Werbeauswertung.
 *
 * Ohne Einwilligung erscheint ein Button-Link, der dasselbe Ziel erreicht, nur
 * mit Absprung. So verliert niemand den Weg zum Termin, egal wie er sich beim
 * Consent entschieden hat.
 */

interface BriefTerminProps {
  /** cal.com-Link, z. B. https://cal.com/rocketbase-marten/discovery-vorabgesprach */
  calUrl: string;
  calLabel: string;
  heading: string;
  text?: string;
}

/** Aus der vollen URL den `namespace/event`-Teil ziehen, den der Embed erwartet. */
function calLink(url: string): string | null {
  try {
    return new URL(url).pathname.replace(/^\/+|\/+$/g, '') || null;
  } catch {
    return null;
  }
}

export function BriefTermin({ calUrl, calLabel, heading, text }: BriefTerminProps) {
  const [embedErlaubt, setEmbedErlaubt] = useState(false);
  // Erst nach dem Mount entscheiden: localStorage gibt es beim SSR nicht, und
  // ein Server-Render mit "erlaubt" würde beim Hydrieren springen.
  const [bereit, setBereit] = useState(false);
  const [letterRef, setLetterRef] = useState('');

  useEffect(() => {
    const pruefen = () => setEmbedErlaubt(hatConsent('preferences'));
    pruefen();
    setLetterRef(leseBriefRef());
    setBereit(true);
    return beiConsentAenderung(pruefen);
  }, []);

  // Kein separater `cal('ui', …)`-Aufruf: Der feuert, bevor die <Cal>-Komponente
  // ihren iframe erzeugt hat, und quittiert das mit
  // "iframe doesn't exist. createIframe must be called before doInIframe".
  // Das Layout steht ohnehin in der config-Prop unten — dort wird es zum
  // richtigen Zeitpunkt angewendet.

  // Wer direkt bucht statt das Formular zu nutzen, bleibt dem Brief zuzuordnen.
  //
  // Drei Wege, weil sie unterschiedlich haltbar sind und unterschiedlich viel
  // Konfiguration in Cal.com voraussetzen:
  //   metadata[letterRef]  landet in der metadata-Spalte der Buchung und im
  //                        Webhook — braucht KEIN Formularfeld, deshalb der
  //                        verlässlichste Weg
  //   utm_content          für die schnelle Sicht in der Auswertung
  //   letterRef            füllt ein gleichnamiges Buchungsfeld, falls es in
  //                        Cal.com angelegt und eingeschaltet ist. Ist es aus,
  //                        wird der Parameter schlicht ignoriert.
  const zielUrl = letterRef
    ? `${calUrl}?utm_source=brief&utm_content=${encodeURIComponent(letterRef)}` +
      `&metadata[letterRef]=${encodeURIComponent(letterRef)}` +
      `&letterRef=${encodeURIComponent(letterRef)}`
    : calUrl;

  const link = calLink(calUrl);

  return (
    <div>
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {heading}
        </h2>
        {text && (
          <p className="text-foreground-secondary mx-auto mt-4 max-w-xl text-base leading-7">
            {text}
          </p>
        )}
      </header>

      {bereit && embedErlaubt && link ? (
        <div className="border-border bg-card mt-8 overflow-hidden rounded-2xl border shadow-sm">
          <Cal
            calLink={link}
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            config={{
              layout: 'month_view',
              ...(letterRef
                ? {
                    utm_source: 'brief',
                    utm_content: letterRef,
                    // Der verlässlichste Weg: landet in der metadata-Spalte der
                    // Buchung und im Webhook-Payload, ganz ohne Formularfeld.
                    'metadata[letterRef]': letterRef,
                    // Füllt zusätzlich ein Buchungsfeld gleichen Namens, falls
                    // es in Cal.com eingeschaltet ist — sonst ignoriert.
                    letterRef,
                  }
                : {}),
            }}
          />
        </div>
      ) : (
        <div className="mt-8 text-center">
          <a
            href={zielUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            <CalendarClock aria-hidden="true" />
            {calLabel}
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
          </a>
          {bereit && !embedErlaubt && (
            <p className="text-foreground-muted mx-auto mt-3 max-w-sm text-xs leading-5">
              Der Kalender öffnet sich bei cal.com — direkt hier einbetten dürfen wir ihn nur mit
              Ihrer Zustimmung zu funktionalen Cookies.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
