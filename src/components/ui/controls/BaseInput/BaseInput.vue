<template>
  <div class="px-1">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autofocus="autofocus"
      @input="inputHandler"
      class="w-full p-2 rounded-xl text-sm border border-slate-300 focus:outline-none focus:border-sky-500 transition-all shadow-md"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
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
