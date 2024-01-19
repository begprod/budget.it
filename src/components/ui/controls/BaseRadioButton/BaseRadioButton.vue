<template>
  <div>
    <input :id="id" :name="name" :value="value" type="radio" @change="changeHandler" :checked="checked" />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
}

defineProps<Props>();

const emit = defineEmits(['change']);

const changeHandler = (event: Event) => {
  emit('change', (event.target as HTMLInputElement).value);
};
</script>
