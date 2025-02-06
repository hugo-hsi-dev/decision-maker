import { z } from 'zod';
import type { clientVoteEventsZod } from '~/shared/client-vote-events.zod';
import { serverVoteEventsZod } from '~/shared/server-vote-events.zod';

type RoomData = {
  users: Map<string, string>;
  suggestions: Set<string>;
};

const rooms = new Map<string, RoomData>();

export default defineWebSocketHandler({
  open(peer) {
    try {
      const url = new URL(peer.request.url);
      const roomId = z.string().parse(url.searchParams.get('room-id'));

      peer.subscribe(roomId);

      const roomExists = rooms.has(roomId);
      if (!roomExists) {
        rooms.set(roomId, {
          users: new Map<string, string>(),
          suggestions: new Set(),
        });
      }

      const roomData = rooms.get(roomId)!;

      const userExists = roomData.users.has(peer.id);

      if (!userExists) {
        roomData.users.set(peer.id, 'Anonymous');
      }

      const message: z.infer<typeof clientVoteEventsZod> = {
        event: 'room-data',
        data: {
          users: Array.from(roomData!.users.values()),
          suggestions: Array.from(roomData!.suggestions),
        },
      };
      peer.send(message);
      peer.publish(roomId, message);
    } catch (err) {
      console.error(err);
    }
  },
  message(peer, message) {
    try {
      const { event, data } = serverVoteEventsZod.parse(
        JSON.parse(message.text())
      );

      const url = new URL(peer.request.url);
      const roomId = z.string().parse(url.searchParams.get('room-id'));
      const roomData = rooms.get(roomId);
      if (!roomData) {
        throw new Error('Cannot find room');
      }
      if (event === 'update-name') {
        roomData.users.set(peer.id, data.name);
      }

      const response: z.infer<typeof clientVoteEventsZod> = {
        event: 'room-data',
        data: {
          users: Array.from(roomData!.users.values()),
          suggestions: Array.from(roomData!.suggestions),
        },
      };
      peer.send(response);
      peer.publish(roomId, response);
    } catch (err) {
      console.error(err);
    }
  },
  close(peer) {
    peer.publish('chat', { user: 'server', message: `${peer} left!` });
  },
});
