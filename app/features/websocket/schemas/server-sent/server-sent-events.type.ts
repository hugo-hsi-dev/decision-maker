import type { serverSentEventsZod } from '@/features/websocket/schemas/server-sent/server-sent-events.zod';
import type { z } from 'zod';

export type ServerSentEventsType = z.infer<typeof serverSentEventsZod>;
