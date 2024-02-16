<template>
  <div
    class="progress-bar relative flex items-center justify-center h-6 text-xs text-slate-700 rounded-[4px] overflow-hidden"
    :class="classes"
  >
    <div
      class="progress-bar__background absolute top-0 left-0 w-full h-full"
      :style="{
        'background-size': `${percentage}%`,
      }"
    />

    <span class="text-slate-700 font-bold opacity-60 select-none">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  label: string;
  percentage: number;
  showTotal?: boolean;
}

const props = defineProps<IProps>();

const classes = computed(() => ({
  'progress-bar_overfilled': props.percentage >= 100,
  'progress-bar_total': props.showTotal,
}));
</script>

<style scoped lang="scss">
.progress-bar {
  &__background {
    background-image: linear-gradient(43deg, #85ffbd 0%, #00dbde 46%, #0093e9 100%);
    background-repeat: no-repeat;
    transition: background-size 0.5s ease-in-out;
  }

  &_overfilled {
    opacity: 0.8;

    .progress-bar__background {
      background-image: linear-gradient(43deg, #ff9191 0%, #ff9191 46%, #ff0000 100%);
    }
  }

  &_total {
    justify-content: flex-start;

    .progress-bar__background {
      background-image: none;
    }
  }
}
</style>
