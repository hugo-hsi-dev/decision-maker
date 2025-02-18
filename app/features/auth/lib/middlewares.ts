import { auth } from '@/features/auth/lib/auth';
import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/start';
import { getWebRequest } from '@tanstack/start/server';
import type { User } from 'better-auth';

export const maybeAuth = createMiddleware().server(async ({ next }) => {
	const request = getWebRequest();
	if (!request) {
		throw new Error('Invalid call, could not get request object');
	}
	const headers = request.headers;
	const session = await auth.api.getSession({ headers });
	if (!session) {
		return next<{ user: User | null }>({ context: { user: null } });
	}
	return next<{ user: User | null }>({ context: { user: session.user } });
});

export const requireAuth = createMiddleware()
	.middleware([maybeAuth])
	.server(({ context, next }) => {
		if (!context.user) {
			throw redirect({ to: '/sign-in' });
		}
		return next({ context: { user: context.user } });
	});

export const noAuth = createMiddleware()
	.middleware([maybeAuth])
	.server(({ context, next }) => {
		if (context.user) {
			throw redirect({ to: '/app' });
		}
		return next({ context: { user: null } });
	});
