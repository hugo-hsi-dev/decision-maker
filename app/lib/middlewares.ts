import { db } from '@/lib/db';
import { createMiddleware } from '@tanstack/start';

export const requireDb = createMiddleware().server(({ next }) => {
	return next({
		context: {
			db,
		},
	});
});
