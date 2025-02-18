import { user } from '@/features/auth/lib/schemas';
import { tagToChoice } from '@/lib/many-to-many-relations';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const choice = pgTable('choice', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: text()
		.notNull()
		.references(() => user.id),
});

export const choiceRelations = relations(choice, ({ one, many }) => ({
	user: one(user, { fields: [choice.userId], references: [user.id] }),
	tags: many(tagToChoice),
}));
