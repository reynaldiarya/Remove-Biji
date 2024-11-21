import { packages } from '$lib/constants/price';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { TripayInvoiceResponse } from '$lib/types/tripay';
import { withCatch } from '@tfkhdyt/with-catch';
import { db } from './db';
import * as table from '$lib/server/db/schema';

const tripayUrl =
	env.NODE_ENV === 'production'
		? 'https://tripay.co.id/api/transaction/create'
		: 'https://tripay.co.id/api-sandbox/transaction/create';
const apiKey = env.TRIPAY_API_KEY;
const privateKey = env.TRIPAY_PRIVATE_KEY;
const merchant_code = env.TRIPAY_MERCHANT_CODE;

type UserData = {
	id: number;
	name: string | null;
	email: string | null;
};

export async function createInvoice(packageId: number, userData: UserData) {
	const pkg = packages.find((p) => p.value === packageId);

	const merchant_ref = `INV-${uuidv4()}`;
	const signature = crypto
		.createHmac('sha256', privateKey)
		.update(merchant_code + merchant_ref + pkg?.totalPrice)
		.digest('hex');

	const expiry = Math.floor(Date.now() / 1000) + 60 * 60; // 1 jam

	const payload = {
		method: 'QRIS2',
		merchant_ref,
		amount: pkg?.totalPrice,
		customer_name: userData.name,
		customer_email: userData.email,
		// customer_phone: '081234567890',
		order_items: [
			{
				sku: 'BIJI',
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

	const [err, response] = await withCatch(
		fetch(tripayUrl, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + apiKey
			}
		})
	);
	if (err) {
		throw new Error('Error creating payment', { cause: err });
	}

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}

	const invoice: TripayInvoiceResponse = data.data;

	const [errInsert] = await withCatch(
		db.insert(table.invoices).values({
			id: invoice.merchant_ref,
			userId: userData.id,
			status: invoice.status,
			expiredTime: new Date(invoice.expired_time * 1000),
			package: packageId,
			amount: invoice.amount,
			checkoutUrl: invoice.checkout_url
		})
	);
	if (errInsert) {
		throw new Error('Error creating invoice', { cause: errInsert });
	}

	return invoice.checkout_url;
}
