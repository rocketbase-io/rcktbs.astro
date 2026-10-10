import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { z } from 'zod';
import { deliverToSales, type StoredLead } from '../lib/sales-delivery';

const contactSchema = z.object({
	name: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben.').max(100),
	email: z.string().email('Bitte eine gueltige E-Mail-Adresse eingeben.'),
	subject: z.string().max(200).optional(),
	message: z
		.string()
		.min(10, 'Bitte mindestens 10 Zeichen eingeben.')
		.max(5000),
	// Honeypot und Zeitstempel bewusst PERMISSIV: wuerde ein gefuelltes
	// Honeypot-Feld die Validierung brechen, kaeme eine 400 mit dem Feldnamen
	// zurueck - also eine Anleitung, welches Feld wegzulassen ist.
	honeypot: z.string().max(200).optional(),
	renderedAt: z.string().max(20).optional(),
	/**
	 * Herkunft und Brief-Kennung, vom Formular mitgeschickt wie beim Quiz. Ohne sie wäre
	 * eine Kontaktanfrage im Board eine Zeile ohne Absender-Geschichte — und genau die
	 * Frage „welche Anzeige bringt Anfragen" bliebe unbeantwortet.
	 */
	funnel: z.string().max(100).optional(),
	utm: z.record(z.string(), z.string().max(500)).optional(),
	letterRef: z.string().max(50).optional(),
	page: z.string().max(2000).optional(),
});

const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

/**
 * Warum kein Captcha: Bots, die Formulare abgrasen, fuehren kein JavaScript
 * aus - sie schicken `renderedAt` gar nicht erst mit. Das allein trennt sie
 * zuverlaessiger als jede Rechenaufgabe, die echte Interessenten kostet.
 *
 * Nichts wird verworfen: Verdaechtiges bekommt [SPAM?] in den Betreff und
 * landet trotzdem im Postfach. Eine Mailregel sortiert es weg, ein falsch
 * markierter Lead ist trotzdem da.
 */
