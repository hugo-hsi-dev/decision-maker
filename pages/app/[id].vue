<script lang="ts" setup>
  import { z } from 'zod';
  import WebsocketClient from '~/components/websocket.client.vue';

  const route = useRoute();
  const id = z.string().parse(route.params.id);
</script>

<template>
  <div>
    {{ id }}
    <WebsocketClient :room-id="id" />
  </div>
</template>
