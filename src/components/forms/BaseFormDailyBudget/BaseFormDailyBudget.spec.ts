import type { ComponentWrapperType } from '@/types';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { useSettingsStore } from '@/stores';
import BaseFormDailyBudget from '@/components/forms/BaseFormDailyBudget/BaseFormDailyBudget.vue';

describe('BaseCurrencyAddForm', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const settingsStore = useSettingsStore();
  const { dailyBudget } = storeToRefs(settingsStore);

  let wrapper: ComponentWrapperType<typeof BaseFormDailyBudget>;

  const createComponent = () => {
    wrapper = mount(BaseFormDailyBudget);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should update daily budget', async () => {
    const form = wrapper.find('[data-test-id="daily-budget-form"]');
    const input = form.find('[id="daily-input"]');

    expect(dailyBudget.value).toBe(500);

    wrapper.vm.dailyBudgetInput.value = 1234;

    await input.setValue(wrapper.vm.dailyBudgetInput.value);
    await form.trigger('submit');

    expect(dailyBudget.value).toBe('1234');
  });
});
