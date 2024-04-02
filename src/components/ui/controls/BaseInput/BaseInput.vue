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
      @blur="blurHandler"
      class="w-full px-3 py-2 pr-14 text-sm border border-slate-300 rounded-xl hover:border-slate-400 focus:outline-none focus:border-slate-400 transition-[border-color] select-none"
    />
    <Transition>
      <span
        v-if="isError && errorMessage"
        class="absolute left-3 -bottom-4 w-full text-xs text-rose-500"
      >
        {{ errorMessage }}
      </span>
    </Transition>
    <Transition>
      <span
        v-if="isSuccess && successMessage"
        class="absolute left-3 -bottom-4 w-full text-xs text-green-500"
      >
        {{ successMessage }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface IProps {
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

defineProps<IProps>();

const emit = defineEmits(['update:modelValue', 'onBlur']);

const inputHandler = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const blurHandler = () => {
  emit('onBlur');
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
