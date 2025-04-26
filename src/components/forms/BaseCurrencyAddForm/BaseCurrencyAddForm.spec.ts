import type { ComponentWrapperType } from '@/types';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { useSettingsStore } from '@/stores';
import BaseCurrencyAddForm from '@/components/forms/BaseCurrencyAddForm/BaseCurrencyAddForm.vue';

describe('BaseCurrencyAddForm', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const settingsStore = useSettingsStore();
  const { currencies } = storeToRefs(settingsStore);

  let wrapper: ComponentWrapperType<typeof BaseCurrencyAddForm>;

  const createComponent = () => {
    wrapper = mount(BaseCurrencyAddForm);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should add new value if field is filled', async () => {
    const form = wrapper.find('[data-test-id="currency-add-form"]');
    const input = form.find('[id="currency-input"]');

    input.setValue('123');
    await form.trigger('submit');

    expect(currencies.value[currencies.value.length - 1].name).toBe('123');
    expect(currencies.value[currencies.value.length - 1].isActive).toBe(false);
    expect(currencies.value[currencies.value.length - 1].isDefault).toBe(false);
  });
});
