import { serverSentEventLiteral } from '@/features/websocket/schemas/server-sent/server-sent-event-literal.zod';
import z from 'zod';

export const serverSentEventsZod = z.discriminatedUnion('type', [
  z.object({
    type: serverSentEventLiteral('heartbeat'),
    payload: z.object({
      message: z.literal('pong'),
    }),
  }),
  z.object({
    type: serverSentEventLiteral('request-room-id'),
  }),
  z.object({
    type: serverSentEventLiteral('request-user-info'),
  }),
]);
