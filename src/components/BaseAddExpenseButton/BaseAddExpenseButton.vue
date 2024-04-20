<template>
  <BaseButton
    class="mb-2 shadow-md"
    @click="showExpenseInputHandler()"
    data-test-id="add-expense-button"
  >
    <template #text> Add expense </template>
    <template #rightIcon>
      <BanknotesIcon class="w-5 h-5 ml-2" />
    </template>
  </BaseButton>

  <BaseProgressBar
    class="mb-2 shadow-md"
    :label="`${getCurrentMonth?.name} – ${countMonthlyExpenses(getCurrentMonth?.id)}`"
    :percentage="countProgressPercentage(getCurrentMonth?.id)"
  />
</template>

<script setup lang="ts">
import type { IMonth } from '@/types';
import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();

const { showAddExpenseInput } = commonStore;
const { getCurrentMonth, getDaysByMonthId } = calendarStore;
const { getMonthlyExpenses } = expensesStore;
const { dailyBudget } = storeToRefs(settingsStore);

const showExpenseInputHandler = () => {
  showAddExpenseInput();

  nextTick(() => {
    const input = document.getElementById('expense-input');
    input?.focus();
  });
};

const countProgressPercentage = (monthId: IMonth['id'] | undefined) => {
  if (monthId === undefined) {
    return 0;
  }

  const monthExpensesCounter = getMonthlyExpenses(monthId);

  if (monthExpensesCounter > getDaysByMonthId(monthId).length * dailyBudget.value) {
    return 100;
  }

  return (monthExpensesCounter / (getDaysByMonthId(monthId).length * dailyBudget.value)) * 100;
};

const countMonthlyExpenses = (monthId: IMonth['id'] | undefined) => {
  if (monthId === undefined) {
    return '';
  }

  return `${getMonthlyExpenses(monthId)} / ${getDaysByMonthId(monthId).length * dailyBudget.value}`;
};

defineExpose({
  showExpenseInputHandler,
});
</script>
