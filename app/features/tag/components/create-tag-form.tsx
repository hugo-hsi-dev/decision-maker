import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { tagMutations } from '@/features/tag/lib/mutations';
import { createTagSchema } from '@/features/tag/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function CreateTagForm() {
	const form = useForm({
		resolver: zodResolver(createTagSchema),
		defaultValues: {
			title: '',
		},
	});

	const { mutate } = tagMutations.useCreateTags();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit((values) => mutate(values))}>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name of category</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>
								What is the name of your new category?
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
