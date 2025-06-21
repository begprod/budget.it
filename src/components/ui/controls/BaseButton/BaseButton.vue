<template>
  <button
    class="button"
    :class="classes"
    :type="type"
    :title="title"
    :disabled="isDisabled"
    @click="clickHandler"
  >
    <slot name="leftIcon" />
    <slot name="text" />
    <slot name="rightIcon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  theme?: 'brand' | 'flat';
  size?: 'sm' | 'circle';
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
});

const emits = defineEmits(['click']);

const clickHandler = () => {
  emits('click');
};

const classes = computed(() => {
  return {
    button_theme_brand: props.theme === 'brand',
    button_theme_flat: props.theme === 'flat',
    button_size_circle: props.size === 'circle',
    button_size_sm: props.size === 'sm',
  };
});
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 0.78vw, 0.5rem);
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: var(--color-typo-primary);
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  line-height: 1.5;
  border: 1px solid var(--color-bg-border);
  border-radius: var(--rounded-md);
  background-color: transparent;
  transition: 0.3s ease-in-out;
  transition-property: border, background-color, opacity, box-shadow, transform;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    color: var(--color-typo-brand);
  }

  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.3;
  }
}

.button_size_sm {
  padding: 0.25rem 0.5rem;
}

.button_size_circle {
  border-radius: var(--rounded-full);
}

.button_theme_flat {
  border-color: transparent;

  &:hover {
    box-shadow: none;
  }
}

.button_theme_brand {
  color: var(--color-typo-secondary);
  background-color: var(--color-bg-surface-brand-glass);
  border: none;

  &:hover {
    box-shadow: none;
  }
}
</style>
