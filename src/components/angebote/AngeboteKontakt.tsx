import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/form/Button/button.variants';
import { Input } from '@/components/ui/form/Input/Input';
import {
  ergaenzeMetaCookies,
  erzeugeEventId,
  pushEvent,
  sammleAttribution,
  trackMetaLead,
  trackPlausible,
} from '@/lib/leadTracking';

/**
 * Kontaktformular der Angebotsmodul-Seite (/f/angebote/).
 *
 * Schwester von `BriefKontakt.tsx`, nur in Ihr-Form und ohne Brief-Kennung:
 * Wer hier ankommt, kommt aus einem Social-Post oder der Suche, nicht aus
 * einem Anschreiben. Ein gemeinsames Formular hätte die Anrede durch jede
 * Zeile geschleift (siehe die Begründung in `briefLandings.ts`). Geteilt ist
 * nur die Tracking-Mechanik aus `@/lib/leadTracking`.
 */

interface AngeboteKontaktProps {
  /** Funnel-Kennung für die Auswertung in der Lead-Mail. */
  funnel?: string;
  heading: string;
  text: string;
  erfolg: { heading: string; text: string };
  privacyUrl?: string;
  endpoint?: string;
}

export function AngeboteKontakt({
  funnel = 'angebote',
  heading,
  text,
  erfolg,
  privacyUrl = '/datenschutz/',
  endpoint = '/api/funnel-lead',
}: AngeboteKontaktProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const attributionRef = useRef<Record<string, string>>({});
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    attributionRef.current = sammleAttribution();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.set('funnel', funnel);
    formData.set('page', window.location.href);
    // Der Endpoint erwartet das Feld; hier gibt es kein Quiz.
    formData.set('answers', '[]');

    const eventId = erzeugeEventId();
    formData.set('eventId', eventId);
    formData.set('utm', JSON.stringify(ergaenzeMetaCookies(attributionRef.current)));

    try {
      const response = await fetch(endpoint, { method: 'POST', body: formData });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        pushEvent('angebote_lead', { funnel });
        trackPlausible('Lead', { funnel });
        trackMetaLead(eventId);
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const errors = data.errors
          ? (Object.values(data.errors).flat().join(' ') as string)
          : 'Etwas ist schiefgelaufen. Bitte versucht es noch einmal.';
        setFormError(errors);
      }
    } catch {
      setFormError('Senden fehlgeschlagen. Bitte prüft eure Verbindung und versucht es erneut.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={cardRef} className="scroll-mt-24">
      <div className="border-border bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
        {submitted ? (
          <div className="text-center">
            <div className="bg-brand-500/10 text-brand-600 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
              <Check aria-hidden="true" />
            </div>
            <h3 className="font-display text-foreground mt-4 text-xl font-bold tracking-tight sm:text-2xl">
              {erfolg.heading}
            </h3>
            <p className="text-foreground-secondary mx-auto mt-3 max-w-md text-sm leading-6 sm:text-base">
              {erfolg.text}
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-display text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              {heading}
            </h3>
            <p className="text-foreground-secondary mt-2 text-sm leading-6 sm:text-base">{text}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Firma"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  size="lg"
                />
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  size="lg"
                />
                <Input
                  label="E-Mail"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  size="lg"
                />
                <Input
                  label="Telefon (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  size="lg"
                />
              </div>

              <p className="text-foreground-muted text-xs leading-5">
                Die Telefonnummer nur für eine kurze Rückfrage. Wir rufen an, wenn es hilft.
              </p>

              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
              </div>

              {formError && (
                <p className="text-destructive text-sm" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={cn(buttonVariants({ size: 'lg', fullWidth: true }))}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Wird gesendet …
                  </>
                ) : (
                  <>
                    Nachricht senden
                    <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-foreground-muted flex items-start gap-2 text-xs leading-5">
                <ShieldCheck
                  className="text-brand-500 mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Eure Daten nutzen wir nur, um diese Anfrage zu beantworten. Kein Newsletter, keine
                  Weitergabe. Details in der{' '}
                  <a
                    href={privacyUrl}
                    className="hover:text-foreground underline underline-offset-2"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
