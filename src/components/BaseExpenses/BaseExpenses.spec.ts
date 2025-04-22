import type { ComponentWrapperType } from '@/types';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { useSettingsStore, useCalendarStore } from '@/stores';
import BaseExpenses from '@/components/BaseExpenses/BaseExpenses.vue';
import BaseStatsPanel from '@/components/BaseStatsPanel/BaseStatsPanel.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';

describe('BaseExpenses', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const settingsStore = useSettingsStore();
  const calendarStore = useCalendarStore();

  const { initCalendar } = calendarStore;
  const { initMonthlyDailyBudgetObject } = settingsStore;

  initCalendar();

  initMonthlyDailyBudgetObject();

  let wrapper: ComponentWrapperType<typeof BaseExpenses>;

  const createComponent = () => {
    wrapper = shallowMount(BaseExpenses);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render stats panel', () => {
    expect(wrapper.findComponent(BaseStatsPanel).exists()).toBe(true);
  });

  it('should render expense list', () => {
    expect(wrapper.findComponent(BaseExpensesList).exists()).toBe(true);
  });
});
