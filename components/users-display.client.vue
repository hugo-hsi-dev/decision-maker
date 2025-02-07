<script lang="ts" setup>
  const store = useVoteWsStore();
  const { users, name } = storeToRefs(store);
  const {} = store;

  const showUsers = ref(false);

  function toggleShowUsers() {
    showUsers.value = !showUsers.value;
  }
</script>

<template>
  <UCard
    :ui="{
      body: { padding: 'p-0 sm:p-0' },
      divide: showUsers ? undefined : 'divide-y-0',
    }"
  >
    <template #header>
      <div>You</div>
      <div class="flex justify-between items-end">
        <div class="text-2xl font-bold flex items-end gap-2">
          {{ name }}
          <ChangeNameModal />
        </div>
        <UButton
          icon="i-heroicons-chevron-down"
          size="2xs"
          color="primary"
          square
          :ui="{ rounded: 'rounded-full' }"
          variant="ghost"
          @click="toggleShowUsers"
        />
      </div>
    </template>
    <div v-auto-animate>
      <ul
        v-if="showUsers"
        v-auto-animate
        class="px-4 py-5 sm:p-6"
      >
        <li
          v-for="user in users"
          :key="user"
        >
          {{ user }}
        </li>
      </ul>
    </div>
  </UCard>
</template>
