<template>
  <div
    class="expense"
    :class="{
      expense_active: isControlsVisible,
    }"
  >
    <div class="expense__time">{{ createdAt }}</div>

    <div class="expense__body">
      <div ref="expenseRef" class="expense__item" @click="showControls(true)">
        <div>{{ value }}</div>
        <div class="ml-1">{{ currency }}</div>
      </div>

      <Transition>
        <BaseButton v-if="isControlsVisible" class="expense__button" @click="deleteItemHandler">
          <template #text>
            <X class="icon icon_sm expense__icon" />
          </template>
        </BaseButton>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { X } from 'lucide-vue-next';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

interface IProps {
  value: string | number;
  currency: string;
  createdAt?: string;
}

defineProps<IProps>();

const emit = defineEmits(['delete-item']);

const expenseRef = ref<HTMLElement | null>(null);
const isControlsVisible = ref(false);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);

  document.addEventListener('keydown', handleKeydown);

  document.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);

  document.removeEventListener('keydown', handleKeydown);

  document.removeEventListener('scroll', handleScroll);
});

const showControls = (isVisible: boolean, event?: Event) => {
  if (
    event instanceof MouseEvent &&
    (!expenseRef.value || expenseRef.value.contains(event.target as Node))
  ) {
    return;
  }

  if (event instanceof KeyboardEvent && event.key === 'Escape') {
    isControlsVisible.value = false;

    return;
  }

  if (event instanceof WheelEvent) {
    isControlsVisible.value = false;

    return;
  }

  isControlsVisible.value = isVisible;
};

const handleClickOutside = (event: MouseEvent) => showControls(false, event);
const handleKeydown = (event: KeyboardEvent) => showControls(false, event);
const handleScroll = (event: Event) => showControls(false, event);

const deleteItemHandler = () => {
  emit('delete-item');
};

defineExpose({
  showControls,
});
</script>

<style scoped>
.expense {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.expense_active {
  z-index: 50;
}

.expense__time {
  font-size: var(--typo-size-xs);
  color: var(--slate-500);
  user-select: none;
}

.expense__body {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.expense__item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  line-height: 1;
  font-size: clamp(var(--typo-size-xs), 1.56vw, var(--typo-size-base));
  background-color: var(--white);
  border: 1px solid var(--blue-400);
  border-radius: 1rem;
  transition: 0.3s ease-in-out;
  transition-property: box-shadow;
  z-index: 39;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  }
}

.expense__button {
  position: absolute;
  top: 1.25rem;
  height: 110%;
  align-items: flex-end;
  padding-bottom: 0.25rem;
  background-color: var(--red-500);
  border-radius: 1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  &:hover {
    background-color: var(--red-600);
  }
}

.expense__icon {
  color: var(--white);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
