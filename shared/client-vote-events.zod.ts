import { z } from 'zod';

export const clientVoteEvents = ['room-data'] as const;

export const clientVoteEventsZod = z.discriminatedUnion('event', [
  z.object({
    event: z.literal('room-data' satisfies (typeof clientVoteEvents)[number]),
    data: z.object({
      users: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),
  }),
]);
