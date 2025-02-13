import type { clientSentEventsZod } from '@/features/websocket/schemas/client-sent/client-sent-events.zod';
import type { z } from 'zod';

export type ClientSentEventsType = z.infer<typeof clientSentEventsZod>;
