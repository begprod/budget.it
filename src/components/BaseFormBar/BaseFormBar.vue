<template>
  <form class="form-bar" @submit.prevent="submitHandler">
    <slot name="input" />

    <div class="form-bar__button">
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

<style scoped>
.form-bar {
  position: relative;
}

.form-bar__button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
