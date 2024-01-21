<template>
  <div v-if="isOpen" class="fixed top-0 right-0 bottom-0 left-0 w-auto bg-slate-500/90 z-[101]">
    <div class="container mx-auto fixed bottom-0 right-0 left-0 h-5/6 p-5 pb-10 w-full rounded-t-2xl bg-white">
      <slot></slot>
      <div class="pb-5 overflow-x-auto max-h-[80%]">
        <slot name="currencies" />
        <slot name="daily" />
      </div>
      <div class="fixed right-0 bottom-3 left-0 text-center">
      <BaseButton title="Close" class="inline-flex !p-2 !w-auto bg-transparent border border-slate-300 !rounded-full" @click="toggle">
        <template #leftIcon>
          <XMarkIcon class="w-5 h-5 text-slate-300" />
        </template>
      </BaseButton>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emits = defineEmits(['toggle']);

const toggle = () => {
  emits('toggle');
};
</script>
