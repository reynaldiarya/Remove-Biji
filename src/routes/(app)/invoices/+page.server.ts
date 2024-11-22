import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { withCatch } from '@tfkhdyt/with-catch';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	if (!data.user) {
		return redirect(302, '/');
	}

	const [err, invoices] = await withCatch(
		db
			.select()
			.from(table.invoices)
			.where(eq(table.invoices.userId, data.user.id))
			.orderBy(desc(table.invoices.createdAt))
	);
	if (err) {
		throw new Error('Error loading invoices', { cause: err });
	}

	return { user: data.user, invoices };
};
