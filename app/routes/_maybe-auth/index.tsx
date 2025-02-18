import User from '@/features/auth/components/user';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_maybe-auth/')({
	component: Home,
});

function Home() {
	return (
		<div className='p-2'>
			<h3>Welcome Home!!!</h3>
			<User />
		</div>
	);
}
