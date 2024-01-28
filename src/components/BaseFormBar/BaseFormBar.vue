<template>
  <form class="relative overflow-hidden" @submit.prevent="submitHandler">
    <div class="w-full">
      <slot name="input" />
    </div>

    <div class="absolute top-0 right-0">
      <slot name="button" />
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['submit']);

const submitHandler = () => {
  emit('submit');
};
</script>
