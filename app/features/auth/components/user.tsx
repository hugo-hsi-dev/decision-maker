import { authQueries } from '@/features/auth/lib/queries';
import { useQuery } from '@tanstack/react-query';

export default function User() {
	const query = authQueries.useDetail();
	const { data } = useQuery(query);
	return <div>{data?.name}</div>;
}
