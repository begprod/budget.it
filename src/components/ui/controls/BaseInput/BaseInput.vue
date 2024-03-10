<template>
  <div class="relative w-full">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autocomplete="autocomplete"
      :class="isError ? '!border-red-500 !focus:border-red-500' : ''"
      @input="inputHandler"
      class="w-full px-3 py-2 pr-14 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-slate-400 transition-[border-color] select-none"
    />
    <span
      v-if="isError && errorMessage"
      class="absolute left-3 -bottom-4 w-full text-xs text-rose-500"
    >
      {{ errorMessage }}
    </span>
    <span
      v-if="isSuccess && successMessage"
      class="absolute left-3 -bottom-4 w-full text-xs text-green-500"
    >
      {{ successMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  id: string;
  type: string;
  placeholder: string;
  autocomplete?: string;
  isError?: boolean;
  errorMessage?: string;
  isSuccess?: boolean;
  successMessage?: string;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const inputHandler = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
