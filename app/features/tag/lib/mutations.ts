import { requireAuth } from '@/features/auth/lib/middlewares';
import { tagQueries } from '@/features/tag/lib/queries';
import {
	type CreateTag,
	createTagSchema,
	tag,
} from '@/features/tag/lib/schemas';
import { requireDb } from '@/lib/middlewares';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/start';

const createTag = createServerFn({ method: 'POST' })
	.middleware([requireDb, requireAuth])
	.validator((value: CreateTag) => createTagSchema.parse(value))
	.handler(async ({ context, data }) => {
		const userId = context.user.id;
		const values = { ...data, userId };

		const result = await context.db.insert(tag).values(values).returning();

		return result[0];
	});

export const tagMutations = {
	all: () => ['tag'] as const,
	useCreateTags: () => {
		const queryClient = useQueryClient();
		const key = tagQueries.listing().queryKey;
		return useMutation({
			mutationKey: [...tagMutations.all(), 'create'] as const,
			mutationFn: ({
				title,
			}: {
				title: string;
			}) => createTag({ data: { title } }),
			onMutate: async (values) => {
				await queryClient.cancelQueries({ queryKey: key });

				const previousTags = queryClient.getQueryData(key);

				const newTag = { ...values, id: 0 };

				if (!previousTags) {
					queryClient.setQueryData(key, [newTag]);

					return { previousTags };
				}

				queryClient.setQueryData(key, [...previousTags, newTag]);

				return { previousTags };
			},
			onError: (_err, newTag, context) => {
				if (!context || !context.previousTags) {
					return queryClient.setQueryData(key, []);
				}
				return queryClient.setQueryData(key, context.previousTags);
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: key });
			},
		});
	},
};
