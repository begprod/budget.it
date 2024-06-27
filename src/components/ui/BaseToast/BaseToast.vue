<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[272px] z-[1000]">
    <Transition name="slide-up">
      <div
        v-if="isVisible"
        class="flex w-full sm:w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm shadow-gray-200 duration-300 hover:shadow-lg"
        :class="classObject"
        @click="closeToast"
        data-test-id="toast"
      >
        <div
          v-if="props.type === 'success'"
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-200 rounded-lg"
          data-test-id="toast-success-icon"
        >
          <HandThumbUpIcon class="w-5 h-5" />
        </div>
        <div
          v-if="props.type === 'error'"
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-200 rounded-lg"
          data-test-id="toast-error-icon"
        >
          <ExclamationTriangleIcon class="w-5 h-5" />
        </div>

        <div class="flex flex-col items-start ml-3">
          <div class="text-sm font-normal" data-test-id="toast-message">{{ message }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { HandThumbUpIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid';

interface IProps {
  type: 'success' | 'error' | null;
  message: string;
  duration: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(['timesup']);

const isVisible = ref<boolean>(false);
const currentToastTimerId = ref<number>(0);

watch(
  () => props.message,
  () => {
    if (props.message === '') {
      return;
    }

    isVisible.value = true;

    updateTimer();
  },
);

const updateTimer = (timeLeft = props.duration) => {
  clearTimeout(currentToastTimerId.value);

  currentToastTimerId.value = window.setInterval(() => {
    timeLeft -= 1;

    if (timeLeft <= 0) {
      isVisible.value = false;

      clearTimeout(currentToastTimerId.value);
    }
  }, 1000);
};

const closeToast = () => {
  isVisible.value = false;

  clearTimeout(currentToastTimerId.value);
};

const classObject = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
});
</script>
