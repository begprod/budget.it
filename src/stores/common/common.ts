import type { ICommonStore, IToast } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCommonStore = defineStore('common', {
  state: (): ICommonStore => ({
    lastCalendarUpdateDate: useLocalStorage('budget.it:lastUpdateDate', ''),
    isAddExpenseInputVisible: false,
    toast: {
      type: 'default',
      message: '',
      duration: 3,
    },
  }),

  getters: {
    getToast: (state) => state.toast,
  },

  actions: {
    setLastUpdateDate(date: string) {
      this.lastCalendarUpdateDate = date;
    },
    showAddExpenseInput() {
      this.isAddExpenseInputVisible = true;
    },
    hideAddExpenseInput() {
      this.isAddExpenseInputVisible = false;
    },
    setToast(toast: IToast) {
      this.toast = toast;
    },
  },
});
