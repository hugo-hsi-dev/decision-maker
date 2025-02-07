import { z } from 'zod';
import { nameZod } from '~/shared/schemas/name.zod';
import { suggestionZod } from '~/shared/schemas/suggestion.zod';
import { eventLiteralZod } from '~/shared/schemas/vote-events.config';

export const clientVoteEventsZod = z.discriminatedUnion('event', [
  z.object({
    event: eventLiteralZod('join-room'),
    data: z.object({
      name: nameZod,
      users: nameZod.array(),
      suggestions: suggestionZod.array(),
      vote: suggestionZod.optional(),
    }),
  }),
  z.object({
    event: eventLiteralZod('update-name'),
    data: z.object({ users: nameZod.array() }),
  }),
  z.object({
    event: eventLiteralZod('add-suggestion'),
    data: z.object({
      suggestions: suggestionZod.array(),
    }),
  }),
  z.object({
    event: eventLiteralZod('delete-suggestion'),
    data: z.object({
      suggestion: suggestionZod.array(),
    }),
  }),
  z.object({
    event: eventLiteralZod('leave-room'),
    data: z.object({ users: nameZod.array() }),
  }),
]);

export type ClientVoteEvents = z.infer<typeof clientVoteEventsZod>;
