import { z } from 'zod';

export default function roomIdFromUrl(stringUrl: string) {
  const url = new URL(stringUrl);
  return z.string().parse(url.searchParams.get('room-id'));
}
