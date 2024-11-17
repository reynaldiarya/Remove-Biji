import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial().primaryKey(),
	googleId: varchar().notNull().unique(),
	email: varchar().notNull().unique(),
	name: varchar(),
	picture: text()
	// passwordHash: text('password_hash').notNull()
});

export const session = pgTable('sessions', {
	id: text().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp({ withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
