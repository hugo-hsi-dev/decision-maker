import { z } from 'zod';

export const roomIdZod = z.string().nanoid();
