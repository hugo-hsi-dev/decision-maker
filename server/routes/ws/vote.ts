import { z } from 'zod';
import type {
  ClientVoteEvents,
  clientVoteEventsZod,
} from '~/shared/schemas/client-vote-events.zod';
import { serverVoteEventsZod } from '~/shared/schemas/server-vote-events.zod';
import arrayFromSet from '~/utils/array-from-set';
import nameFromUrl from '~/utils/name-from-url.ts';
import roomIdFromUrl from '~/utils/room-id-from-url';
import usersWithoutSelf from '~/utils/users-without-self.ts';

type RoomData = {
  users: Map<string, string>;
  suggestions: Set<string>;
  votes: Map<string, string>;
};

const rooms = new Map<string, RoomData>();

function generateRoomResponse(roomData: RoomData, userId: string) {}

export default defineWebSocketHandler({
  open(peer) {
    const url = peer.request.url;
    try {
      const roomId = roomIdFromUrl(url);
      const name = nameFromUrl(url);
      console.log(name);
      peer.subscribe(roomId);

      const roomExists = rooms.has(roomId);
      if (!roomExists) {
        rooms.set(roomId, {
          users: new Map(),
          suggestions: new Set(),
          votes: new Map(),
        });
      }

      const roomData = rooms.get(roomId)!;

      roomData.users.set(peer.id, name);
      console.log(roomData.users, peer.id);

      const vote = roomData.votes.get(peer.id);

      const users = usersWithoutSelf(roomData.users, peer.id);

      const suggestions = arrayFromSet(roomData.suggestions);

      const response: z.infer<typeof clientVoteEventsZod> = {
        event: 'self-join-room',
        data: {
          users,
          suggestions,
          vote,
        },
      };

      peer.send(response);

      peer.peers.forEach((peer) => {
        const users = usersWithoutSelf(roomData.users, peer.id);
        const response: z.infer<typeof clientVoteEventsZod> = {
          event: 'other-join-room',
          data: {
            users,
          },
        };
        peer.send(response);
      });
    } catch (err) {
      console.error(err);
    }
  },
  message(peer, message) {
    try {
      const text = message.text();
      if (text === 'ping') {
        peer.send('pong');
        return;
      }

      console.log(text);
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
        console.log(peer.id);
        roomData.users.set(peer.id, data.name);
        peer.peers.forEach((peer) => {
          const users = usersWithoutSelf(roomData.users, peer.id);
          const response: ClientVoteEvents = {
            event: 'update-name',
            data: {
              users,
            },
          };
          peer.send(response);
        });
        return;
      }

      if (event === 'add-suggestion') {
        roomData.suggestions.add(data.suggestion);
        const response: ClientVoteEvents = {
          event: 'add-suggestion',
          data: { suggestions: arrayFromSet(roomData.suggestions) },
        };
        peer.publish(roomId, response);
      }
      if (event === 'delete-suggestion') {
        roomData.suggestions.delete(data.suggestion);

        const response: ClientVoteEvents = {
          event: 'delete-suggestion',
          data: { suggestion: arrayFromSet(roomData.suggestions) },
        };

        peer.publish(roomId, response);
      }
      if (event === 'cast-vote') {
        roomData.votes.set(peer.id, data.title);
        const response = generateRoomResponse(roomData, peer.id);
        peer.send(response);
        return;
      }

      if (event === 'generate-results') {
        const frequency = new Map<string, number>();

        roomData.votes.forEach((vote) => {
          frequency.set(vote, (frequency.get(vote) ?? 0) + 1);
        });
        let result: string;
        let mostFrequent: string[] = [];
        let max = 0;
        frequency.forEach((frequency, key) => {
          if (frequency > max) {
            max = frequency;
            mostFrequent = [key];
          } else if (frequency === max) {
            mostFrequent.push(key);
          }
        });
        if (mostFrequent.length === 1) {
          result = mostFrequent[0];
        } else {
          result =
            mostFrequent[Math.floor(Math.random() * mostFrequent.length)];
        }
        // const response: z.infer<typeof clientVoteEventsZod> = {
        //   event: 'result',
        //   data: {
        //     result,
        //   },
        // };
        // peer.send(response);
        // peer.publish(roomId, response);
        return;
      }

      // const response = generateRoomResponse(roomData, peer.id);
      // console.log(response);
      // peer.send(response);
      // peer.publish(roomId, response);
    } catch (err) {
      console.error(err);
    }
  },
  close(peer) {
    console.log('close');
    try {
      const roomId = roomIdFromUrl(peer.request.url);
      const roomData = rooms.get(roomId);
      if (!roomData) {
        throw new Error('Invalid room Id');
      }
      roomData.users.delete(peer.id);

      peer.peers.forEach((peer) => {
        const users = usersWithoutSelf(roomData.users, peer.id);
        const response: ClientVoteEvents = {
          event: 'leave-room',
          data: {
            users,
          },
        };
        peer.send(response);
      });
      return;
    } catch (err) {
      console.error(err);
    }
  },
});
