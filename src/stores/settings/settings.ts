import type { IMonth } from '@/types';
import type { ISettingsStore, ICurrency } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { generateMonths } from '@/helpers';

export const useSettingsStore = defineStore('settings', {
  state: (): ISettingsStore => ({
    currencies: useLocalStorage('budget.it:currencies', [
      {
        name: '$',
        isActive: true,
        isDefault: true,
      },
      {
        name: '€',
        isActive: false,
        isDefault: true,
      },
      {
        name: '₽',
        isActive: false,
        isDefault: true,
      },
      {
        name: '฿',
        isActive: false,
        isDefault: true,
      },
      {
        name: '¥',
        isActive: false,
        isDefault: true,
      },
    ]),
    dailyBudget: useLocalStorage('budget.it:daily', 500),
    monthlyDailyBudget: useLocalStorage('budget.it:monthlyDailyBudget', {}),
  }),

  getters: {
    getMonthlyDailyBudget(state): Record<string, { dailyBudget: number }> {
      return state.monthlyDailyBudget;
    },
    getActiveCurrency(state): ICurrency {
      return state.currencies.filter((currency: ICurrency) => currency.isActive)[0];
    },
  },

  actions: {
    initMonthlyDailyBudgetObject() {
      if (Object.keys(this.monthlyDailyBudget).length !== 0) {
        return;
      }

      const monthsList = generateMonths(5);
      const nextMonth = generateMonths(0, 1);
      const allMonths = [...nextMonth, ...monthsList];

      allMonths.forEach((month: IMonth) => {
        this.monthlyDailyBudget[month.id] = {
          dailyBudget: this.dailyBudget,
        };
      });
    },
    setActiveCurrency(name: ICurrency['name']) {
      this.currencies = this.currencies.map((currency: ICurrency) => {
        currency.isActive = currency.name === name;

        return currency;
      });
    },
    setDailyBudget(value: number) {
      const currentMonth = new Date().toLocaleDateString().substring(3, 10).replace('.', '');

      if (!this.monthlyDailyBudget[currentMonth]) {
        throw new Error('Current month not found');
      }

      this.dailyBudget = Number(value);
      this.monthlyDailyBudget[currentMonth].dailyBudget = Number(value);
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
