<script lang="ts" setup>
  import { validate } from 'uuid';
  import type { z } from 'zod';
  import { clientVoteEventsZod } from '~/shared/client-vote-events.zod';
  import type { serverVoteEventsZod } from '~/shared/server-vote-events.zod';

  const { roomId } = defineProps({
    roomId: { type: String, required: true },
  });

  // protect route
  const isUuid = validate(roomId);
  if (!isUuid) {
    await navigateTo('/');
  }

  // Get relevant variables
  const location = useBrowserLocation();
  const isSecure = location.value.protocol === 'https:';
  const host = location.value.host;

  // Generate Url
  const url = `${
    isSecure ? 'wss://' : 'ws://'
  }${host}/ws/vote?room-id=${roomId}`;

  const users = ref<string[]>();

  // Connect Websocket
  const { status, data, send } = useWebSocket(url);
  watch(data, async () => {
    if (!data.value) {
      return;
    }
    console.log(JSON.parse(await data.value.text()));
    const message = clientVoteEventsZod.parse(
      JSON.parse(await data.value.text())
    );
    if (message.event === 'room-data') {
      const usersArray = Array.from(message.data.users.values());
      users.value = usersArray;
    }
  });

  const nameRef = ref('');

  function handleChangeName() {
    const message: z.infer<typeof serverVoteEventsZod> = {
      event: 'update-name',
      data: {
        name: nameRef.value,
      },
    };
    send(JSON.stringify(message));
  }
</script>

<template>
  <div>
    <div>{{ status }}</div>
    <div v-for="user of users">{{ user }}</div>
    <input
      type="text"
      v-model="nameRef"
    />
    <button @click="handleChangeName">Update Name</button>
  </div>
</template>
