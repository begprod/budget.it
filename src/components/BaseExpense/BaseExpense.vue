<template>
  <div
    class="relative flex flex-col items-center"
    :class="{
      'z-[60]': isControlsVisible,
    }"
  >
    <div class="text-xs text-slate-500 select-none">{{ createdAt }}</div>

    <div class="relative flex items-center select-none cursor-pointer">
      <div
        ref="expense"
        class="relative flex items-center py-1 px-3 text-sm lg:text-base bg-white border border-sky-400 rounded-2xl hover:shadow-md transition-shadow duration-300 z-40"
        @click="showControls"
      >
        <div>{{ value }}</div>
        <div class="ml-1">{{ currency }}</div>
      </div>

      <Transition>
        <BaseButton
          v-if="isControlsVisible"
          class="absolute top-5 h-[110%] !items-end !p-0 !pb-1 !rounded-2xl !rounded-t-none !bg-red-500 hover:!bg-red-600"
          @click="clickHandler"
        >
          <template #text>
            <XMarkIcon class="w-4 h-4 text-white" />
          </template>
        </BaseButton>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

interface IProps {
  value: string | number;
  currency: string;
  createdAt?: string;
}

defineProps<IProps>();

const emit = defineEmits(['click', 'delete']);

const expense = ref<HTMLElement | null>(null);
const isControlsVisible = ref(false);

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (!expense.value || expense.value.contains(event.target as Node)) {
      return;
    }

    isControlsVisible.value = false;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      isControlsVisible.value = false;
    }
  });

  document.addEventListener('scroll', () => {
    isControlsVisible.value = false;
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', () => {
    isControlsVisible.value = false;
  });

  document.removeEventListener('keydown', () => {
    isControlsVisible.value = false;
  });

  document.removeEventListener('scroll', () => {
    isControlsVisible.value = false;
  });
});

const showControls = () => {
  isControlsVisible.value = !isControlsVisible.value;
};

const clickHandler = () => {
  emit('click');
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
