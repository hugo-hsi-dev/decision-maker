import { clientSentEventsZod } from '@/features/websocket/schemas/client-sent/client-sent-events.zod';
import type { ServerSentEventsType } from '@/features/websocket/schemas/server-sent/server-sent-events.type';
import { defineEventHandler, defineWebSocket } from '@tanstack/start/server';

export default defineEventHandler({
  handler() {},
  websocket: defineWebSocket({
    open(peer) {
      console.log(peer.id);
      const requestRoomIdMessage: ServerSentEventsType = {
        type: 'request-room-id',
      };
      const requestUserInfoMessage: ServerSentEventsType = {
        type: 'request-user-info',
      };

      peer.send(requestRoomIdMessage);
      peer.send(requestUserInfoMessage);
    },
    async message(peer, msg) {
      try {
        const message = msg.json();
        const { type, payload } = clientSentEventsZod.parse(message);
        if (type === 'heartbeat') {
          console.log('heartbeat');
        }
        if (type === 'response-room-id') {
          console.log('room id: ', payload.roomId);
        }
        if (type === 'response-user-info') {
          console.log('user info: ', payload.name);
        }
      } catch (err) {
        console.error('Invalid message type');
      }
    },
    async close(peer, details) {
      peer.publish('test', `User ${peer} has disconnected!`);
      console.log('close', peer.id, details.reason);
    },
    async error(peer, error) {
      console.log('error', peer.id, error);
    },
  }),
});
