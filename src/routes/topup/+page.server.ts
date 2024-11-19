import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { packages } from '$lib/constants/price';
import { env } from '$env/dynamic/private';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'node:crypto';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createPaymentSchema } from '$lib/schema/payment-schema';
import type { TripayInvoiceResponse } from '$lib/types/tripay';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (!data.user) {
		return redirect(302, '/auth/login/google');
	}

	const form = await superValidate(zod(createPaymentSchema));

	return { data, form };
};

const tripayUrl =
	env.NODE_ENV === 'production'
		? 'https://tripay.co.id/api/transaction/create'
		: 'https://tripay.co.id/api-sandbox/transaction/create';
const apiKey = env.TRIPAY_API_KEY;
const privateKey = env.TRIPAY_PRIVATE_KEY;
const merchant_code = env.TRIPAY_MERCHANT_CODE;

export const actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(createPaymentSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		if (!locals.user) {
			return message(form, { type: 'error', message: 'Kamu harus login terlebih dahulu' });
		}

		const pkg = packages.find((p) => p.value === form.data.package);

		const merchant_ref = `INV-${uuidv4()}`;
		const signature = crypto
			.createHmac('sha256', privateKey)
			.update(merchant_code + merchant_ref + pkg?.totalPrice)
			.digest('hex');

		const expiry = Math.floor(Date.now() / 1000) + 24 * 60 * 60; //  24 jam

		const payload = {
			method: 'QRIS2',
			merchant_ref,
			amount: pkg?.totalPrice,
			customer_name: locals.user?.name,
			customer_email: locals.user?.email,
			// customer_phone: '081234567890',
			order_items: [
				{
					sku: pkg?.value,
					name: `Saldo Remove Biji`,
					price: pkg?.pricePerImage,
					quantity: pkg?.value
					// product_url: 'https://tokokamu.com/product/nama-produk-1',
					// image_url: 'https://tokokamu.com/product/nama-produk-1.jpg'
				}
			],
			return_url: `${env.BASE_URL}/invoices`,
			callback_url: `${env.BASE_URL}/api/payment/callback`,
			expired_time: expiry,
			signature
		};

		const response = await fetch(tripayUrl, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + apiKey
			}
		});
		const data = await response.json();

		if (!response.ok) {
			return message(form, { type: 'error', message: data.message });
		}

		const invoice: TripayInvoiceResponse = data.data;

		await db.insert(table.invoices).values({
			id: invoice.merchant_ref,
			userId: locals.user?.id,
			status: invoice.status,
			expiredTime: new Date(invoice.expired_time * 1000),
			package: form.data.package,
			amount: invoice.amount
		});

		return redirect(302, invoice.checkout_url);
	}
};
