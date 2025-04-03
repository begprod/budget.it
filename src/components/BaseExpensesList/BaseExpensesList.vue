<template>
  <div v-if="month" class="stats-panel gradient">
    <div class="stats-panel__inner">
      <div class="stats-panel__header">
        <div class="stats-panel__title" data-test-id="month-title">{{ month.name }}</div>
        <div class="stats-panel__overall" data-test-id="monthly-expenses">
          {{ monthExpenses }}
        </div>
      </div>
      <div class="stats-panel__footer">
        <div data-test-id="monthly-budget">Monthly budget: {{ overAllExpneses }}</div>

        <div data-test-id="monthly-percents">
          {{ countProgressPercentage(month.id, dailyBudget) }}%
        </div>
      </div>

      <BaseProgressBar :percentage="countProgressPercentage(month.id, dailyBudget)" />
    </div>
  </div>

  <div v-if="month" class="expense-list">
    <template v-for="day in monthDays" :key="day.id">
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

          <Transition name="slide-up">
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
            <template v-for="expense in expenseItem" :key="expense.id">
              <BaseExpense
                :createdAt="expense.createdAt"
                :value="expense.value"
                :currency="expense.currency"
                @delete-item="removeItem(expense.id, day.id)"
              />
            </template>
          </TransitionGroup>

          <div v-if="!expenses[day.id].items.length" class="expense-list__empty-message">
            <BaseEmptyListMessage>
              <template #icon>
                <Coins class="icon icon_sm" />
              </template>
              <template #message> No expenses for this day </template>
            </BaseEmptyListMessage>
          </div>

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
import type { IDay, IExpense, IMonth } from '@/types';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';
import { Coins } from 'lucide-vue-next';
import { computed } from 'vue';

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

const overAllExpneses = computed(() => props.monthDays.length * props.dailyBudget);

const removeItem = (id: string, dayId: string) => {
  emit('remove-item', id, dayId);
};
</script>

<style scoped>
.stats-panel {
  position: sticky;
  top: 52px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  color: var(--slate-700);
  background-color: var(--white);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  z-index: 40;
}

.stats-panel__inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stats-panel__header,
.stats-panel__footer {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stats-panel__footer {
  flex-direction: row;
  justify-content: space-between;
  font-size: var(--typo-size-xs);
}

.stats-panel__title {
  font-size: var(--typo-size-xl);
}

.stats-panel__overall {
  line-height: 1;
  font-size: var(--typo-size-4xl);
  font-weight: bold;
}

.expense-list {
  position: relative;
  display: grid;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  z-index: 0;
}

.expense-list__inner {
  position: relative;
}

.expense-list__header {
  position: sticky;
  top: 200px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  font-weight: bold;
  font-size: clamp(var(--typo-size-sm), 1.56vw, var(--typo-size-base));
  background-color: var(--white);
  user-select: none;
  z-index: 40;
}

.expense-list__date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.expense-list__indicator {
  border-radius: 100%;
  background-color: var(--green-500);
}

.expense-list__limit {
  color: var(--green-500);
  font-size: clamp(var(--typo-size-xs), 1.56vw, var(--typo-size-base));
}

.expense-list__limit_exceeded {
  color: var(--red-400);
}

.expense-list__expenses {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.expense-list__expenses_past {
  opacity: 0.3;
}

.expense-list__input {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.expense-list__empty-message {
  display: flex;
  align-items: center;
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .stats-panel {
    color: var(--white);
  }

  .gradient {
    background-image: linear-gradient(180deg, #19a4f8 0%, #006396 100%);
  }
}
</style>
