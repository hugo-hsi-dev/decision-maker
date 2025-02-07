import { z } from 'zod';
import { nameZod } from '~/shared/schemas/name.zod';
import { suggestionZod } from '~/shared/schemas/suggestion.zod';
import { eventLiteralZod } from '~/shared/schemas/vote-events.config';

export const serverVoteEventsZod = z.discriminatedUnion('event', [
  z.object({
    event: eventLiteralZod('update-name'),
    data: z.object({
      name: nameZod,
    }),
  }),
  z.object({
    event: eventLiteralZod('add-suggestion'),
    data: z.object({
      suggestion: suggestionZod,
    }),
  }),
  z.object({
    event: eventLiteralZod('delete-suggestion'),
    data: z.object({
      suggestion: suggestionZod,
    }),
  }),
  z.object({
    event: eventLiteralZod('cast-vote'),
    data: z.object({
      title: z.string(),
    }),
  }),
  z.object({
    event: eventLiteralZod('generate-results'),
    data: z.object({}),
  }),
]);

export type ServerVoteEvents = z.infer<typeof serverVoteEventsZod>;
