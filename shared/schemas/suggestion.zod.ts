import { z } from 'zod';

export const suggestionZod = z.string().min(1).max(64);

export type Suggestion = z.infer<typeof suggestionZod>;
