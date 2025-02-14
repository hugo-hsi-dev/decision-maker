import z from 'zod';
export const env = z
	.object({
		NODE_ENV: z.enum(['development', 'production', 'test']),
	})
	// biome-ignore lint/nursery/noProcessEnv: Only place you can use process.env, else use exported env object above
	.parse(process.env);
