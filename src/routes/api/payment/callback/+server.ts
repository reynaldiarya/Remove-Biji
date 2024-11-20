import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'node:crypto';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { TripayCallbackResponse } from '$lib/types/tripay';
import { eq, sql } from 'drizzle-orm';
import { withCatch } from '@tfkhdyt/with-catch';

export const POST: RequestHandler = async ({ request }) => {
	const data: TripayCallbackResponse = await request.json();
	const signature = crypto
		.createHmac('sha256', env.TRIPAY_PRIVATE_KEY)
		.update(JSON.stringify(data))
		.digest('hex');
	const signatureFromTripay = request.headers.get('X-Callback-Signature');

	if (signature !== signatureFromTripay) {
		return error(401, 'Signature tidak valid');
	}

	await db.transaction(async (trx) => {
		const [invoice] = await trx
			.update(table.invoices)
			.set({
				status: data.status,
				paidAt: data.status === 'PAID' ? new Date(data.paid_at * 1000) : undefined
			})
			.where(eq(table.invoices.id, data.merchant_ref))
			.returning({ package: table.invoices.package, userId: table.invoices.userId });

		if (data.status === 'PAID') {
			const [err] = await withCatch(
				trx
					.update(table.credits)
					.set({
						amount: sql`${table.credits.amount} + ${invoice.package}`
					})
					.where(eq(table.credits.id, invoice.userId))
			);
			if (err) {
				throw new Error('Error updating credits', { cause: err });
			}
		}
	});

	return json({ success: true });
};
