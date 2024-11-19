import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial().primaryKey(),
	googleId: varchar().notNull().unique(),
	email: varchar().notNull().unique(),
	name: varchar(),
	picture: text()
	// passwordHash: text('password_hash').notNull()
});

export const userRelations = relations(user, ({ one, many }) => ({
	creditsAmount: one(credits),
	sessions: many(session),
	invoices: many(invoices)
}));

export const session = pgTable('sessions', {
	id: text().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp({ withTimezone: true, mode: 'date' }).notNull()
});

export const credits = pgTable('credits', {
	id: integer()
		.primaryKey()
		.references(() => user.id),
	amount: integer().notNull().default(5)
});

export const invoices = pgTable('invoices', {
	id: varchar().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => user.id),
	status: varchar().notNull().default('UNPAID'),
	expiredTime: timestamp({ withTimezone: true, mode: 'date' }).notNull(),
	paidAt: timestamp({ withTimezone: true, mode: 'date' }),
	package: integer().notNull(),
	amount: integer().notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect & {
	creditsAmount: number | null;
};
