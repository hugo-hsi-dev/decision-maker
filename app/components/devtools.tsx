import { envClient } from '@/lib/env-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy } from 'react';

export const TanStackRouterDevtools =
	envClient.NODE_ENV === 'production'
		? () => null // Render nothing in production
		: lazy(() =>
				// Lazy load in development
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
			);

export default function Devtools() {
	return (
		<>
			<Suspense>
				<TanStackRouterDevtools position='bottom-right' />
			</Suspense>
			<ReactQueryDevtools buttonPosition='bottom-left' />
		</>
	);
}
