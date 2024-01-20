import type { ISettingsStore, ICurrency } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsStore => ({
    currencies: useLocalStorage('budget.it:currencies', [
      {
        name: 'USD',
        isActive: true,
        isDeletable: false,
      },
      {
        name: 'EUR',
        isActive: false,
        isDeletable: false,
      },
      {
        name: 'RUB',
        isActive: false,
        isDeletable: false,
      },
      {
        name: 'THB',
        isActive: false,
        isDeletable: false,
      },
      {
        name: 'CNY',
        isActive: false,
        isDeletable: false,
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
    addNewCurrency(name: ICurrency['name']) {
      this.currencies.push({
        name,
        isActive: false,
        isDeletable: true,
      });
    },
    deleteCurrency(name: ICurrency['name']) {
      console.log('deleteCurrency', name);

      this.currencies = this.currencies.filter((currency: ICurrency) => currency.name !== name);
    },
  },
});
