<template>
  <div class="stats-panel">
    <div class="stats-panel__inner">
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
  top: 52px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  color: var(--color-typo-secondary);
  background: var(--color-bg-surface-brand-glass);
  border-radius: var(--rounded-lg);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--rounded-lg);
    opacity: 0.4;
    box-shadow: 0px 15px 15px 0lh var(--color-bg-brand);
    z-index: 1;
  }
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
    color: var(--color-typo-secondary);
  }
}

.stats-panel__title {
  color: var(--color-typo-secondary);
  font-size: var(--typo-size-xl);
}

.stats-panel__overall {
  color: var(--color-typo-secondary);
  line-height: 1;
  font-size: var(--typo-size-4xl);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
