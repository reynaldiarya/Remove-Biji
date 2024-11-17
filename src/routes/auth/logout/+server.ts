import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';

export const GET: RequestHandler = async (event) => {
	const { locals } = event;

	if (!locals.session) {
		return error(401);
	}
	await invalidateSession(locals.session.id);
	deleteSessionTokenCookie(event);

	return redirect(302, '/');
};
