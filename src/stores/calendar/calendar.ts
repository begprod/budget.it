import type { ICalendarStore, IDay } from '@/types';
import { defineStore } from 'pinia';
import { generateMonths, generateDays } from '@/helpers';

export const useCalendarStore = defineStore('calendar', {
  state: (): ICalendarStore => ({
    months: [],
    days: [],
  }),

  getters: {
    getCurrentMonths: (state) => {
      return state.months.filter((month) => !month.isFuture);
    },
    getAllDaysByMonthId:
      (state) =>
      (monthId: string): Array<IDay> => {
        return state.days.filter((day) => day.monthId === monthId);
      },
    getCurrentDay: (state) => {
      return state.days.find((day) => day.isCurrent);
    },
  },

  actions: {
    initCalendar() {
      const monthsList = generateMonths(5);
      const daysList = generateDays(monthsList);
      const nextMonth = generateMonths(0, 1);
      const nextMonthDays = generateDays(nextMonth);

      this.months = [...nextMonth, ...monthsList];
      this.days = [...nextMonthDays, ...daysList];
    },
  },
});
