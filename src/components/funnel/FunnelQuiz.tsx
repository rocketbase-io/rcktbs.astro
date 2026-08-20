import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, CalendarClock, Check, Loader2, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/form/Button/button.variants';
import { Input } from '@/components/ui/form/Input/Input';
import type { FunnelQuizQuestion } from '@/data/funnels';
import {
  ergaenzeMetaCookies,
  erzeugeEventId,
  pushEvent,
  sammleAttribution,
  trackMetaLead,
} from '@/lib/leadTracking';

interface FunnelQuizProps {
  funnel: string;
  questions: FunnelQuizQuestion[];
  contact: { heading: string; text: string };
  success: { heading: string; text: string; calUrl?: string; calLabel?: string };
  privacyUrl?: string;
  endpoint?: string;
}

interface QuizAnswer {
  questionId: string;
  question: string;
  optionId: string;
  answer: string;
  detail?: string;
}

export function FunnelQuiz({
  funnel,
  questions,
  contact,
  success,
  privacyUrl = '/datenschutz/',
  endpoint = '/api/funnel-lead',
}: FunnelQuizProps) {
  // Schritte: 0..questions.length-1 = Fragen, questions.length = Kontakt
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [freeText, setFreeText] = useState('');
  const [textMode, setTextMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const utmRef = useRef<Record<string, string>>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const totalSteps = questions.length + 1;
  const progress = submitted ? 100 : Math.round((step / totalSteps) * 100);
  const contactStep = step === questions.length;
  const currentQuestion = contactStep ? null : questions[step];

  useEffect(() => {
    utmRef.current = sammleAttribution();
  }, []);

  function trackStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    pushEvent('funnel_quiz_start', { funnel });
  }

  function scrollToCard() {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goToStep(next: number) {
    setStep(next);
    setTextMode(false);
    setFreeText('');
    scrollToCard();
  }

  function selectOption(optionId: string) {
    if (!currentQuestion) return;
    trackStart();
    const option = currentQuestion.options.find((o) => o.id === optionId);
    if (!option) return;

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      optionId: option.id,
      answer: option.label,
    };
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));

    if (option.allowText) {
      setTextMode(true);
      return;
    }

    pushEvent('funnel_step_complete', {
      funnel,
      step: step + 1,
      question: currentQuestion.id,
      answer: option.id,
    });
    // Kurze Pause, damit die Auswahl sichtbar wird (Perspective-Feeling)
    window.setTimeout(() => goToStep(step + 1), 220);
  }

  function confirmFreeText() {
    if (!currentQuestion) return;
    const existing = answers[currentQuestion.id];
    if (!existing) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { ...existing, detail: freeText.trim() },
    }));
    pushEvent('funnel_step_complete', {
      funnel,
      step: step + 1,
      question: currentQuestion.id,
      answer: existing.optionId,
    });
    goToStep(step + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('funnel', funnel);
    formData.set('page', window.location.href);

    const eventId = erzeugeEventId();
    formData.set('eventId', eventId);

    const attribution = ergaenzeMetaCookies(utmRef.current);

    formData.set(
      'answers',
      JSON.stringify(questions.map((q) => answers[q.id]).filter(Boolean))
    );
    formData.set('utm', JSON.stringify(attribution));

    try {
      const response = await fetch(endpoint, { method: 'POST', body: formData });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        pushEvent('funnel_lead', {
          funnel,
          problem: answers[questions[0]?.id]?.optionId,
          impact: answers[questions[1]?.id]?.optionId,
        });
        // Browser-Pixel-Lead mit derselben eventId wie das CAPI-Event (Dedup)
        trackMetaLead(eventId);
        scrollToCard();
      } else {
        const errors = data.errors
          ? (Object.values(data.errors).flat().join(' ') as string)
          : 'Etwas ist schiefgelaufen. Bitte versucht es erneut.';
        setFormError(errors);
      }
    } catch {
      setFormError('Senden fehlgeschlagen. Bitte prüft eure Verbindung und versucht es erneut.');
    } finally {
      setSubmitting(false);
    }
  }

  const selectedOptionId = currentQuestion ? answers[currentQuestion.id]?.optionId : undefined;

  return (
    <div ref={cardRef} className="scroll-mt-24">
      <div className="border-border bg-card overflow-hidden rounded-3xl border shadow-lg">
        {/* Fortschritt */}
        <div className="bg-background-secondary h-1.5 w-full">
          <div
            className="bg-brand-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>

        <div className="p-5 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center sm:py-10">
              <div className="bg-brand-500 text-on-invert flex h-14 w-14 items-center justify-center rounded-full">
                <Check className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="font-display text-foreground mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
                {success.heading}
              </h2>
              <p className="text-foreground-secondary mt-4 max-w-md text-base leading-7">
                {success.text}
              </p>
              {success.calUrl && (
                <>
                  <p className="text-foreground mt-8 text-sm font-medium">
                    Ihr wollt nicht warten?
                  </p>
                  <a
                    href={success.calUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: 'lg' }), 'mt-3')}
                  >
                    <CalendarClock aria-hidden="true" />
                    {success.calLabel || 'Termin buchen'}
                  </a>
                </>
              )}
            </div>
          ) : contactStep ? (
            <div>
              <StepHeader
                step={step}
                totalSteps={totalSteps}
                onBack={() => goToStep(step - 1)}
              />
              <h2 className="font-display text-foreground mt-4 text-xl font-bold tracking-tight sm:text-2xl">
                {contact.heading}
              </h2>
              <p className="text-foreground-secondary mt-2 text-sm leading-6 sm:text-base">
                {contact.text}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate={false}>
                <Input label="Firma" name="company" type="text" required autoComplete="organization" size="lg" />
                <Input label="Name" name="name" type="text" required autoComplete="name" size="lg" />
                <Input label="E-Mail" name="email" type="email" required autoComplete="email" inputMode="email" size="lg" />
                <Input
                  label="Telefon (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  size="lg"
                  hint="Für eine kurze Rückfrage - wir rufen nur an, wenn es hilft."
                />

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
                      Ersteinschätzung anfordern
                      <ArrowRight aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-foreground-muted flex items-start gap-2 text-xs leading-5">
                  <ShieldCheck className="text-brand-500 mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    Eure Daten nutzen wir ausschließlich zur Bearbeitung eurer Anfrage. Details in
                    der{' '}
                    <a href={privacyUrl} className="hover:text-foreground underline underline-offset-2">
                      Datenschutzerklärung
                    </a>
                    .
                  </span>
                </p>
              </form>
            </div>
          ) : currentQuestion ? (
            <div>
              <StepHeader
                step={step}
                totalSteps={totalSteps}
                onBack={step > 0 ? () => goToStep(step - 1) : undefined}
              />
              <h2 className="font-display text-foreground mt-4 text-xl font-bold tracking-tight sm:text-2xl">
                {currentQuestion.question}
              </h2>
              {currentQuestion.hint && (
                <p className="text-foreground-muted mt-2 text-sm leading-6">
                  {currentQuestion.hint}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3">
                {currentQuestion.options.map((option) => {
                  const selected = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(option.id)}
                      aria-pressed={selected}
                      className={cn(
                        'group w-full rounded-2xl border-2 p-4 text-left transition-all duration-150 sm:p-5',
                        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                        'active:scale-[0.99]',
                        selected
                          ? 'border-brand-500 bg-brand-500/5'
                          : 'border-border bg-background hover:border-brand-300 hover:bg-brand-500/[0.03]'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                            selected
                              ? 'border-brand-500 bg-brand-500 text-on-invert'
                              : 'border-border-strong group-hover:border-brand-400'
                          )}
                          aria-hidden="true"
                        >
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="text-foreground block text-base font-semibold">
                            {option.label}
                          </span>
                          {option.description && (
                            <span className="text-foreground-muted mt-0.5 block text-sm leading-5">
                              {option.description}
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {textMode && (
                <div className="mt-4">
                  <textarea
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                    rows={3}
                    autoFocus
                    placeholder={
                      currentQuestion.options.find((o) => o.id === selectedOptionId)
                        ?.textPlaceholder || 'Kurz beschreiben …'
                    }
                    className="border-border bg-background text-foreground placeholder:text-foreground-muted focus-visible:ring-ring w-full rounded-xl border-2 p-4 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  />
                  <button
                    type="button"
                    onClick={confirmFreeText}
                    className={cn(buttonVariants({ size: 'lg', fullWidth: true }), 'mt-3')}
                  >
                    Weiter
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StepHeader({
  step,
  totalSteps,
  onBack,
}: {
  step: number;
  totalSteps: number;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-foreground-muted hover:text-foreground -ml-1 flex items-center gap-1 rounded-md px-1 py-1 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Zurück
        </button>
      ) : (
        <span />
      )}
      <span className="text-foreground-muted font-mono text-xs tracking-[0.18em] uppercase">
        Schritt {step + 1} / {totalSteps}
      </span>
    </div>
  );
}

export default FunnelQuiz;
