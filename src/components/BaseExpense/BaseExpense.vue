<template>
  <div ref="container" class="expense">
    <div ref="target" class="expense__inner" :style="{ left, opacity: innerOpacity }">
      <div class="expense__content">
        <div class="expense__item">{{ currency }} {{ value }}</div>
        <div class="expense__time">{{ createdAt }}</div>
      </div>
    </div>

    <div class="expense__action-banner" :style="{ opacity: bannerOpacity }">Delete</div>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { usePointerSwipe } from '@vueuse/core';

interface IProps {
  value: string | number;
  currency: string;
  createdAt?: string;
}

defineProps<IProps>();

const emit = defineEmits(['delete-item']);

const target = shallowRef<HTMLElement | null>(null);
const container = shallowRef<HTMLElement | null>(null);
const left = shallowRef('0');
const innerOpacity = shallowRef(1);
const bannerOpacity = shallowRef(0);
const containerWidth = computed(() => container.value?.offsetWidth);

const { distanceX } = usePointerSwipe(target, {
  disableTextSelect: true,
  onSwipe() {
    if (!containerWidth.value) {
      return;
    }

    const dx = distanceX.value;

    if (dx < 0) {
      const dist = Math.abs(dx);
      left.value = `${dist}px`;
      innerOpacity.value = 1.25 - dist / containerWidth.value;
      bannerOpacity.value = -0.01 + dist / containerWidth.value;
    } else {
      left.value = '0';
      innerOpacity.value = 1;
    }
  },
  onSwipeEnd() {
    const thresholdPassed =
      containerWidth.value && Math.abs(distanceX.value) / containerWidth.value >= 0.5;

    if (distanceX.value < 0 && thresholdPassed) {
      left.value = '100%';
      innerOpacity.value = 0;

      setTimeout(() => {
        emit('delete-item');
      }, 200);
    } else {
      resetSwipe();
    }
  },
});

function resetSwipe() {
  left.value = '0';
  innerOpacity.value = 1;
  bannerOpacity.value = 0;
}
</script>

<style scoped>
.expense {
  position: relative;
  border-radius: var(--rounded-xs);
  box-shadow: 0 1px 1px 0 var(--color-bg-surface-secondary);
  overflow: hidden;
}

.expense__inner {
  position: relative;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--color-bg-surface);
  transition: 0.2s linear;
  transition-property: left, opacity;
  z-index: 1;
}

.expense__time {
  font-size: var(--typo-size-xs);
  color: var(--color-typo-ghost);
  user-select: none;
}

.expense__item {
  position: relative;
  max-width: clamp(7.5rem, 48.83vw, 31.25rem);
  line-height: 1.2;
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expense__button {
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  background-color: var(--color-bg-surface);
}

.expense__action-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: var(--color-typo-secondary);
  opacity: 0;
  border-radius: var(--rounded-xs);
  background-color: var(--color-bg-alert);
  overflow: hidden;
  z-index: 0;
}
</style>
