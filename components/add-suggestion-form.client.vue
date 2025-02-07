<script lang="ts" setup>
  import type { FormSubmitEvent } from '#ui/types';
  import { z } from 'zod';
  import type { ServerVoteEvents } from '~/shared/schemas/server-vote-events.zod';
  import { suggestionZod } from '~/shared/schemas/suggestion.zod';

  const emit = defineEmits(['onSubmit']);

  const { send, addSuggestion } = useVoteWsStore();
  const schema = z.object({
    suggestion: suggestionZod,
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Schema>({
    suggestion: '',
  });

  function onSubmit(event: FormSubmitEvent<Schema>) {
    const message: ServerVoteEvents = {
      event: 'add-suggestion',
      data: event.data,
    };
    send(JSON.stringify(message));
    addSuggestion(event.data.suggestion);
    emit('onSubmit');
  }
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="space-y-4"
  >
    <UFormGroup
      label="New Suggestion"
      name="suggestion"
    >
      <UInput v-model="state.suggestion" />
    </UFormGroup>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
