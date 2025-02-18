import { noAuth, requireAuth } from '@/features/auth/lib/middlewares';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn, useServerFn } from '@tanstack/start';

export const ensureNoAuth = createServerFn({ method: 'GET' })
	.middleware([noAuth])
	.handler(() => {
		return null;
	});

export const getRequireAuth = createServerFn({ method: 'GET' })
	.middleware([requireAuth])
	.handler(async ({ context }) => {
		return context.user;
	});

export const authQueries = {
	all: () => ['auth'] as const,
	required: () =>
		queryOptions({
			queryKey: [...authQueries.all(), 'require'],
			queryFn: () => getRequireAuth(),
		}),
	useRequired: () => {
		const serverFn = useServerFn(getRequireAuth);
		return queryOptions({
			queryKey: [...authQueries.all(), 'require'],
			queryFn: () => serverFn(),
		});
	},
};
