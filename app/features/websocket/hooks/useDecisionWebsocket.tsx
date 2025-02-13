import type { ClientSentEventsType } from '@/features/websocket/schemas/client-sent/client-sent-events.type';
import type { ServerSentEventsType } from '@/features/websocket/schemas/server-sent/server-sent-events.type';
import useWebSocket from 'react-use-websocket';

export function useDecisionWebsocket() {
  const url = 'ws://localhost:3000/ws/decision';
  const heartBeatMessage: ClientSentEventsType = {
    type: 'heartbeat',
    payload: {
      message: 'ping',
    },
  };
  const heartBeatReturnMessage: ServerSentEventsType = {
    type: 'heartbeat',
    payload: {
      message: 'pong',
    },
  };
  return useWebSocket(url, {
    heartbeat: {
      message: JSON.stringify(heartBeatMessage),
      returnMessage: JSON.stringify(heartBeatReturnMessage),
    },
    share: true,
  });
}
