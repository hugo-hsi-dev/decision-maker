import TestComponent from '@/components/test-component';
import RoomCodeForm from '@/features/websocket/components/room-code.form';
import { useDecisionHandler } from '@/features/websocket/hooks/useDecisionHandler';

import { roomIdZod } from '@/features/websocket/schemas/room-id.zod';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const searchZod = z.object({
  roomId: roomIdZod.optional(),
});

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
  validateSearch: (search) => searchZod.parse(search),
  ssr: false,
});

function RouteComponent() {
  const { roomId } = Route.useSearch();
  const { readyState } = useDecisionHandler();

  if (!roomId) {
    return (
      <div>
        <RoomCodeForm />
      </div>
    );
  }

  return (
    <div>
      <h1>Websocket messages</h1>
      <TestComponent />
    </div>
  );
}
