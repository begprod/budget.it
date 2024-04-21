import type { ComponentWrapperType } from '@/types';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseCurrencyGroupItem from '@/components/BaseCurrencyGroupItem/BaseCurrencyGroupItem.vue';

describe('BaseCurrencyGroupItem', () => {
  let wrapper: ComponentWrapperType<typeof BaseCurrencyGroupItem>;

  const createComponent = () => {
    wrapper = shallowMount(BaseCurrencyGroupItem, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      props: {
        id: '1',
        name: 'currencies',
        label: '$',
        value: '$',
        isSelected: false,
        isDefault: true,
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain the correct props', () => {
    expect(wrapper.props('id')).toBe('1');
    expect(wrapper.props('name')).toBe('currencies');
    expect(wrapper.props('label')).toBe('$');
    expect(wrapper.props('value')).toBe('$');
    expect(wrapper.props('isSelected')).toBe(false);
    expect(wrapper.props('isDefault')).toBe(true);
  });

  it('should not show control if isDefault is false', async () => {
    expect(wrapper.findComponent(BaseButton).exists()).toBe(false);
  });

  it('should show control if isDefault is false', async () => {
    await wrapper.setProps({ isDefault: false });

    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });
});
