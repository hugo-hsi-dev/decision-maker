import { nameZod } from '@/features/user/schemas/name.zod';
import { clientSentEventLiteral } from '@/features/websocket/schemas/client-sent/client-sent-event-literal.zod';
import { z } from 'zod';

export const clientSentEventsZod = z.discriminatedUnion('type', [
  z.object({
    type: clientSentEventLiteral('heartbeat'),
    payload: z.object({
      message: z.literal('ping'),
    }),
  }),
  z.object({
    type: clientSentEventLiteral('response-room-id'),
    payload: z.object({
      roomId: z.string().nanoid(),
    }),
  }),
  z.object({
    type: clientSentEventLiteral('response-user-info'),
    payload: z.object({
      name: nameZod,
    }),
  }),
]);
