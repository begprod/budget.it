import type { ISettingsStore } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsStore => ({
    currencies: useLocalStorage('budget.it:currencies', ['USD', 'EUR', 'RUB', 'THB', 'CNY']),
  }),
});
