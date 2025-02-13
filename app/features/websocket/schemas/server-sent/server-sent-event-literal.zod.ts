import type { serverSentEventsConfig } from '@/features/websocket/schemas/server-sent/server-sent-events.config';
import { z } from 'zod';

export function serverSentEventLiteral<
  T extends (typeof serverSentEventsConfig)[number],
>(eventType: T) {
  return z.literal(eventType);
}
