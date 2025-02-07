import { z } from 'zod';

export const nameZod = z.string().min(1).max(25);

export type Name = z.infer<typeof nameZod>;