const suspicionOf = (
	data: { name: string; message: string; renderedAt?: string },
	now: number,
): string[] => {
	const flags: string[] = [];

	const rendered = Number(data.renderedAt);
	if (!data.renderedAt || !Number.isFinite(rendered) || rendered <= 0) {
		flags.push('kein JavaScript');
	} else if (now - rendered < 3000) {
		flags.push(`abgesendet in ${now - rendered}ms`);
	}

	const links = (data.message.match(/\bhttps?:\/\/|\bwww\.[a-z0-9-]+\.[a-z]{2,}/gi) || []).length;
	if (links >= 2) flags.push(`${links} Links`);

	if (/\[url=|<a\s|<script/i.test(data.message)) flags.push('Markup');
	if (/[\u0400-\u04FF\u4E00-\u9FFF]/.test(data.message)) flags.push('fremdes Schriftsystem');
	if (/https?:\/\/|www\./i.test(data.name)) flags.push('Link im Namen');

	return flags;
};

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

const parseJson = (value: string, fallback: unknown) => {
	try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
};

export default async (request: Request, context: Context) => {
	if (request.method !== 'POST') {
		return json({ success: false, error: 'Method not allowed' }, 405);
	}

	try {
		const formData = await request.formData();

		const data = {
			name: formData.get('name')?.toString() || '',
			email: formData.get('email')?.toString() || '',
			subject: formData.get('subject')?.toString() || '',
			message: formData.get('message')?.toString() || '',
			honeypot: formData.get('honeypot')?.toString() || '',
			renderedAt: formData.get('renderedAt')?.toString() || '',
			funnel: formData.get('funnel')?.toString() || undefined,
			utm: parseJson(formData.get('utm')?.toString() || '{}', {}),
			letterRef: formData.get('letterRef')?.toString() || undefined,
			page: formData.get('page')?.toString() || undefined,
		};

		const result = contactSchema.safeParse(data);

		if (!result.success) {
			const fieldErrors: Record<string, string[]> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as string;
				if (!fieldErrors[field]) fieldErrors[field] = [];
				fieldErrors[field].push(issue.message);
			}
			return json({ success: false, errors: fieldErrors }, 400);
		}

		// Honeypot gefuellt: still verwerfen. Der Bot bekommt dieselbe Antwort
		// wie ein echter Absender und merkt nicht, dass er erkannt wurde.
		if (result.data.honeypot && result.data.honeypot.trim().length > 0) {
			console.error('[contact:spam] honeypot gefuellt, verworfen');
			return json({ success: true });
		}

		const flags = suspicionOf(
			{
				name: result.data.name,
				message: result.data.message,
				renderedAt: result.data.renderedAt,
			},
			Date.now(),
		);
		if (flags.length > 0) {
			console.error(`[contact:verdacht] ${flags.join(', ')} | ${result.data.email}`);
		}

		// Ab hier derselbe Weg wie beim Quiz (`funnel-lead.ts`): erst haltbar ablegen, dann
		// ans CRM zustellen, und die Mail nur noch, wenn das nicht geklappt hat. Vorher endete
		// diese Function bei der Mail — eine Kontaktanfrage war damit das einzige Formular der
		// Seite, das im CRM nie auftauchte, obwohl sie dieselben Kontaktdaten trägt wie ein
		// Quiz-Lead und denselben Rückruf auslöst.
		//
		// **Verdächtiges geht nicht ins CRM.** Die Mail bekommt es weiterhin mit `[SPAM?]` im
		// Betreff — eine Mailregel sortiert sie weg, und ein falsch markierter Lead ist trotzdem
		// da. Eine Karte im Board dagegen müsste jemand von Hand wegräumen, und das Board lebt
		// davon, dass jede Karte eine Entscheidung verlangt.
		const verdaechtig = flags.length > 0;

		const receivedAt = new Date().toISOString();
		const stored: StoredLead = {
			receivedAt,
			// Ohne Angabe die Seite, auf der das Formular steht — `streckeAusPfad` im Browser
			// liefert denselben Wert wie beim Quiz, damit Öffnung und Abgabe dieselbe Strecke
			// teilen.
			funnel: result.data.funnel || 'kontakt',
			// Das Kontaktformular fragt die Firma nicht ab. Leer lassen statt aus der
			// Mail-Domain zu raten: Das Backend leitet die Website daraus ohnehin ab, und ein
			// geratener Firmenname stünde im Board wie eine Angabe des Absenders.
			company: '',
			name: result.data.name,
			email: result.data.email,
			answers: [],
			event: 'form_submit',
			subject: result.data.subject || undefined,
			message: result.data.message,
			attribution: result.data.utm,
			letterRef: result.data.letterRef,
			page: result.data.page,
			geo: {
				city: context.geo?.city,
				country: context.geo?.country?.name,
				subdivision: context.geo?.subdivision?.name,
			},
			userAgent: request.headers.get('user-agent') || undefined,
			deliveredAt: null,
		};

		let delivery: { ok: boolean; reason?: string } = {
			ok: false,
			reason: 'als Spam-Verdacht nicht zugestellt',
		};

		// Blob+Sales immer — auch mit `hasSpamVerdacht: true`. Nur `[SPAM?]` = kein
		// JavaScript → Bots ohne JS-Ausführung. Plunk ist jetzt nur noch ein Error-Fallback
		// für das Sales-Backend selbst (nicht mehr pro Anfrage).
		stored.hasSpamVerdacht = flags.length > 0;

		const store = getStore('funnel-leads');
		const day = receivedAt.slice(0, 10);
		const submissionId = `${day}/${receivedAt}-${crypto.randomUUID().slice(0, 8)}`;
		try {
			await store.setJSON(submissionId, stored);
		} catch (blobError) {
			console.error('Blob store error:', blobError);
			return json(
				{
					success: false,
					errors: { form: ['Ein unerwarteter Fehler ist aufgetreten.'] },
				},
				500,
			);
		}

		delivery = await deliverToSales(stored, submissionId);
		if (delivery.ok) {
			try {
				await store.setJSON(submissionId, { ...stored, deliveredAt: new Date().toISOString() });
			} catch (stampError) {
				// Die Anfrage ist im CRM, nur der Stempel fehlt. Der Nachlieferer schickt sie
				// erneut, was das Backend über `submissionId` verwirft.
				console.error('Blob stamp error:', stampError);
			}
		} else {
			console.error('Sales delivery failed:', delivery.reason);
		}

		return json({ success: true });
	} catch (error) {
		console.error('Contact form error:', error);
		return json(
			{
				success: false,
				errors: { form: ['Ein unerwarteter Fehler ist aufgetreten.'] },
			},
			500,
		);
	}
};

export const config = {
	path: '/api/contact',
};
