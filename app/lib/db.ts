import { env } from '@/lib/env';

import * as authSchemas from '@/features/auth/lib/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';

const schema = { ...authSchemas };

export const db = drizzle(env.DATABASE_URL, { schema });
