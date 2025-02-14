import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFound } from '@/components/NotFound';
import Devtools from '@/components/devtools';
import { seo } from '@/lib/seo';
import appCss from '@/styles/app.css?url';
import type { QueryClient } from '@tanstack/react-query';
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from '@tanstack/react-router';

import { Meta, Scripts } from '@tanstack/start';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title:
					'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
				description:
					'TanStack Start is a type-safe, client-first, full-stack React framework. ',
			}),
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<Meta />
			</head>
			<body>
				<div className='flex gap-2 p-2 text-lg'>
					<Link
						to='/'
						activeProps={{
							className: 'font-bold',
						}}
						activeOptions={{ exact: true }}
					>
						Home
					</Link>
				</div>
				<hr />
				{children}
				<Devtools />
				<Scripts />
			</body>
		</html>
	);
}
