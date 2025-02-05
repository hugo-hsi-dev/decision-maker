<script lang="ts" setup>
  const location = useBrowserLocation();
  const isSecure = location.value.protocol === 'https:';
  const host = location.value.host;
  const url = `${isSecure ? 'wss://' : 'ws://'}${host}/_ws`;
  const { status, data, send } = useWebSocket(url);
  const history = ref<string[]>([]);
  watch(data, async () => {
    const text = await data.value.text();
    console.log(text);
    history.value.push(JSON.parse(text).message);
  });
</script>

<template>
  <div>{{ status }}</div>

  <div v-for="message in history">{{ message }}</div>
  <button v-on:click="send('Hello World')">test</button>
</template>
