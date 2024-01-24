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

  actions: {
    initExpensesObject() {
      const { shouldGenerateNextMonth } = storeToRefs(useCalendarStore());

      if (shouldGenerateNextMonth || !this.expenses || Object.keys(this.expenses).length === 0) {
        this.createExpensesByDayObject();
      }

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
        dayId: getCurrentDay.value?.id || '',
      };

      this.expenses[expense.dayId].items.push(expense);
    },
    removeExpense() {
      console.log('removeExpense');
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
