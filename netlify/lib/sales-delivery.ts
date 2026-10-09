/**
 * Zustellung eines Funnel-Leads ans Sales-Backend (rcktbs-sales).
 *
 * Geteilt zwischen `funnel-lead` (Sofort-Zustellung) und `funnel-redeliver`
 * (Nachlieferung): Der Vertrag mit dem CRM steht genau einmal, sonst driften die beiden
 * auseinander, sobald ein Feld dazukommt.
 *
 * **Warum server-zu-server und nicht aus dem Browser:** Nur hier kann ein Fehlschlag bemerkt
 * und wiederholt werden. Der Browser-Pfad (`src/lib/funnelTracking.ts`) bleibt daneben
 * bestehen — er meldet Verhalten (Seitenaufruf, Quiz-Schritte) und darf alles verschlucken.
 */

export interface StoredLead {
	receivedAt: string;
	funnel: string;
	company: string;
	name: string;
	email: string;
	phone?: string;
	answers: {
		questionId: string;
		question: string;
		optionId: string;
		answer: string;
		detail?: string;
	}[];
	/** Rohe Query-Parameter der Einstiegsseite, inkl. `_fbp`/`_fbc`. */
	attribution?: Record<string, string>;
	letterRef?: string;
	page?: string;
	geo?: { city?: string; country?: string; subdivision?: string };
	userAgent?: string;
	/** Gesetzt, sobald das CRM den Lead bestätigt hat. `null`/fehlend = noch offen. */
	deliveredAt?: string | null;
}

/** Was das CRM als Ereignisart erwartet. Quiz und Kontaktformular sind beides Abgaben. */
const EVENT = 'quiz_lead';

/**
 * Baut den Request-Body für `POST /api/public/funnel-events`.
 *
 * Die Kontaktangaben werden hier ins Standard-Shape überführt, nicht im Backend: Sonst
 * müsste das CRM jedes Formular dieser Seite kennen, und ein umbenanntes Feld ginge still
 * verloren.
 */
export const buildSalesPayload = (lead: StoredLead, submissionId: string) => {
	const utm = lead.attribution ?? {};
	return {
		event: EVENT,
		funnel: lead.funnel,
		submissionId,
		receivedAt: lead.receivedAt,
		// Die Brief-Kennung ist der `?r=`-Wert. Das Backend löst sie auf, wenn sie eine
		// TSID ist, und speichert sie sonst roh — verworfen wird sie nie.
		companyId: lead.letterRef,
		contact: {
			email: lead.email,
			name: lead.name,
			company: lead.company || undefined,
			phone: lead.phone,
		},
		attribution: {
			source: utm.utm_source,
			medium: utm.utm_medium,
			campaign: utm.utm_campaign,
			content: utm.utm_content,
			term: utm.utm_term,
			// fbclid bevorzugt, sonst Googles gclid.
			clickId: utm.fbclid || utm.gclid,
		},
		answers: lead.answers.map((a) => ({
			q: a.questionId,
			label: a.question,
			a: a.optionId,
			// Der Freitext gehört zur Antwort, nicht daneben: Wer "Sonstiges" wählt und
			// ausschreibt, hat genau das geantwortet.
			answerLabel: a.detail ? `${a.answer} — ${a.detail}` : a.answer,
		})),
		payload: {
			path: lead.page,
			referrer: utm.referrer,
			geoCity: lead.geo?.city,
		},
	};
};

export type DeliveryResult =
	| { ok: true }
	/** Der Lead ist nicht angekommen — der Blob behält `deliveredAt: null`. */
	| { ok: false; reason: string };

/**
 * Stellt einen Lead zu. Wirft nie — der Aufrufer entscheidet anhand des Ergebnisses.
 *
 * Ein `201` heißt angenommen, `503` heißt "später nochmal". Jede andere Antwort wird
 * ebenfalls als Fehlschlag gewertet: Lieber ein überflüssiger Wiederholungsversuch (der
 * über `submissionId` idempotent ist) als ein stillschweigend verlorener Lead.
 */
export const deliverToSales = async (
	lead: StoredLead,
	submissionId: string,
	timeoutMs = 8000,
): Promise<DeliveryResult> => {
	const base = Netlify.env.get('SALES_API_URL');
	if (!base) {
		return { ok: false, reason: 'SALES_API_URL not configured' };
	}

	const token = Netlify.env.get('SALES_API_TOKEN');
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const res = await fetch(`${base.replace(/\/+$/, '')}/api/public/funnel-events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { 'X-Api-Token': token } : {}),
			},
			body: JSON.stringify(buildSalesPayload(lead, submissionId)),
			signal: controller.signal,
		});
		if (res.status === 201 || res.status === 204) {
			return { ok: true };
		}
		return { ok: false, reason: `HTTP ${res.status}` };
	} catch (error) {
		return { ok: false, reason: error instanceof Error ? error.message : String(error) };
	} finally {
		clearTimeout(timeout);
	}
};
