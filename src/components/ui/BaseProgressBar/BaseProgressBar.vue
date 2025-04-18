<template>
  <div class="progress-bar" :class="classes">
    <div
      class="progress-bar__background"
      :style="{
        'background-size': `${percentage}%`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  percentage: number;
}

const props = defineProps<IProps>();

const classes = computed(() => ({
  'progress-bar_overfilled': props.percentage >= 100,
}));
</script>

<style scoped>
.progress-bar {
  height: 0.7rem;
  border-radius: var(--rounded-xs);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  background-color: var(--color-typo-secondary);
  overflow: hidden;
}

.progress-bar_overfilled {
  .progress-bar__background {
    background-image: linear-gradient(45deg, #5db996 0%, #ff9191 50%, #ff0000 100%);
  }
}

.progress-bar__background {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #5db996 0%, #edf491 50%, #db66d8 100%);
  background-repeat: no-repeat;
  transition: background-size 0.5s ease-in-out;
}
</style>
