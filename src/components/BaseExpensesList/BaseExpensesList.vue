<template>
  <BaseDateWrapper v-for="month in months" :key="month.id">
    <template #title>
      <div class="sticky top-[calc(100%-100px)] flex flex-col text-2xl bg-white select-none z-50">
        <BaseProgressBar
          class="shadow-md"
          :label="`${month.name} – ${countMonthlyExpenses(month.id)}`"
          :percentage="countProgressPercentage(month.id)"
        />
      </div>
    </template>

    <template #content>
      <div class="grid gap-3">
        <BaseDateWrapper v-for="day in getDaysByMonthId(month.id)" :key="day.id" class="last:mb-12">
          <template #title>
            <div
              class="sticky top-[52px] flex flex-col items-start py-1 bg-white font-bold select-none z-40"
              :class="{
                'current-day': day.isCurrent,
              }"
            >
              <div class="flex">
                <div class="flex flex-col">
                  <div class="flex items-center text-sm lg:text-base">
                    {{ day.number }} {{ day.name }}
                    <div
                      v-if="day.isCurrent"
                      class="shrink-0 w-2 h-2 ml-2 rounded-full bg-green-500 select-none animate-pulse"
                    />
                  </div>
                </div>
              </div>

              <div
                class="text-xs lg:text-sm opacity-70"
                :class="{
                  'text-emerald-400': getDailyExpenses(day.id) <= dailyBudget,
                  'text-rose-400': getDailyExpenses(day.id) > dailyBudget,
                  hidden: getDailyExpenses(day.id) === 0,
                }"
              >
                {{ getDailyExpenses(day.id) }} / {{ dailyBudget }}
              </div>
            </div>
          </template>

          <template #content>
            <div
              v-for="(expenseItem, index) in expenses[day.id]"
              :key="index"
              class="flex flex-wrap gap-2"
            >
              <div v-for="expense in expenseItem" :key="expense.id">
                <BaseExpense
                  :createdAt="expense.createdAt"
                  :value="expense.value"
                  :currency="expense.currency"
                  :class="{ 'opacity-30': !day.isCurrent }"
                  @click="removeExpense(expense.id, day.id)"
                />
              </div>

              <div v-if="!expenses[day.id].items.length" class="flex items-center w-full">
                <BaseEmptyListMessage message="No expenses for this day" />
              </div>

              <BaseFormBar
                v-if="day.isCurrent"
                @submit="submitExpense(expense)"
                class="w-full rounded-xl shadow-md mt-3"
              >
                <template #input>
                  <BaseInput
                    id="expense-input"
                    v-model="expense"
                    type="number"
                    inputmode="numeric"
                    :placeholder="`Enter expense (${getActiveCurrency.name})`"
                    :has-error="isExpenseFieldHasError"
                  />
                </template>
                <template #button>
                  <BaseButton title="Add expense" @click="submitExpense(expense)">
                    <template #leftIcon>
                      <BanknotesIcon class="w-5 h-5" />
                    </template>
                  </BaseButton>
                </template>
              </BaseFormBar>
            </div>
          </template>
        </BaseDateWrapper>
      </div>
    </template>
  </BaseDateWrapper>
</template>

<script setup lang="ts">
import type { IMonth } from '@/types';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { number } from 'yup';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
import { useCalendarStore, useExpensesStore, useSettingsStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const settingsStore = useSettingsStore();

const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
const { getDailyExpenses, getMonthlyExpenses, addExpense, removeExpense } = expensesStore;
const { getActiveCurrency, dailyBudget } = storeToRefs(settingsStore);

const expense = ref('');
const isExpenseFieldHasError = ref(false);
const expenseSchema = number().integer().required().min(1);

const countProgressPercentage = (monthId: IMonth['id']) => {
  const monthExpensesCounter = getMonthlyExpenses(monthId);

  if (monthExpensesCounter > getDaysByMonthId(monthId).length * dailyBudget.value) {
    return 100;
  }

  return (monthExpensesCounter / (getDaysByMonthId(monthId).length * dailyBudget.value)) * 100;
};

const countMonthlyExpenses = (monthId: IMonth['id']) => {
  return `${getMonthlyExpenses(monthId)} / ${getDaysByMonthId(monthId).length * dailyBudget.value}`;
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

<style scoped lang="scss">
.current-day {
  scroll-margin-top: 52px;
}
</style>
