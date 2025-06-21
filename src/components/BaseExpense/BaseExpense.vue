<template>
  <div ref="expenseRef" class="expense" @click="showControls(true)">
    <div class="expense__item">{{ currency }} {{ value }}</div>

    <div class="expense__time">{{ createdAt }}</div>

    <Transition name="slide-right">
      <BaseButton
        v-if="isControlsVisible"
        theme="flat"
        class="expense__button"
        data-test-id="delete-button"
        @click="deleteItemHandler"
      >
        <template #text>
          <Trash2 class="icon icon_sm" />
        </template>
      </BaseButton>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Trash2 } from 'lucide-vue-next';
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
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  transition: 0.3s ease-in-out;
  transition-property: box-shadow, transform;
  cursor: pointer;
}

.expense__time {
  font-size: var(--typo-size-xs);
  color: var(--color-typo-ghost);
  user-select: none;
}

.expense__item {
  position: relative;
  max-width: clamp(7.5rem, 48.83vw, 31.25rem);
  line-height: 1.2;
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expense__button {
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  background-color: var(--color-bg-surface);
}
</style>
