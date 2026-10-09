import type { Context } from '@netlify/functions';
import { z } from 'zod';

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

export default async (request: Request, _context: Context) => {
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

		const plunkSecretKey = Netlify.env.get('PLUNK_SECRET_KEY');
		const contactEmail = Netlify.env.get('CONTACT_NOTIFICATION_EMAIL');

		if (plunkSecretKey && contactEmail) {
			const marker = flags.length > 0 ? '[SPAM?] ' : '';
			const emailSubject = result.data.subject
				? `${marker}Kontaktanfrage: ${result.data.subject}`
				: `${marker}Kontaktanfrage von ${result.data.name}`;

			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 8000);

			try {
				// Antwort auswerten, nicht nur abwarten: Ein deaktivierter Account oder ein
				// abgelaufener Key antwortet 401/403, und `fetch` wertet das nicht als Fehler --
				// der `catch` unten greift nur bei Netzwerkabbruch oder Timeout. Eine
				// Kontaktanfrage ist hier das einzige Signal; ohne diese Pruefung geht sie
				// still verloren, und die Logs melden nichts.
				const plunkResponse = await fetch('https://next-api.useplunk.com/v1/send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${plunkSecretKey}`,
					},
					body: JSON.stringify({
						to: contactEmail,
						from: 'kontakt@rocketbase.io',
						subject: emailSubject,
						body: `
              ${
								flags.length > 0
									? `<p style="background:#fef3c7;border:1px solid #fcd34d;border-radius:6px;padding:10px 14px">
                       <strong>Verdacht auf Spam:</strong> ${escapeHtml(flags.join(', '))}
                     </p>`
									: ''
							}
              <p><strong>Name:</strong> ${escapeHtml(result.data.name)}</p>
              <p><strong>E-Mail:</strong> ${escapeHtml(result.data.email)}</p>
              ${result.data.subject ? `<p><strong>Betreff:</strong> ${escapeHtml(result.data.subject)}</p>` : ''}
              <p><strong>Nachricht:</strong></p>
              <p style="white-space: pre-wrap">${escapeHtml(result.data.message)}</p>
            `,
					}),
					signal: controller.signal,
				});
				if (!plunkResponse.ok) {
					console.error(
						`Plunk email rejected: HTTP ${plunkResponse.status} ${await plunkResponse.text()}`,
					);
				}
			} catch (emailError) {
				console.error('Plunk email error:', emailError);
			} finally {
				clearTimeout(timeout);
			}
		} else {
			console.warn('Plunk not configured (PLUNK_SECRET_KEY / CONTACT_NOTIFICATION_EMAIL)');
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
