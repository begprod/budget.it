<template>
  <div class="stats-panel liquidGlass-wrapper">
    <div class="glass-effect"></div>
    <div class="glass-tint"></div>

    <div class="stats-panel__inner liquidGlass-text">
      <div class="stats-panel__header">
        <div class="stats-panel__title" data-test-id="month-title">{{ title }}</div>
        <div class="stats-panel__overall" :title="`${expenses}`" data-test-id="monthly-expenses">
          {{ expenses }}
        </div>
      </div>
      <div class="stats-panel__footer">
        <div class="stats-panel__footer-item">
          <div data-test-id="monthly-budget">Monthly budget: {{ budget }}</div>

          <div data-test-id="monthly-percents">{{ progress }}%</div>
        </div>

        <BaseProgressBar :percentage="progress" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

interface IProps {
  title: string;
  expenses: number;
  budget: number;
  progress: number;
}

defineProps<IProps>();
</script>

<style scoped>
.stats-panel {
  position: sticky;
  top: 48px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  color: var(--color-typo-secondary);
  border-radius: var(--rounded-lg);
  border: 1px solid var(--color-bg-border);
  overflow: hidden;
  z-index: 100;
}

.stats-panel__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 99;
}

.stats-panel__header,
.stats-panel__footer {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stats-panel__footer {
  font-size: var(--typo-size-xs);
}

.stats-panel__footer-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  * {
    color: var(--color-typo-primary);
  }
}

.stats-panel__title {
  color: var(--color-typo-primary);
  font-size: var(--typo-size-xl);
}

.stats-panel__overall {
  color: var(--color-typo-primary);
  line-height: 1;
  font-size: var(--typo-size-4xl);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
