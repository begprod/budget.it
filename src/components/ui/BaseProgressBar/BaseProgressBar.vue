<template>
  <div
    class="progress-bar relative flex items-center justify-center h-3 text-xs text-slate-700 rounded-[4px] overflow-hidden"
  >
    <div
      class="progress-bar__background absolute top-0 left-0 w-full h-full"
      :class="classes"
      :style="{
        'background-size': `${percentage}%`,
      }"
    />

    <span class="opacity-60">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  label: string;
  percentage: number;
  isFull: boolean;
}

const props = defineProps<IProps>();

const classes = computed(() => ({
  'progress-bar__background_overfilled': props.isFull,
}));
</script>

<style scoped lang="scss">
.progress-bar {
  &__background {
    background-image: linear-gradient(43deg, #85ffbd 0%, #00dbde 46%, #0093e9 100%);
    background-repeat: no-repeat;
    transition: background-size 0.5s ease-in-out;

    &_overfilled {
      background-image: linear-gradient(43deg, #ff9191 0%, #ff9191 46%, #ff0000 100%);
    }
  }
}
</style>
