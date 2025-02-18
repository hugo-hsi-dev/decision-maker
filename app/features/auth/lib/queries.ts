import { requireAuth } from '@/features/auth/lib/middlewares';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn, useServerFn } from '@tanstack/start';

const getAuth = createServerFn({ method: 'GET' })
	.middleware([requireAuth])
	.handler(async ({ context }) => {
		return context.user;
	});

export const authQueries = {
	all: () => ['auth'] as const,
	detail: () =>
		queryOptions({
			queryKey: [...authQueries.all(), 'detail'],
			queryFn: () => getAuth(),
		}),
	useDetail: () => {
		const serverFn = useServerFn(getAuth);
		return queryOptions({
			queryKey: [...authQueries.all(), 'detail'],
			queryFn: () => serverFn(),
		});
	},
};
