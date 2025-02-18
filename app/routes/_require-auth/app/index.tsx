import CreateTagForm from '@/features/tag/components/create-tag-form';
import ListTags from '@/features/tag/components/list-tags';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_require-auth/app/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<CreateTagForm />
			<ListTags />
		</div>
	);
}
