<script lang="ts" setup>
  const isOpen = ref(false);

  function closeModal() {
    isOpen.value = false;
  }
</script>

<template>
  <div>
    <UButton
      icon="i-heroicons-plus"
      color="primary"
      class="w-full h-[64px] sm:h-[72px] justify-center"
      @click="isOpen = true"
    />
    <UModal v-model="isOpen">
      <UCard>
        <template #header>Add a suggestion</template>

        <AddSuggestionForm @on-submit="closeModal" />
      </UCard>
    </UModal>
  </div>
</template>
