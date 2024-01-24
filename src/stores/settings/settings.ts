import type { ISettingsStore, ICurrency } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsStore => ({
    currencies: useLocalStorage('budget.it:currencies', [
      {
        name: 'USD',
        isActive: true,
        isDefault: true,
      },
      {
        name: 'EUR',
        isActive: false,
        isDefault: true,
      },
      {
        name: 'RUB',
        isActive: false,
        isDefault: true,
      },
      {
        name: 'THB',
        isActive: false,
        isDefault: true,
      },
      {
        name: 'CNY',
        isActive: false,
        isDefault: true,
      },
    ]),
    dailyBudget: useLocalStorage('budget.it:daily', 500),
  }),

  getters: {
    getActiveCurrency(state): ICurrency {
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
    addNewCurrency(name: ICurrency['name']) {
      this.currencies.push({
        name,
        isActive: false,
        isDefault: false,
      });
    },
    deleteCurrency(name: ICurrency['name']) {
      this.currencies = this.currencies.filter((currency: ICurrency) => currency.name !== name);
    },
  },
});
