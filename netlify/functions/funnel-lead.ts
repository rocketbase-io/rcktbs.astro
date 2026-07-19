import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { z } from 'zod';

const answerSchema = z.object({
	questionId: z.string().max(100),
	question: z.string().max(500),
	optionId: z.string().max(100),
	answer: z.string().max(500),
	detail: z.string().max(2000).optional(),
});

const leadSchema = z.object({
	funnel: z.string().min(1).max(100),
	company: z.string().min(2, 'Bitte den Firmennamen angeben.').max(200),
	name: z.string().min(2, 'Bitte mindestens 2 Zeichen eingeben.').max(100),
	email: z.string().email('Bitte eine gueltige E-Mail-Adresse eingeben.'),
	phone: z.string().max(50).optional(),
	answers: z.array(answerSchema).max(20),
	utm: z.record(z.string(), z.string().max(500)).optional(),
	page: z.string().max(2000).optional(),
	honeypot: z.string().max(0),
});

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
			funnel: formData.get('funnel')?.toString() || '',
			company: formData.get('company')?.toString() || '',
			name: formData.get('name')?.toString() || '',
			email: formData.get('email')?.toString() || '',
			phone: formData.get('phone')?.toString() || undefined,
			answers: parseJson(formData.get('answers')?.toString() || '[]', []),
			utm: parseJson(formData.get('utm')?.toString() || '{}', {}),
			page: formData.get('page')?.toString() || undefined,
			honeypot: formData.get('honeypot')?.toString() || '',
		};

		const result = leadSchema.safeParse(data);

		if (!result.success) {
			const fieldErrors: Record<string, string[]> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as string;
				if (!fieldErrors[field]) fieldErrors[field] = [];
				fieldErrors[field].push(issue.message);
			}
			return json({ success: false, errors: fieldErrors }, 400);
		}

		if (result.data.honeypot) {
			return json({ success: true });
		}

		const lead = result.data;
		const receivedAt = new Date().toISOString();
		const geo = {
			city: context.geo?.city,
			country: context.geo?.country?.name,
			subdivision: context.geo?.subdivision?.name,
		};
		const userAgent = request.headers.get('user-agent') || undefined;

		// Lead dauerhaft ablegen - E-Mail ist nur die Benachrichtigung.
		// Abrufbar über das Netlify-Dashboard (Blobs) oder `netlify blobs:list funnel-leads`.
		try {
			const store = getStore('funnel-leads');
			const day = receivedAt.slice(0, 10);
			const key = `${day}/${receivedAt}-${crypto.randomUUID().slice(0, 8)}`;
			await store.setJSON(key, {
				receivedAt,
				funnel: lead.funnel,
				company: lead.company,
				name: lead.name,
				email: lead.email,
				phone: lead.phone,
				answers: lead.answers,
				attribution: lead.utm,
				page: lead.page,
				geo,
				userAgent,
			});
		} catch (blobError) {
			console.error('Blob store error:', blobError);
		}

		const plunkSecretKey = Netlify.env.get('PLUNK_SECRET_KEY');
		const contactEmail = Netlify.env.get('CONTACT_NOTIFICATION_EMAIL');

		if (plunkSecretKey && contactEmail) {
			const answersHtml = lead.answers
				.map(
					(a) => `
            <p><strong>${a.question}</strong><br />
            ${a.answer}${a.detail ? `<br /><em style="white-space: pre-wrap">${a.detail}</em>` : ''}</p>
          `,
				)
				.join('');

			const utmEntries = Object.entries(lead.utm || {});
			const utmHtml = utmEntries.length
				? `<p><strong>Kampagnen-Daten:</strong><br />${utmEntries
						.map(([key, value]) => `${key}: ${value}`)
						.join('<br />')}</p>`
				: '';

			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 8000);

			try {
				await fetch('https://next-api.useplunk.com/v1/send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${plunkSecretKey}`,
					},
					body: JSON.stringify({
						to: contactEmail,
						from: 'kontakt@rocketbase.io',
						subject: `Funnel-Lead (${lead.funnel}): ${lead.company}`,
						body: `
              <p><strong>Firma:</strong> ${lead.company}</p>
              <p><strong>Name:</strong> ${lead.name}</p>
              <p><strong>E-Mail:</strong> ${lead.email}</p>
              ${lead.phone ? `<p><strong>Telefon:</strong> ${lead.phone}</p>` : ''}
              <hr />
              ${answersHtml}
              <hr />
              ${lead.page ? `<p><strong>Seite:</strong> ${lead.page}</p>` : ''}
              ${geo.city ? `<p><strong>Herkunft:</strong> ${[geo.city, geo.subdivision, geo.country].filter(Boolean).join(', ')}</p>` : ''}
              ${utmHtml}
            `,
					}),
					signal: controller.signal,
				});
			} catch (emailError) {
				console.error('Plunk email error:', emailError);
			} finally {
				clearTimeout(timeout);
			}
		}

		return json({ success: true });
	} catch (error) {
		console.error('Funnel lead error:', error);
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
	path: '/api/funnel-lead',
};
