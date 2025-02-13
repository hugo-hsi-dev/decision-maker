import { useDecisionWebsocket } from '@/features/websocket/hooks/useDecisionWebsocket';
import type { ClientSentEventsType } from '@/features/websocket/schemas/client-sent/client-sent-events.type';
import { serverSentEventsZod } from '@/features/websocket/schemas/server-sent/server-sent-events.zod';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const routeApi = getRouteApi('/app/');

export function useDecisionHandler() {
  const hook = useDecisionWebsocket();
  const { roomId } = routeApi.useSearch();
  const { lastJsonMessage, sendJsonMessage } = hook;
  const [name] = useLocalStorage<string>('name', '');

  useEffect(() => {
    const result = serverSentEventsZod.safeParse(lastJsonMessage);

    if (!result.success) {
      return;
    }

    if (!roomId) {
      throw new Error('roomId must be defined here');
    }

    const { type } = result.data;

    if (type === 'request-room-id') {
      const message: ClientSentEventsType = {
        type: 'response-room-id',
        payload: { roomId },
      };
      sendJsonMessage(message);
    }

    if (type === 'request-user-info') {
      const message: ClientSentEventsType = {
        type: 'response-user-info',
        payload: { name },
      };
      sendJsonMessage(message);
    }
  }, [lastJsonMessage]);

  return hook;
}
