<script lang="ts" setup>
  import { ChangeNameForm } from '#components';

  const isOpen = ref(false);

  function closeModal() {
    isOpen.value = false;
  }
</script>

<template>
  <div>
    <UButton
      icon="i-heroicons-pencil-square"
      size="2xs"
      color="primary"
      square
      variant="ghost"
      @click="isOpen = true"
    />
    <UModal v-model="isOpen">
      <UCard>
        <template #header> What's your new name? </template>

        <ChangeNameForm @on-submit="closeModal" />
      </UCard>
    </UModal>
  </div>
</template>
