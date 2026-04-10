import type { APIRoute } from "astro";
import { z } from "astro/zod";

export const prerender = false;

const contactSchema = z.object({
	name: z.string().min(2, "Bitte mindestens 2 Zeichen eingeben.").max(100),
	email: z.email("Bitte eine gueltige E-Mail-Adresse eingeben."),
	subject: z.string().max(200).optional(),
	message: z
		.string()
		.min(10, "Bitte mindestens 10 Zeichen eingeben.")
		.max(5000),
	honeypot: z.string().max(0), // Anti-spam: must be empty
});

export const POST: APIRoute = async ({ request }) => {
	try {
		const formData = await request.formData();

		const data = {
			name: formData.get("name")?.toString() || "",
			email: formData.get("email")?.toString() || "",
			subject: formData.get("subject")?.toString() || "",
			message: formData.get("message")?.toString() || "",
			honeypot: formData.get("honeypot")?.toString() || "",
		};

		// Validate
		const result = contactSchema.safeParse(data);

		if (!result.success) {
			const fieldErrors: Record<string, string[]> = {};
			for (const error of result.error.issues) {
				const field = error.path[0] as string;
				if (!fieldErrors[field]) {
					fieldErrors[field] = [];
				}
				fieldErrors[field].push(error.message);
			}

			return new Response(
				JSON.stringify({
					success: false,
					errors: fieldErrors,
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		// Honeypot check (bot detection)
		if (result.data.honeypot) {
			// Pretend success but don't process
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Send notification email via Plunk secret key (server-side only — key never exposed to browser)
		const plunkSecretKey = import.meta.env.PLUNK_SECRET_KEY;
		const contactEmail = import.meta.env.CONTACT_NOTIFICATION_EMAIL;
		if (plunkSecretKey && contactEmail) {
			const emailSubject = result.data.subject
				? `Kontaktanfrage: ${result.data.subject}`
				: `Kontaktanfrage von ${result.data.name}`;

			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 8000);

			try {
				await fetch("https://next-api.useplunk.com/v1/send", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${plunkSecretKey}`,
					},
					body: JSON.stringify({
						to: contactEmail,
						from: "kontakt@rocketbase.io",
						subject: emailSubject,
						body: `
              <p><strong>Name:</strong> ${result.data.name}</p>
              <p><strong>E-Mail:</strong> ${result.data.email}</p>
              ${result.data.subject ? `<p><strong>Betreff:</strong> ${result.data.subject}</p>` : ""}
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

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Contact form error:", error);

		return new Response(
			JSON.stringify({
				success: false,
				errors: { form: ["Ein unerwarteter Fehler ist aufgetreten."] },
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};
