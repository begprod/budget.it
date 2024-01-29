<template>
  <form class="relative" @submit.prevent="submitHandler">
    <slot name="input" />

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
