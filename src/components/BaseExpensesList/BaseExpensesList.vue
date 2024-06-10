<template>
  <BaseDateWrapper v-for="month in getCurrentMonths" :key="month.id">
    <template #title>
      <div
        class="sticky top-[52px] flex flex-col py-5 px-5 gradient lg:!bg-none lg:bg-white text-white lg:text-slate-700 rounded-tl-3xl rounded-tr-3xl z-40"
      >
        <div class="mb-2">
          <div class="mb-2 text-xl" data-testid="month-title">{{ month.name }}</div>
          <div class="text-4xl font-bold" data-testid="monthly-expenses">
            {{ getMonthlyExpenses(month.id) }}
          </div>
        </div>
        <div class="w-full">
          <div class="flex justify-between text-xs">
            <div class="flex">
              <div class="mr-2 font-bold">Monthly budget:</div>
              <div data-testid="monthly-budget">
                {{ getAllDaysByMonthId(month.id).length * dailyBudget }}
              </div>
            </div>
            <div class="font-bold" data-testid="monthly-percents">
              {{ countProgressPercentage(month.id) }}%
            </div>
          </div>
          <BaseProgressBar :percentage="countProgressPercentage(month.id)" />
        </div>
      </div>
    </template>

    <template #content>
      <div class="relative grid gap-3 p-5 z-0 last:pb-14">
        <BaseDateWrapper
          v-for="day in getDaysByMonthIdWidthOutFutureDays(month.id)"
          :key="day.id"
          class="relative"
        >
          <template #title>
            <div
              class="sticky top-[200px] flex flex-col items-start py-1 bg-white font-bold select-none z-40"
            >
              <div class="flex">
                <div class="flex flex-col">
                  <div class="flex items-center text-sm lg:text-base" data-testid="day-title">
                    {{ day.number }} {{ day.name }}
                    <div
                      v-if="day.isCurrent"
                      data-testid="current-day-indicator"
                      class="shrink-0 w-2 h-2 ml-2 rounded-full bg-green-500 select-none animate-pulse"
                    />
                  </div>
                </div>
              </div>

              <div
                class="text-xs lg:text-sm"
                :class="{
                  'text-emerald-500': getDailyExpenses(day.id) <= dailyBudget,
                  'text-rose-500': getDailyExpenses(day.id) > dailyBudget,
                  hidden: getDailyExpenses(day.id) === 0,
                }"
                data-testid="daily-expenses"
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
              <TransitionGroup name="list">
                <template v-for="expense in expenseItem" :key="expense.id">
                  <BaseExpense
                    :createdAt="expense.createdAt"
                    :value="expense.value"
                    :currency="expense.currency"
                    :class="{ 'opacity-30': !day.isCurrent }"
                    @click="removeExpense(expense.id, day.id)"
                  />
                </template>
              </TransitionGroup>

              <div v-if="!expenses[day.id].items.length" class="flex items-center w-full">
                <BaseEmptyListMessage message="No expenses for this day" />
              </div>

              <Transition>
                <BaseFormBar
                  v-if="day.isCurrent && isAddExpenseInputVisible"
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
              </Transition>
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
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();

const { isAddExpenseInputVisible } = storeToRefs(commonStore);
const { expenses } = storeToRefs(expensesStore);
const { getActiveCurrency, dailyBudget } = storeToRefs(settingsStore);
const { getCurrentMonths } = storeToRefs(calendarStore);
const { hideAddExpenseInput } = commonStore;
const { getAllDaysByMonthId, getDaysByMonthIdWidthOutFutureDays } = calendarStore;
const { getMonthlyExpenses, getDailyExpenses, addExpense, removeExpense } = expensesStore;

const expense = ref('');
const isExpenseFieldHasError = ref(false);
const expenseSchema = number().integer().required().min(1);

const countProgressPercentage = (monthId: IMonth['id'] | undefined) => {
  if (monthId === undefined) {
    return 0;
  }

  const monthExpensesCounter = getMonthlyExpenses(monthId);

  return Math.round(
    (monthExpensesCounter / (getAllDaysByMonthId(monthId).length * dailyBudget.value)) * 100,
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

<style scoped lang="scss">
.gradient {
  background-image: linear-gradient(180deg, #19a4f8 0%, #006396 100%);
}

.v-enter-active,
.v-leave-active {
  transform: translateY(0);
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.5);
  transition: all 0.5s ease;
}

.list-leave-active {
  position: absolute;
  transition: all 0.5s ease;
}
</style>
