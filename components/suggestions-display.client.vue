<script lang="ts" setup>
  import type { ServerVoteEvents } from '~/shared/schemas/server-vote-events.zod';

  const store = useVoteWsStore();
  const { suggestions } = storeToRefs(store);
  const { removeSuggestion, send } = store;

  function handleRemoveSuggestion(suggestion: string) {
    console.log(suggestion);
    removeSuggestion(suggestion);
    const message: ServerVoteEvents = {
      event: 'delete-suggestion',
      data: {
        suggestion,
      },
    };
    send(JSON.stringify(message));
  }
</script>

<template>
  <div
    class="grid grid-cols-2 gap-6 mt-36"
    v-auto-animate
  >
    <AddSuggestionModal />
    <UCard
      v-for="suggestion in suggestions"
      :key="suggestion"
      :ui="{ body: { base: 'w-full flex justify-between' } }"
    >
      {{ suggestion }}
      <UButton
        icon="i-heroicons-trash"
        size="2xs"
        color="red"
        square
        :ui="{ rounded: 'rounded-full' }"
        variant="ghost"
        @click="() => handleRemoveSuggestion(suggestion)"
      />
    </UCard>
  </div>
</template>
