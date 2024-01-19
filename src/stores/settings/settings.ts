import type { ISettingsStore, ICurrency } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsStore => ({
    currencies: useLocalStorage('budget.it:currencies', [
      {
        name: 'USD',
        isActive: true,
      },
      {
        name: 'EUR',
        isActive: false,
      },
      {
        name: 'RUB',
        isActive: false,
      },
      {
        name: 'THB',
        isActive: false,
      },
      {
        name: 'CNY',
        isActive: false,
      },
    ]),
    dailyBudget: useLocalStorage('budget.it:dailyBudget', 500),
  }),

  getters: {
    getActiveCurrencies(state): ICurrency {
      return state.currencies.filter((currency: ICurrency) => currency.isActive)[0];
    },
  },

  actions: {
    setActiveCurrency(name: ICurrency['name']) {
      this.currencies = this.currencies.map((currency: ICurrency) => {
        currency.isActive = currency.name === name;

        return currency;
      });
    },
    setDailyBudget(value: number) {
      this.dailyBudget = value;
    },
  },
});
