import type { IExpensesStore, IExpense } from '@/types';
import uniqid from 'uniqid';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';


export const useExpensesStore = defineStore('calendar', {
  state: (): IExpensesStore => ({
    expenses: useLocalStorage('budget.it:expenses', {})
  }),

  actions: {
    addExpense() {
      console.log('addExpense');

    },
    removeExpense() {
      console.log('removeExpense');
    },
  },
});
