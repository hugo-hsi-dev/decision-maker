import { z } from 'zod';

export const voteEventsConfig = [
  'join-room',
  'leave-room',
  'update-name',
  'add-suggestion',
  'delete-suggestion',
  'cast-vote',
  'generate-results',
] as const;

export type VoteEvents = (typeof voteEventsConfig)[number];

export function eventLiteralZod<T extends VoteEvents>(eventName: T) {
  return z.literal(eventName);
}
