<template>
  <div
    class="flex items-center justify-center h-16 text-xs lg:text-base text-slate-500 select-none"
  >
    <Coins class="mr-2 w-6 h-6" />
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { Coins } from 'lucide-vue-next';

interface IProps {
  message: string;
}

defineProps<IProps>();
</script>
