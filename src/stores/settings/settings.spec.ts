import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useSettingsStore } from '@/stores/settings/settings';

describe('Settings store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const settingsStore = useSettingsStore();
  const { currencies, dailyBudget, getMonthlyDailyBudget, getActiveCurrency } =
    storeToRefs(settingsStore);
  const {
    initMonthlyDailyBudgetObject,
    setActiveCurrency,
    setDailyBudget,
    addNewCurrency,
    deleteCurrency,
  } = settingsStore;

  it('should initialize monthly daily budget object', () => {
    initMonthlyDailyBudgetObject();

    expect(Object.keys(getMonthlyDailyBudget.value).length).toEqual(7);
  });

  it('should set active currency', () => {
    setActiveCurrency('€');

    expect(getActiveCurrency.value).toEqual({ name: '€', isActive: true, isDefault: true });
  });

  it('should set daily budget', () => {
    const currentMonth = Object.keys(getMonthlyDailyBudget.value).find(
      (key: string) => getMonthlyDailyBudget.value[key].isCurrent,
    );

    setDailyBudget(1000);

    const currentMonthDailyBudget = currentMonth
      ? getMonthlyDailyBudget.value[currentMonth].dailyBudget
      : NaN;

    expect(dailyBudget.value).toEqual(1000);
    expect(currentMonthDailyBudget).toEqual(1000);
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
