import type { Context } from '@netlify/functions';
import { z } from 'zod';

const newsletterSchema = z.object({
	email: z.string().email('Bitte eine gueltige E-Mail-Adresse eingeben.'),
	honeypot: z.string().max(0).optional(),
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
		const email = formData.get('email')?.toString() || '';
		const honeypot = formData.get('website')?.toString() || '';

		if (honeypot) {
			return json({ success: true });
		}

		const result = newsletterSchema.safeParse({ email, honeypot });

		if (!result.success) {
			return json(
				{
					success: false,
					error:
						result.error.issues[0]?.message ||
						'Bitte eine gueltige E-Mail-Adresse eingeben.',
				},
				400,
			);
		}

		// TODO: integrate with newsletter provider (Mailchimp / ConvertKit / Plunk etc.)

		return json({ success: true });
	} catch (error) {
		console.error('Newsletter error:', error);
		return json(
			{
				success: false,
				error: 'Anmeldung fehlgeschlagen. Bitte erneut versuchen.',
			},
			500,
		);
	}
};

export const config = {
	path: '/api/newsletter',
};
