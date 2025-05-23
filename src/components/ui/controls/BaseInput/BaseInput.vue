<template>
  <div class="relative w-full">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autocomplete="autocomplete"
      :class="isError ? 'input_error' : ''"
      @input="inputHandler"
      @blur="blurHandler"
      class="input"
    />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  modelValue: string | number;
  id: string;
  type: string;
  placeholder: string;
  autocomplete?: 'on' | 'off';
  isError?: boolean;
}

defineProps<IProps>();

const emit = defineEmits(['update:modelValue', 'onBlur']);

const inputHandler = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const blurHandler = () => {
  emit('onBlur');
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 3.5rem 0.5rem 0.75rem;
  font-size: var(--typo-size-sm);
  line-height: 1.4;
  border: 1px solid var(--color-bg-border);
  border-radius: var(--rounded-md);
  color: var(--color-typo-primary);
  background-color: var(--color-bg-surface);
  transition: 0.3s ease-in-out;
  transition-property: border-color;

  &:hover,
  &:focus {
    outline: none;
    border-color: var(--color-bg-border-hover);
  }
}

.input.input_error {
  color: var(--color-bg-alert);
  border: 1px solid var(--color-bg-alert);

  &:hover,
  &:focus {
    border-color: var(--color-bg-alert);
  }
}
</style>
