<script lang="ts" setup>
  import type { FormSubmitEvent } from '#ui/types';
  import { z } from 'zod';
  import { nameZod } from '~/shared/schemas/name.zod';
  import type { ServerVoteEvents } from '~/shared/schemas/server-vote-events.zod';

  const emit = defineEmits(['onSubmit']);

  const { send, changeName } = useVoteWsStore();
  const schema = z.object({
    name: nameZod,
  });

  type Schema = z.output<typeof schema>;

  const state = reactive<Schema>({
    name: '',
  });

  function onSubmit(event: FormSubmitEvent<Schema>) {
    const message: ServerVoteEvents = {
      event: 'update-name',
      data: event.data,
    };
    send(JSON.stringify(message));
    changeName(event.data.name);
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
      label="New Name"
      name="name"
    >
      <UInput v-model="state.name" />
    </UFormGroup>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
