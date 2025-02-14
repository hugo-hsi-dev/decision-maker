import { Button } from '@/components/ui/button';
import { authClient } from '@/features/auth/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Home,
});

function Home() {
	return (
		<div className='p-2'>
			<h3>Welcome Home!!!</h3>
			<Button
				onClick={() => {
					// console.log('clicked');
					authClient.signIn.social({ provider: 'google' });
				}}
				type='button'
			>
				Google
			</Button>
		</div>
	);
}
