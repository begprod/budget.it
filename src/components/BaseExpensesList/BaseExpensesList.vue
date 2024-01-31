<template>
  <BaseDateWrapper v-for="month in months" :key="month.id">
    <template #title>
      <div
        class="sticky top-[50px] flex flex-col py-4 text-2xl text-slate-700 font-bold bg-white select-none z-50"
      >
        {{ month.name }}

        <div
          class="progress-bar relative flex items-center justify-center h-3 text-xs text-slate-700 rounded-[4px] overflow-hidden"
          :class="{
            'opacity-20': !month.isCurrent,
          }"
        >
          <div
            class="progress-bar__background absolute top-0 left-0 w-full h-full"
            :class="{
              'progress-bar__background_overfilled':
                countMonthsExpenses(month.id) >= getDaysByMonthId(month.id).length * dailyBudget,
            }"
            :style="{
              'background-size': `${countProgressPercentage(month.id)}%`,
            }"
          />
          <span class="opacity-60">
            {{ countMonthsExpenses(month.id) }} /
            {{ getDaysByMonthId(month.id).length * dailyBudget }}
          </span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="grid gap-3">
        <BaseDateWrapper v-for="day in getDaysByMonthId(month.id)" :key="day.id">
          <template #title>
            <div
              class="sticky top-[110px] flex items-center py-3 bg-white font-bold select-none z-40"
              :class="{
                'current-day': day.isCurrent,
              }"
            >
              {{ day.number }}
              {{ day.name }}
              <div
                v-if="day.isCurrent"
                class="shrink-0 w-2 h-2 ml-2 rounded-full bg-green-500 select-none animate-pulse"
              />
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
import type { IMonth, IExpense } from '@/types';
import { storeToRefs } from 'pinia';
import { useCalendarStore, useExpensesStore, useSettingsStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const settingsStore = useSettingsStore();

const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
const { removeExpense } = expensesStore;
const { dailyBudget } = storeToRefs(settingsStore);

const countMonthsExpenses = (monthId: IMonth['id']) => {
  const expenseItems: Array<IExpense> = [];

  Object.keys(expenses.value).forEach((expense: IExpense['value']) => {
    if (!expenses.value[expense].items.length) {
      return;
    }

    const items = expenses.value[expense].items.filter(
      (item: IExpense) => item.monthId === monthId,
    );

    return expenseItems.push(...items);
  });

  const monthExpensesCounter = expenseItems.reduce(
    (acc: number, item: IExpense) => acc + Number(item.value),
    0,
  );

  return monthExpensesCounter;
};

const countProgressPercentage = (monthId: IMonth['id']) => {
  const monthExpensesCounter = countMonthsExpenses(monthId);

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

.progress-bar {
  &__background {
    background-image: linear-gradient(43deg, #85ffbd 0%, #00dbde 46%, #0093e9 100%);
    background-repeat: no-repeat;
    transition: background-size 0.5s ease-in-out;

    &_overfilled {
      background-image: linear-gradient(43deg, #ff0000 0%, #ff0000 46%, #ff0000 100%);
    }
  }
}
</style>
