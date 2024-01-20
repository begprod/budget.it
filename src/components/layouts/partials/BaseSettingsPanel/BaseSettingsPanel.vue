<template>
  <div v-if="isOpen" class="fixed top-0 right-0 bottom-0 left-0 w-auto bg-slate-500/90 z-[101]">
    <div class="container mx-auto fixed bottom-0 right-0 left-0 h-5/6 p-5 w-full rounded-t-2xl bg-white">
      <slot></slot>
      <div class="overflow-x-auto max-h-[80%]">
        <slot name="currencies" />
        <slot name="daily" />
      </div>
      <button @click="toggle">close</button>
    </div>
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
