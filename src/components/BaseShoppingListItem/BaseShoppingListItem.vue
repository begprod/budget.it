<template>
  <div ref="container" class="shopping-item" :class="classes">
    <div ref="target" class="shopping-item__inner" :style="{ left, opacity, ...style }">
      <div class="shopping-item__grip" data-test-id="shopping-item-grip">
        <GripVertical class="icon icon_md" />
      </div>
      <label :for="item.id" class="shopping-item__checkbox">
        <input
          :id="item.id"
          v-model="isChecked"
          type="checkbox"
          data-test-id="shopping-item-checkbox"
        />

        <div class="shopping-item__checkbox-icon">
          <SquareDashed class="icon icon_lg" />
          <CheckCheck class="icon icon_lg" />
        </div>
      </label>

      <div class="shopping-item__title" data-test-id="shopping-item-title">
        {{ item.title }}
      </div>
    </div>
    <div class="shopping-item__action-banner" :style="{ opacity: bannerOpacity }">Delete</div>
  </div>
</template>

<script setup lang="ts">
import type { IShoppingItem } from '@/types';
import { usePointerSwipe } from '@vueuse/core';
import { computed, shallowRef } from 'vue';
import { SquareDashed, CheckCheck, GripVertical } from 'lucide-vue-next';

interface IProps {
  item: IShoppingItem;
  style?: Record<string, string>;
}

const props = defineProps<IProps>();

const emit = defineEmits(['check', 'remove']);

const target = shallowRef<HTMLElement | null>(null);
const container = shallowRef<HTMLElement | null>(null);
const left = shallowRef('0');
const opacity = shallowRef(1);
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
      opacity.value = 1.25 - dist / containerWidth.value;
      bannerOpacity.value = -0.01 + dist / containerWidth.value;
    } else {
      left.value = '0';
      opacity.value = 1;
    }
  },
  onSwipeEnd() {
    const thresholdPassed =
      containerWidth.value && Math.abs(distanceX.value) / containerWidth.value >= 0.5;

    if (distanceX.value < 0 && thresholdPassed) {
      left.value = '100%';
      opacity.value = 0;

      setTimeout(() => {
        emit('remove', props.item.id);
      }, 200);
    } else {
      resetSwipe();
    }
  },
});

function resetSwipe() {
  left.value = '0';
  opacity.value = 1;
}

const isChecked = computed({
  get: () => props.item.isDone,
  set: (value) => {
    emit('check', props.item.id, value);
  },
});

const classes = computed(() => {
  return {
    'shopping-item_checked': isChecked.value,
  };
});
</script>

<style scoped>
.shopping-item {
  position: relative;
}

.shopping-item_checked {
  text-decoration: line-through;
  opacity: 0.3;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
}

.shopping-item__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.875rem, 1.56vw, 1rem);
  padding: 0 0.5rem;
  width: 100%;
  background-color: var(--color-bg-surface);
  border-radius: var(--rounded-xs);
  will-change: auto;
  transition: 0.2s linear;
  transition-property: left, opacity;
  z-index: 1;
}

.shopping-item__grip {
  opacity: 0.6;
  cursor: grab;
}

.shopping-item__checkbox {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  input {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;

    &:checked {
      ~ .shopping-item__checkbox-icon {
        svg:first-child {
          opacity: 0;
        }

        svg:nth-child(2) {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
}

.shopping-item__checkbox-icon {
  svg {
    transition: 0.3s ease-in-out;
    transition-property: opacity;
  }

  svg:first-child {
    opacity: 1;
  }

  svg:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
  }
}

.shopping-item__title {
  flex-grow: 1;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  text-align: left;
  overflow: hidden;
}

.shopping-item__action-banner {
  /* display: none !important; */
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
