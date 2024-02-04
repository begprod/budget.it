<template>
  <BaseDateWrapper v-for="month in months" :key="month.id">
    <template #title>
      <div
        class="sticky top-[50px] flex flex-col py-4 text-2xl text-slate-700 font-bold bg-white select-none z-50"
      >
        {{ month.name }}

        <BaseProgressBar
          :label="`
            ${getMonthlyExpenses(month.id)} / ${getDaysByMonthId(month.id).length * dailyBudget}
          `"
          :percentage="countProgressPercentage(month.id)"
          :show-total="!month.isCurrent"
        />
      </div>
    </template>

    <template #content>
      <div class="grid gap-3">
        <BaseDateWrapper v-for="day in getDaysByMonthId(month.id)" :key="day.id">
          <template #title>
            <div
              class="sticky top-[110px] flex flex-col items-start py-3 bg-white font-bold select-none z-40"
              :class="{
                'current-day': day.isCurrent,
              }"
            >
              <div class="flex items-center">
                {{ day.number }}
                {{ day.name }}

                <div
                  v-if="day.isCurrent"
                  class="shrink-0 w-2 h-2 ml-2 rounded-full bg-green-500 select-none animate-pulse"
                />
              </div>

              <div
                class="text-xs opacity-70"
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
              class="flex flex-wrap gap-1"
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
            </div>

            <div v-if="!expenses[day.id].items.length" class="flex items-center w-full">
              <BaseEmptyListMessage message="No expenses for this day" />
            </div>
          </template>
        </BaseDateWrapper>
      </div>
    </template>
  </BaseDateWrapper>
</template>

<script setup lang="ts">
import type { IMonth } from '@/types';
import { storeToRefs } from 'pinia';
import { useCalendarStore, useExpensesStore, useSettingsStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const settingsStore = useSettingsStore();

const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
const { getDailyExpenses, getMonthlyExpenses, removeExpense } = expensesStore;
const { dailyBudget } = storeToRefs(settingsStore);

const countProgressPercentage = (monthId: IMonth['id']) => {
  const monthExpensesCounter = getMonthlyExpenses(monthId);

  if (monthExpensesCounter > getDaysByMonthId(monthId).length * dailyBudget.value) {
    return 100;
  }

  return (monthExpensesCounter / (getDaysByMonthId(monthId).length * dailyBudget.value)) * 100;
};
</script>

<style scoped lang="scss">
.current-day {
  scroll-margin-top: 120px;
}
</style>
