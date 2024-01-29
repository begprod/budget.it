<template>
  <div class="relative w-full">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :class="hasError ? '!border-red-500 !focus:border-red-500' : ''"
      @input="inputHandler"
      class="w-full px-3 py-2 pr-14 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-slate-400 transition-[border-color] select-none"
    />
    <span
      v-if="hasError && errorMessage"
      class="absolute left-3 -bottom-4 w-full text-xs text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  id: string;
  type: string;
  placeholder: string;
  autofocus?: boolean;
  autocomplete?: string;
  errorMessage?: string;
  hasError?: boolean;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const inputHandler = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
