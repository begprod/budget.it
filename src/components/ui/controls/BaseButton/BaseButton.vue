<template>
  <button
    class="flex items-center justify-center px-3 py-2 bg-sky-400 text-white focus:outline-none"
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
