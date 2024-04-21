import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useSettingsStore } from '@/stores/settings/settings';

describe('Settings store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const settingsStore = useSettingsStore();
  const { currencies, dailyBudget, getActiveCurrency } = storeToRefs(settingsStore);
  const { setActiveCurrency, setDailyBudget, addNewCurrency, deleteCurrency } = settingsStore;

  it('should set active currency', () => {
    setActiveCurrency('€');

    expect(getActiveCurrency.value).toEqual({ name: '€', isActive: true, isDefault: true });
  });

  it('should set daily budget', () => {
    setDailyBudget(1000);

    expect(dailyBudget.value).toEqual(1000);
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
