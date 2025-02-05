<script setup lang="ts">
  import WebsocketClient from '~/components/websocket.client.vue';

  const route = useRoute();
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <WebsocketClient />
    <p>Current route: {{ route.path }}</p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
      >Learn more about Nuxt Routing</a
    >
  </div>
</template>
