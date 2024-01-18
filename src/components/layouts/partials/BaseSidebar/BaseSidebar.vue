<template>
  <div v-if="isOpen" class="fixed top-0 right-0 bottom-0 left-0 w-full bg-slate-500 z-[101]">
    <slot name="currencies" />
    <slot name="daily" />
    <button @click="toggle">close</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emits = defineEmits(['toggle']);

const toggle = () => {
  emits('toggle');
};
</script>
