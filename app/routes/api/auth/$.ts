import { auth } from '@/features/auth/lib/auth';
import { createAPIFileRoute } from '@tanstack/start/api';

export const APIRoute = createAPIFileRoute('/api/auth/$')({
	GET: ({ request }) => {
		console.log('auth-get');
		return auth.handler(request);
	},
	POST: ({ request }) => {
		console.log('auth-post');
		return auth.handler(request);
	},
});
