<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :autofocus="autofocus"
    @input="inputHandler"
    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-slate-400 transition-[border-color] select-none"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  id: string;
  type: string;
  placeholder: string;
  autofocus?: boolean;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const inputHandler = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
