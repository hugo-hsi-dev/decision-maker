import { Button } from '@/components/ui/button';
import { useDecisionWebsocket } from '@/features/websocket/hooks/useDecisionWebsocket';
import type { ClientSentEventsType } from '@/features/websocket/schemas/client-sent/client-sent-events.type';

export default function TestComponent() {
  const { sendJsonMessage } = useDecisionWebsocket();
  const message: ClientSentEventsType = {
    type: 'heartbeat',
    payload: {
      message: 'ping',
    },
  };
  return (
    <div>
      <Button onClick={() => sendJsonMessage(message)}>Submit</Button>
    </div>
  );
}
