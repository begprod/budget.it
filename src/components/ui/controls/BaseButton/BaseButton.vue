<template>
  <button
    class="flex items-center justify-center px-3 py-2 w-full text-sm text-sky-400 bg-white border border-slate-300 rounded-xl focus:outline-none lg:hover:bg-sky-500 lg:hover:text-white disabled:opacity-50 disabled:bg-slate-300 transition-[background-color]"
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
