<template>
  <div class="expense-list">
    <template v-for="day in days" :key="day.id">
      <div v-if="!day.isFuture" class="expense-list__inner">
        <div class="expense-list__header" data-test-id="day-title">
          <div class="expense-list__date">
            {{ day.number }} {{ day.name }}

            <div
              v-if="day.isCurrent"
              data-test-id="current-day-indicator"
              class="icon icon_xs expense-list__indicator animate-pulse"
            />
          </div>

          <Transition name="slide-left">
            <div
              v-if="getDailyExpenses(day.id) !== 0"
              class="expense-list__limit"
              :class="{
                'expense-list__limit_exceeded': getDailyExpenses(day.id) > dailyBudget,
                'visually-hidden': getDailyExpenses(day.id) === 0,
              }"
              data-test-id="daily-expenses"
            >
              {{ getDailyExpenses(day.id) }} / {{ dailyBudget }}
            </div>
          </Transition>
        </div>

        <div
          v-for="(expenseItem, index) in expenses[day.id]"
          :key="index"
          class="expense-list__expenses"
          :class="{ 'expense-list__expenses_past': !day.isCurrent }"
        >
          <TransitionGroup name="list">
            <div v-for="expense in expenseItem" :key="expense.id">
              <BaseExpense
                :createdAt="expense.createdAt"
                :value="expense.value"
                :currency="expense.currency"
                @delete-item="removeItem(expense.id, day.id)"
              />
            </div>
          </TransitionGroup>

          <Transition>
            <div v-if="!expenses[day.id].items.length" class="expense-list__empty-message">
              <BaseEmptyListMessage>
                <template #icon>
                  <Coins class="icon icon_sm" />
                </template>
                <template #message> No expenses for this day </template>
              </BaseEmptyListMessage>
            </div>
          </Transition>

          <div v-if="day.isCurrent" class="expense-list__input" data-test-id="input-slot">
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
import type { IDay, IExpense } from '@/types';
import { Coins } from 'lucide-vue-next';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';

interface IProps {
  days: Array<IDay>;
  expenses: Record<string, Record<'items', Array<IExpense>>>;
  dailyBudget: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(['remove-item']);

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

<style scoped>
.expense-list {
  position: relative;
  display: grid;
  gap: 1rem;
  padding: 0.25rem;
  overflow: hidden;
  z-index: 0;
}

.expense-list__inner {
  position: relative;
}

.expense-list__header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 1rem 0;
  font-weight: bold;
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  background-color: var(--color-bg-surface);
  user-select: none;
}

.expense-list__date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #434449;
}

.expense-list__indicator {
  border-radius: var(--rounded-full);
  background-color: var(--color-bg-success);
}

.expense-list__limit {
  color: var(--color-bg-success);
  font-size: clamp(var(--typo-size-xs), 1.56vw, var(--typo-size-base));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: clamp(7.5rem, 32.25vw, 20rem);
}

.expense-list__limit_exceeded {
  color: var(--color-bg-alert);
}

.expense-list__expenses {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 2rem;
}

.expense-list__expenses_past {
  opacity: 0.4;
}

.expense-list__input {
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  z-index: 100;
}

.expense-list__empty-message {
  position: absolute;
  top: 60%;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
