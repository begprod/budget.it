<template>
  <div
    v-if="month"
    class="sticky top-[52px] flex flex-col py-5 px-5 gradient lg:!bg-none lg:bg-white text-white lg:text-slate-700 rounded-tl-3xl rounded-tr-3xl z-40"
  >
    <div class="mb-2">
      <div class="mb-2 text-xl" data-test-id="month-title">{{ month.name }}</div>
      <div class="text-4xl font-bold" data-test-id="monthly-expenses">
        {{ monthExpenses }}
      </div>
    </div>
    <div class="w-full">
      <div class="flex justify-between text-xs">
        <div class="flex">
          <div class="mr-2 font-bold">Monthly budget:</div>
          <div data-test-id="monthly-budget">
            {{ monthDays.length * dailyBudget }}
          </div>
        </div>
        <div class="font-bold" data-test-id="monthly-percents">
          {{ countProgressPercentage(month.id, dailyBudget) }}%
        </div>
      </div>
      <BaseProgressBar :percentage="countProgressPercentage(month.id, dailyBudget)" />
    </div>
  </div>

  <div v-if="month" class="relative grid gap-3 p-5 z-0">
    <template v-for="day in monthDays" :key="day.id">
      <div v-if="!day.isFuture" class="relative">
        <div
          class="sticky top-[200px] flex flex-col items-start py-3 bg-white font-bold select-none z-40"
        >
          <div class="flex">
            <div class="flex flex-col">
              <div class="flex items-center text-sm lg:text-base" data-test-id="day-title">
                {{ day.number }} {{ day.name }}
                <div
                  v-if="day.isCurrent"
                  data-test-id="current-day-indicator"
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
            data-test-id="daily-expenses"
          >
            {{ getDailyExpenses(day.id) }} /
            {{ dailyBudget }}
          </div>
        </div>

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
                @click="removeItem(expense.id, day.id)"
              />
            </template>
          </TransitionGroup>

          <div v-if="!expenses[day.id].items.length" class="flex items-center w-full">
            <BaseEmptyListMessage message="No expenses for this day" />
          </div>

          <div v-if="day.isCurrent" class="absolute bottom-0 w-full" data-test-id="input-slot">
            <Transition>
              <slot name="input" />
            </Transition>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IDay, IExpense, IMonth } from '@/types';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

interface IProps {
  month: IMonth;
  monthDays: Array<IDay>;
  monthExpenses: number;
  dailyBudget: number;
  expenses: Record<string, Record<'items', Array<IExpense>>>;
}

const emit = defineEmits(['remove-item']);

const props = defineProps<IProps>();

const countProgressPercentage = (monthId: IMonth['id'] | undefined, dailyBudget: number) => {
  if (monthId === undefined) {
    return 0;
  }

  return Math.round((props.monthExpenses / (props.monthDays.length * dailyBudget)) * 100);
};

const getDailyExpenses = (dayId: IDay['id']) => {
  const expenseItems: Array<IExpense> = [];

  Object.keys(props.expenses).forEach((expense: IExpense['value']) => {
    if (!props.expenses[expense].items.length) {
      return;
    }

    const items = props.expenses[expense].items.filter((item: IExpense) => item.dayId === dayId);

    return expenseItems.push(...items);
  });

  const dayExpensesCounter = expenseItems.reduce(
    (acc: number, item: IExpense) => acc + Number(item.value),
    0,
  );

  return dayExpensesCounter;
};

const removeItem = (id: string, dayId: string) => {
  emit('remove-item', id, dayId);
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
