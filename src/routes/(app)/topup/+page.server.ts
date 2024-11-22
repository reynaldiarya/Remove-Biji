import { createPaymentSchema } from '$lib/schema/payment-schema';
import { createInvoice } from '$lib/server/payment';
import { redirect } from '@sveltejs/kit';
import { withCatch } from '@tfkhdyt/with-catch';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (!data.user) {
		return redirect(302, '/auth/login/google');
	}

	const form = await superValidate(zod(createPaymentSchema));

	return { data, form };
};

export const actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(createPaymentSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		if (!locals.user) {
			return message(form, { type: 'error', message: 'Kamu harus login terlebih dahulu' });
		}

		const [err, checkoutUrl] = await withCatch(
			createInvoice(form.data.package, {
				id: locals.user.id,
				name: locals.user.name,
				email: locals.user.email
			})
		);
		if (err) {
			return message(form, { type: 'error', message: err.message });
		}

		return redirect(302, checkoutUrl);
	}
};
