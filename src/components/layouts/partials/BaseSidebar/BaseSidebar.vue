<template>
  <div
    v-if="isOpen"
    class="fixed top-0 right-0 bottom-0 left-0 w-auto bg-slate-500/90 z-[101]"
  >
    <div class="relative top-1/3 p-5 h-full rounded-t-2xl bg-white">
      <slot name="currencies" />
      <slot name="daily" />
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
