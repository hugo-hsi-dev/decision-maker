import { env } from '@/lib/env';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: [
		'./app/features/**/lib/schemas.ts',
		'./app/lib/many-to-many-relations.ts',
	],
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
