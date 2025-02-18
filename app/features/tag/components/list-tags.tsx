import { tagQueries } from '@/features/tag/lib/queries';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ListTags() {
	const tagOptions = tagQueries.useListing();
	const { data } = useSuspenseQuery(tagOptions);

	return (
		<div>
			{data.map((tag) => (
				<div key={tag.id}>{tag.title}</div>
			))}
		</div>
	);
}
