import { authClient } from '@/features/auth/lib/auth-client';
import { Button } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Button
			onClick={() => {
				// console.log('clicked');
				authClient.signIn.social({ provider: 'google' });
			}}
			type='button'
		>
			Google
		</Button>
	);
}
