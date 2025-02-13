<template>
  <BaseLayout>
    <BaseExpensesList
      :month="getMonthByIndex"
      :month-days="getAllDaysByMonthId(getMonthByIndex.id)"
      :month-expenses="getMonthlyExpenses(getMonthByIndex.id)"
      :daily-budget="getMonthlyDailyBudget[getMonthByIndex.id].dailyBudget"
      :expenses="expenses"
      @remove-item="removeExpense"
    >
      <template #input>
        <BaseFormBar
          v-if="isAddExpenseInputVisible"
          @submit="submitExpense(expense)"
          class="!absolute top-[calc(100%+10px)] w-full rounded-xl shadow-md mb-6 z-50"
        >
          <template #input>
            <BaseInput
              id="expense-input"
              v-model="expense"
              type="number"
              inputmode="numeric"
              :placeholder="`Enter expense (${getActiveCurrency.name})`"
              :has-error="isExpenseFieldHasError"
              @on-blur="hideAddExpenseInput"
            />
          </template>
        </BaseFormBar>
      </template>
    </BaseExpensesList>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { number } from 'yup';
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseFormBar from '@/components/BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { lastCalendarUpdateDate, isAddExpenseInputVisible } = storeToRefs(commonStore);
const { setLastUpdateDate, hideAddExpenseInput } = commonStore;
const { getMonthlyDailyBudget, getActiveCurrency } = storeToRefs(settingsStore);
const { getMonthByIndex } = storeToRefs(calendarStore);
const { initCalendar, getAllDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
const { initExpensesObject, getMonthlyExpenses, addExpense, removeExpense } = expensesStore;

const expense = ref('');
const isExpenseFieldHasError = ref(false);
const expenseSchema = number().integer().required().min(1);

onBeforeMount(() => {
  const updateDate = new Date().toLocaleDateString();

  setLastUpdateDate(updateDate);

  initCalendar();
  initExpensesObject();

  window.addEventListener('focus', tabFocusHandler);
});

const tabFocusHandler = () => {
  if (!lastCalendarUpdateDate.value) {
    return;
  }

  const currentDate = new Date().toLocaleDateString();

  if (currentDate !== lastCalendarUpdateDate.value) {
    setLastUpdateDate(currentDate);
    initCalendar();
    initExpensesObject();
  }
};

const submitExpense = (expenseValue: string) => {
  try {
    expenseSchema.validateSync(expenseValue);

    addExpense(expenseValue);

    expense.value = '';
    isExpenseFieldHasError.value = false;
  } catch (error) {
    isExpenseFieldHasError.value = true;
  }
};
</script>
