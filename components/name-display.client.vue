<script lang="ts" setup>
  const store = useVoteWsStore();
  const { name } = storeToRefs(store);
</script>

<template>
  <div>{{ name }}</div>
</template>
