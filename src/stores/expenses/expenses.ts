import type { IExpensesStore, IExpense, IMonth, IDay } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { defineStore, storeToRefs } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { useCalendarStore, useSettingsStore } from '@/stores';
import { getTime } from '@/helpers';

export const useExpensesStore = defineStore('expenses', {
  state: (): IExpensesStore => ({
    expenses: useLocalStorage('budget.it:expenses', {}),
  }),

  getters: {
    getMonthlyExpenses: (state) => (monthId: IMonth['id']) => {
      const expenseItems: Array<IExpense> = [];

      Object.keys(state.expenses).forEach((expense: IExpense['value']) => {
        if (!state.expenses[expense].items.length) {
          return;
        }

        const items = state.expenses[expense].items.filter(
          (item: IExpense) => item.monthId === monthId,
        );

        return expenseItems.push(...items);
      });

      const monthExpensesCounter = expenseItems.reduce(
        (acc: number, item: IExpense) => acc + Number(item.value),
        0,
      );

      return monthExpensesCounter;
    },
  },

  actions: {
    initExpensesObject() {
      this.createExpensesByDayObject();
      this.checkAndCleanupExpensesByDayObject();
    },
    createExpensesByDayObject() {
      const { days } = storeToRefs(useCalendarStore());

      days.value.forEach((day: IDay) => {
        if (!this.expenses[day.id]) {
          this.expenses[day.id] = {
            items: [],
          };
        }
      });
    },
    addExpense(value: IExpense['value']) {
      const { getCurrentDay } = storeToRefs(useCalendarStore());
      const { getActiveCurrency } = storeToRefs(useSettingsStore());

      const expense: IExpense = {
        id: uuidv4(),
        value: value,
        currency: getActiveCurrency.value.name,
        createdAt: getTime(),
        monthId: getCurrentDay.value?.monthId || '',
        dayId: getCurrentDay.value?.id || '',
      };

      this.expenses[expense.dayId].items.push(expense);
    },
    removeExpense(id: IExpense['id'], dayId: IExpense['dayId']) {
      this.expenses[dayId].items = this.expenses[dayId].items.filter(
        (expense: IExpense) => expense.id !== id,
      );
    },
    checkAndCleanupExpensesByDayObject() {
      const { months } = storeToRefs(useCalendarStore());
      const monthsIds = months.value.map((month: IMonth) => month.id);

      for (const day in this.expenses) {
        if (!monthsIds.includes(day.substring(2))) {
          delete this.expenses[day];
        }
      }
    },
  },
});
