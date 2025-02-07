import { z } from 'zod';

export default function nameFromUrl(stringUrl: string) {
  const url = new URL(stringUrl);
  return z.string().parse(url.searchParams.get('name'));
}
