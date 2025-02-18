import { ensureNoAuth } from '@/features/auth/lib/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_no-auth')({
	beforeLoad: async () => {
		await ensureNoAuth();
	},
});
