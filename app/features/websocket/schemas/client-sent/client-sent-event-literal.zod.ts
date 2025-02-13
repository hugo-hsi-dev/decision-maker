import type { clientSentEventsConfig } from '@/features/websocket/schemas/client-sent/client-sent-events.config';
import { z } from 'zod';

export function clientSentEventLiteral<
  T extends (typeof clientSentEventsConfig)[number],
>(eventType: T) {
  return z.literal(eventType);
}
