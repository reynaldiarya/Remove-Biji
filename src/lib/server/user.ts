import { withCatch } from '@tfkhdyt/with-catch';
import { eq } from 'drizzle-orm';
import { db } from './db';
import * as table from './db/schema';

export async function createUser(googleId: string, email: string, name: string, picture: string) {
	const [user] = await db
		.insert(table.user)
		.values({
			googleId,
			email,
			name,
			picture
		})
		.returning();
	if (!user) {
		throw new Error('Failed to create user');
	}

	const [err] = await withCatch(db.insert(table.credits).values({ id: user.id, amount: 5 }));
	if (err) {
		throw new Error('Failed to create credits', { cause: err });
	}

	return user;
}

export async function getUserFromGoogleId(googleId: string) {
	const [user] = await db.select().from(table.user).where(eq(table.user.googleId, googleId));
	if (!user) {
		return null;
	}

	return user;
}
