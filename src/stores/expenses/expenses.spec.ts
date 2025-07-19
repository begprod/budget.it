import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useExpensesStore, useCalendarStore } from '@/stores';

describe('Expenses store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const expensesStore = useExpensesStore();
  const calendarStore = useCalendarStore();
  const { expenses } = storeToRefs(expensesStore);
  const { initExpensesObject, addExpense, removeExpense, getMonthlyExpenses } = expensesStore;
  const { days, getCurrentDay, currentMonthIndex, months } = storeToRefs(calendarStore);
  const { initCalendar } = calendarStore;

  initCalendar();

  it('should initialize expenses object', () => {
    initExpensesObject();

    expect(Object.keys(expenses.value).length).toEqual(days.value.length);
  });

  it('should add expense', () => {
    addExpense(100);
    addExpense(200);

    expect(expenses.value[getCurrentDay.value?.id ?? ''].items.length).toEqual(2);
    expect(expenses.value[getCurrentDay.value?.id ?? ''].items[0].value).toEqual(100);
  });

  it('should remove expense', () => {
    removeExpense(
      expenses.value[getCurrentDay.value?.id ?? ''].items[0].id,
      getCurrentDay.value?.id ?? '',
    );

    expect(expenses.value[getCurrentDay.value?.id ?? ''].items.length).toEqual(1);
    expect(expenses.value[getCurrentDay.value?.id ?? ''].items[0].value).toEqual(200);
  });

  it('should return total by curreny and total overall', () => {
    addExpense(300);

    expect(getMonthlyExpenses(months.value[currentMonthIndex.value].id).totalBudget).toBe(500);
    expect(
      getMonthlyExpenses(months.value[currentMonthIndex.value].id).totalsByCurrency[0].currency,
    ).toBe('$');
    expect(
      getMonthlyExpenses(months.value[currentMonthIndex.value].id).totalsByCurrency[0].value,
    ).toBe(500);
  });
});
