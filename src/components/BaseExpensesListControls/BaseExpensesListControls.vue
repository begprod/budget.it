<template>
  <div class="expenses-list-controls wrapper">
    <BaseButton
      size="sm"
      theme="flat"
      :is-disabled="getNextMonthsFromCurrent.isFuture"
      @click="decreaseCurrentMonthIndex"
      data-test-id="next-month-button"
    >
      <template #leftIcon>
        <ChevronLeft class="icon icon_md" />
      </template>
      <template #text>
        {{ getNextMonthsFromCurrent.name }}
      </template>
    </BaseButton>

    <div class="expenses-list-controls__button expenses-list-controls__button_add">
      <BaseButton
        theme="brand"
        size="circle"
        :is-disabled="!getMonthByIndex.isCurrent"
        @click="showExpenseInputHandler()"
        data-test-id="add-expense-button"
      >
        <template #rightIcon>
          <Banknote class="icon icon_lg" />
        </template>
      </BaseButton>
    </div>

    <BaseButton
      size="sm"
      theme="flat"
      :is-disabled="!getPreviousMonthsFromCurrent"
      @click="increaseCurrentMonthIndex"
      data-test-id="previous-month-button"
    >
      <template #rightIcon>
        <ChevronRight class="icon icon_md" />
      </template>
      <template #text>
        {{ getPreviousMonthsFromCurrent?.name }}
      </template>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import { Banknote, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useCommonStore, useCalendarStore } from '@/stores';

const commonStore = useCommonStore();
const calendarStore = useCalendarStore();

const { showAddExpenseInput } = commonStore;
const { getMonthByIndex, getPreviousMonthsFromCurrent, getNextMonthsFromCurrent } =
  storeToRefs(calendarStore);
const { increaseCurrentMonthIndex, decreaseCurrentMonthIndex } = calendarStore;

const showExpenseInputHandler = () => {
  showAddExpenseInput();

  nextTick(() => {
    const input = document.getElementById('expense-input');
    input?.focus();
  });
};

defineExpose({
  showExpenseInputHandler,
});
</script>

<style scoped>
.expenses-list-controls {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  margin-bottom: 1rem;
  background: var(--color-bg-surface-glass);
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: var(--rounded-xl);
  backdrop-filter: blur(3px);
  overlay: hidden;
}

.expenses-list-controls__inner {
  display: flex;
  gap: 0.5rem;
}

.expenses-list-controls__button_add {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  button {
    width: 48px;
    height: 48px;
  }
}
</style>
