import { z } from 'zod';

// biome-ignore lint/nursery/noProcessEnv: <explanation>
const env = process.env;

export const envClient = {
	NODE_ENV: z.enum(['development', 'production', 'test']).parse(env.NODE_ENV),
};
