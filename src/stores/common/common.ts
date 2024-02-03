import type { ICommonStore } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCommonStore = defineStore('common', {
  state: (): ICommonStore => ({
    lastCalendarUpdateDate: useLocalStorage('budget.it:lastUpdateDate', ''),
  }),

  actions: {
    setLastUpdateDate(date: string) {
      this.lastCalendarUpdateDate = date;
    },
  },
});
