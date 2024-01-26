<template>
  <div class="flex flex-col items-center">
    <div class="text-xs text-slate-300">{{ createdAt }}</div>
    <div class="flex items-baseline py-1 px-3 border border-sky-400 rounded-2xl">
      <div class="text-sm text-slate-700 leading-6 break-all">{{ value }}</div>
      <div class="ml-1 text-xs leading-5">{{ currency }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  createdAt: string;
  value: string | number;
  currency: string;
}

defineProps<IProps>();

const emit = defineEmits(['click', 'delete']);
</script>
