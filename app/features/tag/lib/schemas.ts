import { user } from '@/features/auth/lib/schemas';
import { tagToChoice } from '@/lib/many-to-many-relations';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const tag = pgTable('tag', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: text()
		.notNull()
		.references(() => user.id),
	title: text().notNull(),
});

export const tagRelations = relations(tag, ({ one, many }) => ({
	user: one(user, { fields: [tag.userId], references: [user.id] }),
	choices: many(tagToChoice),
}));

export const createTagSchema = createInsertSchema(tag, {
	title: (s) => s.min(1).max(64),
}).omit({ userId: true });

export type CreateTag = z.infer<typeof createTagSchema>;
