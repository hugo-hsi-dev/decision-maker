import { env } from '@/lib/env';

import * as authSchemas from '@/features/auth/lib/schemas';
import * as choiceSchemas from '@/features/choice/lib/schemas';
import * as tagSchemas from '@/features/tag/lib/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';

const schema = { ...authSchemas, ...tagSchemas, ...choiceSchemas };

export const db = drizzle(env.DATABASE_URL, { schema });
