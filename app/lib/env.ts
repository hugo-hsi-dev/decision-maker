import z from 'zod';

export const env = z
	.object({
		NODE_ENV: z.enum(['development', 'production', 'test']),
		DATABASE_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		// BETTER_AUTH_SECRET: z.string(),
		// BETTER_AUTH_URL: z.string().url(),
	})
	// biome-ignore lint/nursery/noProcessEnv: Only place you can use process.env, else use exported env object above
	.parse(process.env);
