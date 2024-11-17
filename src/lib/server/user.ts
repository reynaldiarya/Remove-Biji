import { eq } from 'drizzle-orm';
import { db } from './db';
import * as table from './db/schema';

export async function createUser(googleId: string, email: string, name: string, picture: string) {
	const row = await db
		.insert(table.user)
		.values({
			googleId,
			email,
			name,
			picture
		})
		.returning();

	const user = row.at(0);
	if (!user) {
		throw new Error('Failed to create user');
	}

	return user;
}

export async function getUserFromGoogleId(googleId: string) {
	const row = await db.select().from(table.user).where(eq(table.user.googleId, googleId));
	const user = row.at(0);

	if (!user) {
		return null;
	}

	return user;
}
