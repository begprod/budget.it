<template>
  <BaseStatsPanel
    v-if="getMonthByIndex"
    :title="getMonthByIndex.name"
    :expenses="getMonthlyExpenses(getMonthByIndex.id).totalsByCurrency"
    :budget="monthBudget"
    :progress="
      countProgressPercentage(
        getMonthByIndex.id,
        getMonthlyDailyBudget[getMonthByIndex.id].dailyBudget,
      )
    "
  />

  <div v-if="getMonthByIndex" class="expense-list">
    <BaseExpensesList
      :days="monthDays"
      :expenses="expenses"
      :daily-budget="getMonthlyDailyBudget[getMonthByIndex.id].dailyBudget"
      @remove-item="removeExpense"
    >
      <template #input>
        <BaseFormBar
          v-if="isAddExpenseInputVisible"
          @submit="submitExpense(expense)"
          class="form-bar-add-expense"
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
  </div>
</template>

<script setup lang="ts">
import type { IMonth } from '@/types';
import { number } from 'yup';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseStatsPanel from '@/components/BaseStatsPanel/BaseStatsPanel.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseFormBar from '@/components/BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { isAddExpenseInputVisible } = storeToRefs(commonStore);
const { hideAddExpenseInput } = commonStore;
const { getMonthlyDailyBudget, getActiveCurrency } = storeToRefs(settingsStore);
const { getMonthByIndex } = storeToRefs(calendarStore);
const { getAllDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
const { getMonthlyExpenses, addExpense, removeExpense } = expensesStore;

const expense = ref('');
const isExpenseFieldHasError = ref(false);
const expenseSchema = number().integer().required().min(1);

const monthDays = computed(() => getAllDaysByMonthId(getMonthByIndex.value.id));
const dailyBudget = computed(
  () => getMonthlyDailyBudget.value[getMonthByIndex.value.id].dailyBudget,
);
const monthlyExpenses = computed(() => getMonthlyExpenses(getMonthByIndex.value.id));
const monthBudget = computed(() => monthDays.value.length * dailyBudget.value);

const countProgressPercentage = (monthId: IMonth['id'] | undefined, dailyBudget: number) => {
  if (monthId === undefined) {
    return 0;
  }

  return Math.round(
    (monthlyExpenses.value.totalBudget / (monthDays.value.length * dailyBudget)) * 100,
  );
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
