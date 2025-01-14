import type { ICalendarStore, IDay } from '@/types';
import { defineStore } from 'pinia';
import { generateMonths, generateDays } from '@/helpers';

export const useCalendarStore = defineStore('calendar', {
  state: (): ICalendarStore => ({
    currentMonthIndex: 1,
    months: [],
    days: [],
  }),

  getters: {
    getMonthByIndex: (state) => {
      return state.months[state.currentMonthIndex];
    },
    getNextMonthsFromCurrent: (state) => {
      return state.months[state.currentMonthIndex - 1];
    },
    getPreviousMonthsFromCurrent: (state) => {
      return state.months[state.currentMonthIndex + 1];
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
    increaseCurrentMonthIndex() {
      this.currentMonthIndex += 1;
    },
    decreaseCurrentMonthIndex() {
      this.currentMonthIndex -= 1;
    },
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
