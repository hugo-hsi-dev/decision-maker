import AppSidebar from '@/components/app-sidebar';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { tagQueries } from '@/features/tag/lib/queries';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_require-auth/app')({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(tagQueries.listing());
	},
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main>
					<SidebarTrigger />
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
