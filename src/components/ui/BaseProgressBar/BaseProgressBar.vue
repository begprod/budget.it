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
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  background-color: var(--white);
  overflow: hidden;
}

.progress-bar_overfilled {
  .progress-bar__background {
    background-image: linear-gradient(43deg, #ff9191 0%, #ff9191 46%, #ff0000 100%);
  }
}

.progress-bar__background {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(43deg, #85ffbd 0%, #00dbde 46%, #0093e9 100%);
  background-repeat: no-repeat;
  transition: background-size 0.5s ease-in-out;
}
</style>
