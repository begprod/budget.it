<template>
  <div class="toast">
    <Transition name="slide-up">
      <div
        v-if="isVisible"
        class="toast__inner"
        data-test-id="toast"
        :class="classObject"
        @click="closeToast"
      >
        <div v-if="props.type === 'default'" class="toast__icon" data-test-id="toast-default-icon">
          <MessageCircleMore class="icon icon_24" />
        </div>

        <div v-if="props.type === 'success'" class="toast__icon" data-test-id="toast-success-icon">
          <MessageCircleHeart class="icon icon_24" />
        </div>
        <div v-if="props.type === 'error'" class="toast__icon" data-test-id="toast-error-icon">
          <MessageCircleX class="icon icon_24" />
        </div>

        <div class="toast__content" data-test-id="toast-message">{{ message }}</div>

        <div ref="timerLineRef" class="toast__timer-line"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { MessageCircleHeart, MessageCircleMore, MessageCircleX } from 'lucide-vue-next';
import { onBeforeUnmount, ref, computed, watch } from 'vue';

interface IProps {
  type: 'success' | 'error' | 'default';
  message: string;
  duration: number;
  callback?: () => void;
}

const props = defineProps<IProps>();
const emit = defineEmits(['timesup']);

const isVisible = ref<boolean>(false);
const timerId = ref<number>(0);
const timerLineRef = ref<HTMLDivElement | null>(null);
const timeLeft = ref(props.duration);

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

const classObject = computed(() => {
  switch (props.type) {
    case 'success':
      return 'toast__inner_type_success';
    case 'error':
      return 'toast__inner_type_error';
    default:
      return 'toast__inner_type_default';
  }
});

onBeforeUnmount(() => {
  clearInterval(timerId.value);
});

const updateTimer = () => {
  clearInterval(timerId.value);

  timeLeft.value = props.duration;

  timerId.value = window.setInterval(() => {
    timeLeft.value -= 50 / 1000;

    if (timerLineRef.value) {
      timerLineRef.value.style.transform = `scaleX(${timeLeft.value / props.duration})`;
    }

    if (timeLeft.value <= 0) {
      isVisible.value = false;

      clearInterval(timerId.value);

      emit('timesup');

      props.callback?.();
    }
  }, 50);
};

const closeToast = () => {
  isVisible.value = false;

  clearInterval(timerId.value);

  emit('timesup');

  props.callback?.();
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 6rem;
  left: 50%;
  z-index: 10000;
  width: 16rem;
  font-size: var(--typo-size-sm);
  border-radius: var(--rounded-md);
  transform: translateX(-50%);
  overflow: hidden;
}

.toast__inner {
  display: flex;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-bg-border);
  border-radius: var(--rounded-md);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
}

.toast__inner_type_success {
  color: var(--color-bg-success);
}

.toast__inner_type_error {
  color: var(--color-bg-alert);
}

.toast__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  border-radius: var(--rounded-md);
  color: inherit;
}

.toast__content {
  color: inherit;
}

.toast__timer-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-image: linear-gradient(0deg, #cbd5e1 100%, #cbd5e1);
  background-repeat: no-repeat;
  transform-origin: left;
  transition: 0.3s ease-out;
  transition-property: transform;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
