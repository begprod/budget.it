import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCommonStore } from '@/stores/common/common';

describe('Common store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const commonStore = useCommonStore();
  const { lastCalendarUpdateDate, isAddExpenseInputVisible } = storeToRefs(commonStore);
  const { setLastUpdateDate, showAddExpenseInput, hideAddExpenseInput } = commonStore;

  it('should set last update date', () => {
    setLastUpdateDate('2021-08-01');

    expect(lastCalendarUpdateDate.value).toEqual('2021-08-01');
  });

  it('should show add expense input', () => {
    showAddExpenseInput();

    expect(isAddExpenseInputVisible.value).toEqual(true);
  });

  it('should hide add expense input', () => {
    hideAddExpenseInput();

    expect(isAddExpenseInputVisible.value).toEqual(false);
  });
});
