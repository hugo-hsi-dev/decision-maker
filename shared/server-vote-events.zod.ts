import { z } from 'zod';

export const serverVoteEvents = [
  'update-name',
  'add-suggestion',
  'delete-suggestion',
  'cast-vote',
  'revoke-vote',
  'generate-results',
] as const;

export const serverVoteEventsZod = z.discriminatedUnion('event', [
  z.object({
    event: z.literal('update-name' satisfies (typeof serverVoteEvents)[number]),
    data: z.object({
      name: z.string(),
    }),
  }),
  z.object({
    event: z.literal(
      'add-suggestion' satisfies (typeof serverVoteEvents)[number]
    ),
    data: z.object({
      title: z.string(),
    }),
  }),
  z.object({
    event: z.literal(
      'delete-suggestion' satisfies (typeof serverVoteEvents)[number]
    ),
    data: z.object({
      id: z.string(),
    }),
  }),
]);
