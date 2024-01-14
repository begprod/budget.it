<template>
  <div class="flex items-center">
    <div v-if="day.isCurrent">>>>></div>
    {{ day.number }}
    ({{ day.name }})
  </div>
</template>

<script setup lang="ts">
import type { IDay } from '@/types';

interface IProps {
  day: IDay;
}

defineProps<IProps>();
</script>
