<template>
  <div class="radio">
    <input
      :id="id"
      :name="name"
      :value="value"
      :checked="checked"
      type="radio"
      class="visually-hidden"
      @change="changeHandler"
    />
    <label :for="id" class="radio__label" :title="label">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
}

defineProps<IProps>();

const emit = defineEmits(['change']);

const changeHandler = (event: Event) => {
  emit('change', (event.target as HTMLInputElement).value);
};
</script>

<style scoped>
.radio {
  input {
    &:checked {
      ~ label {
        color: var(--white);
        background-color: var(--blue-400);
      }
    }
  }
}

.radio__label {
  display: block;
  padding: 0.25rem 0.75rem;
  color: var(--slate-400);
  font-size: var(--typo-size-sm);
  border: 1px solid var(--slate-300);
  border-radius: 1rem;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.3s ease-in-out;
  transition-property: color, border-color, background-color;

  &:hover {
    color: var(--slate-500);
    border-color: var(--slate-400);
  }
}
</style>
