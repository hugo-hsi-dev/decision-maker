<script lang="ts" setup>
  import { validate } from 'uuid';
  import { z } from 'zod';

  const route = useRoute();
  const location = useBrowserLocation();

  const store = useVoteWsStore();
  const { name: storedName } = storeToRefs(store);

  const { changeUrl } = store;

  // Get room id
  const id = computed(() => {
    const parsedId = z.string().safeParse(route.params.id);
    if (!parsedId.success || !validate(parsedId.data)) {
      return null;
    }
    return parsedId.data;
  });

  // Redirect if invalid room id
  watchEffect(() => {
    if (!id.value) {
      navigateTo('/');
    }
  });

  watch(
    [location, id],
    () => {
      const protocol =
        location.value.protocol === 'https:' ? 'wss://' : 'ws://';
      const host = location.value.host;
      const path = '/ws/vote';
      const roomId = `?room-id=${id.value}`;

      const name = `&name=${storedName.value}`;
      const url = `${protocol}${host}${path}${roomId}${name}`;
      changeUrl(url);
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <UContainer>
      <UContainer class="fixed top-6 left-0 right-0 z-10">
        <UsersDisplay />
      </UContainer>
      <SuggestionsDisplay />
    </UContainer>
  </div>
</template>
