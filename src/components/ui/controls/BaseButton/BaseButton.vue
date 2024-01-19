<template>
  <button
    class="flex items-center justify-center px-3 py-2 w-full bg-sky-400 text-white rounded-xl focus:outline-none hover:bg-sky-500 transition-[background-color]"
    :type="type"
    :title="title"
    @click="clickHandler"
  >
    <slot name="leftIcon" />
    <slot name="text" />
    <slot name="rightIcon" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
});

const emits = defineEmits(['click']);

const clickHandler = () => {
  emits('click');
};
</script>
