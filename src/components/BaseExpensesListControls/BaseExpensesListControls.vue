<template>
  <div class="expenses-list-controls wrapper">
    <Transition name="slide-up">
      <BaseButton
        v-if="getMonthByIndex.isCurrent"
        @click="showExpenseInputHandler()"
        data-test-id="add-expense-button"
      >
        <template #text> Add expense </template>
        <template #rightIcon>
          <Banknote class="icon icon_lg" />
        </template>
      </BaseButton>
    </Transition>

    <div class="expenses-list-controls__inner">
      <BaseButton
        :is-disabled="getNextMonthsFromCurrent.isFuture"
        @click="decreaseCurrentMonthIndex"
        data-test-id="next-month-button"
      >
        <template #leftIcon>
          <ChevronLeft class="icon icon_lg" />
        </template>
        <template #text>
          {{ getNextMonthsFromCurrent.name }}
        </template>
      </BaseButton>
      <BaseButton
        :is-disabled="!getPreviousMonthsFromCurrent"
        @click="increaseCurrentMonthIndex"
        data-test-id="previous-month-button"
      >
        <template #rightIcon>
          <ChevronRight class="icon icon_lg" />
        </template>
        <template #text>
          {{ getPreviousMonthsFromCurrent?.name }}
        </template>
      </BaseButton>
    </div>
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0 1.25rem;
}

.expenses-list-controls__inner {
  display: flex;
  gap: 0.5rem;
}
</style>
