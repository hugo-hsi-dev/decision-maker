import { authQueries } from '@/features/auth/lib/queries';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_require-auth')({
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(authQueries.required());
	},
});
