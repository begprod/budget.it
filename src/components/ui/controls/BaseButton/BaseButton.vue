<template>
  <button class="button" :type="type" :title="title" :disabled="isDisabled" @click="clickHandler">
    <slot name="leftIcon" />
    <slot name="text" />
    <slot name="rightIcon" />
  </button>
</template>

<script setup lang="ts">
interface IProps {
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  isDisabled?: boolean;
}

withDefaults(defineProps<IProps>(), {
  type: 'button',
});

const emits = defineEmits(['click']);

const clickHandler = () => {
  emits('click');
};
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: var(--typo-size-sm);
  line-height: 1.5;
  color: var(--blue-400);
  border: 1px solid var(--slate-300);
  border-radius: 0.75rem;
  background-color: var(--white);
  transition: 0.3s ease-in-out;
  transition-property: background-color, opacity, box-shadow;

  &:hover {
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    border-color: var(--slate-400);
  }

  &:disabled {
    border-color: var(--slate-300);
    box-shadow: none;
    cursor: not-allowed;
    background-color: var(--slate-200);
    opacity: 0.5;
  }
}
</style>
