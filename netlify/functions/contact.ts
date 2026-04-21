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
	honeypot: z.string().max(0),
});

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

		if (result.data.honeypot) {
			return json({ success: true });
		}

		const plunkSecretKey = Netlify.env.get('PLUNK_SECRET_KEY');
		const contactEmail = Netlify.env.get('CONTACT_NOTIFICATION_EMAIL');

		if (plunkSecretKey && contactEmail) {
			const emailSubject = result.data.subject
				? `Kontaktanfrage: ${result.data.subject}`
				: `Kontaktanfrage von ${result.data.name}`;

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
						subject: emailSubject,
						body: `
              <p><strong>Name:</strong> ${result.data.name}</p>
              <p><strong>E-Mail:</strong> ${result.data.email}</p>
              ${result.data.subject ? `<p><strong>Betreff:</strong> ${result.data.subject}</p>` : ''}
              <p><strong>Nachricht:</strong></p>
              <p style="white-space: pre-wrap">${result.data.message}</p>
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
