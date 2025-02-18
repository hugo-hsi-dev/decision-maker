import { requireAuth } from '@/features/auth/lib/middlewares';
import { requireDb } from '@/lib/middlewares';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn, useServerFn } from '@tanstack/start';

const getTagListings = createServerFn({ method: 'GET' })
	.middleware([requireDb, requireAuth])
	.handler(async ({ context }) => {
		const tags = await context.db.query.tag.findMany({
			where: (table, { eq }) => eq(table.userId, context.user.id),
			columns: { id: true, title: true },
		});
		return tags;
	});

export const tagQueries = {
	all: () => ['tag'] as const,
	listing: () =>
		queryOptions({
			queryKey: [...tagQueries.all(), 'listing'] as const,
			queryFn: () => getTagListings(),
		}),
	useListing: () => {
		const serverFn = useServerFn(getTagListings);
		return queryOptions({
			queryKey: [...tagQueries.all(), 'listing'] as const,
			queryFn: () => serverFn(),
		});
	},
};
