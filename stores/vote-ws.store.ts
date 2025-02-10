import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { clientVoteEventsZod } from '~/shared/schemas/client-vote-events.zod';
import type { Name } from '~/shared/schemas/name.zod';
import type { Suggestion } from '~/shared/schemas/suggestion.zod';

export const useVoteWsStore = defineStore('vote-ws', () => {
  const url = ref('');
  const name = useStorage('name', 'Anonymous');
  const users = ref<Name[]>([]);
  const suggestions = ref<Suggestion[]>([]);

  const { data, ...socket } = useWebSocket(url, {
    immediate: false,
    heartbeat: true,
  });

  function changeUrl(newUrl: string) {
    url.value = newUrl;
  }

  function changeName(newName: string) {
    name.value = newName;
  }

  function addSuggestion(newSuggestion: string) {
    if (suggestions.value.includes(newSuggestion)) {
      return;
    }
    suggestions.value.push(newSuggestion);
  }

  function removeSuggestion(remove: string) {
    suggestions.value = suggestions.value.filter(
      (suggestion) => suggestion !== remove
    );
  }

  watch(
    data,
    async (value) => {
      if (!value || value === 'pong') {
        return;
      }

      const text = await value.text();

      const message = clientVoteEventsZod.safeParse(JSON.parse(text));
      if (!message.success) {
        console.error('Message from server invalid');
        return;
      }
      const { event, data: messageData } = message.data;

      if (event === 'self-join-room') {
        users.value = messageData.users;
        suggestions.value = messageData.suggestions;
      }

      if (event === 'other-join-room') {
        users.value = messageData.users;
      }

      if (event === 'update-name') {
        users.value = messageData.users;
      }

      if (event === 'add-suggestion') {
        suggestions.value = messageData.suggestions;
      }

      if (event === 'delete-suggestion') {
        suggestions.value = messageData.suggestion;
      }

      if (event === 'leave-room') {
        users.value = messageData.users;
      }
    },
    { immediate: false }
  );
  return {
    ...socket,
    name,
    url,
    users,
    suggestions,
    changeUrl,
    changeName,
    addSuggestion,
    removeSuggestion,
  };
});
