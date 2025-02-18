import { choice } from '@/features/choice/lib/schemas';
import { tag } from '@/features/tag/lib/schemas';
import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';

export const tagToChoice = pgTable(
	'tag_to_choice',
	{
		tagId: integer()
			.notNull()
			.references(() => tag.id),
		choiceId: integer()
			.notNull()
			.references(() => choice.id),
	},
	(t) => [primaryKey({ columns: [t.tagId, t.choiceId] })],
);

export const tagToChoiceRelations = relations(tagToChoice, ({ one }) => ({
	tag: one(tag, {
		fields: [tagToChoice.tagId],
		references: [tag.id],
	}),
	choice: one(choice, {
		fields: [tagToChoice.choiceId],
		references: [choice.id],
	}),
}));
