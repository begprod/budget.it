import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useExpensesStore, useCalendarStore } from '@/stores';

describe('Expenses store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const expensesStore = useExpensesStore();
  const calendarStore = useCalendarStore();
  const { expenses, getDailyExpenses } = storeToRefs(expensesStore);
  const { initExpensesObject, addExpense, removeExpense } = expensesStore;
  const { days, getCurrentDay } = storeToRefs(calendarStore);
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

  it('should calculate daily expenses', () => {
    addExpense(100);
    addExpense(200);

    expect(getDailyExpenses.value(getCurrentDay.value?.id ?? '')).toEqual(500);
  });
});
