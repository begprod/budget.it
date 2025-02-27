import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCalendarStore } from '@/stores/calendar/calendar';
import { useSettingsStore } from '@/stores/settings/settings';

describe('Settings store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const calendarStore = useCalendarStore();
  const settingsStore = useSettingsStore();
  const { currencies, dailyBudget, getMonthlyDailyBudget, getActiveCurrency } =
    storeToRefs(settingsStore);
  const { initCalendar } = calendarStore;
  const {
    initMonthlyDailyBudgetObject,
    setActiveCurrency,
    setDailyBudget,
    addNewCurrency,
    deleteCurrency,
  } = settingsStore;

  it('should initialize monthly daily budget object', () => {
    initCalendar();
    initMonthlyDailyBudgetObject();

    expect(Object.keys(getMonthlyDailyBudget.value).length).toEqual(7);
  });

  it('should set active currency', () => {
    setActiveCurrency('€');

    expect(getActiveCurrency.value).toEqual({ name: '€', isActive: true, isDefault: true });
  });

  it('should set daily budget', () => {
    const currentMonth = new Date().toLocaleDateString().substring(3, 10).replace('.', '');

    setDailyBudget(1000);

    expect(
      getMonthlyDailyBudget.value[Object.keys(getMonthlyDailyBudget.value)[0]].dailyBudget,
    ).toEqual(500);
    expect(dailyBudget.value).toEqual(1000);
    expect(getMonthlyDailyBudget.value[currentMonth].dailyBudget).toEqual(1000);
  });

  it('should add new currency', () => {
    addNewCurrency('₿');

    expect(currencies.value).toEqual([
      { name: '$', isActive: false, isDefault: true },
      { name: '€', isActive: true, isDefault: true },
      { name: '₽', isActive: false, isDefault: true },
      { name: '฿', isActive: false, isDefault: true },
      { name: '¥', isActive: false, isDefault: true },
      { name: '₿', isActive: false, isDefault: false },
    ]);
  });

  it('should delete currency', () => {
    deleteCurrency('₿');

    expect(currencies.value).toEqual([
      { name: '$', isActive: false, isDefault: true },
      { name: '€', isActive: true, isDefault: true },
      { name: '₽', isActive: false, isDefault: true },
      { name: '฿', isActive: false, isDefault: true },
      { name: '¥', isActive: false, isDefault: true },
    ]);
  });
});
