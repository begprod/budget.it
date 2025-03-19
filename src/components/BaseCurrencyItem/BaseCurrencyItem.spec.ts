import type { ComponentWrapperType } from '@/types';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseCurrencyItem from '@/components/BaseCurrencyItem/BaseCurrencyItem.vue';

describe('BaseCurrencyGroupItem', () => {
  let wrapper: ComponentWrapperType<typeof BaseCurrencyItem>;

  const createComponent = () => {
    wrapper = mount(BaseCurrencyItem, {
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

  it('should show X icon if custom currency not selected', async () => {
    await wrapper.setProps({ isDefault: false, isSelected: true });

    const lockIcon = wrapper.find('.lucide-lock-icon');
    const xIcon = wrapper.find('.lucide-xicon');

    expect(lockIcon.exists()).toBe(true);
    expect(xIcon.exists()).toBe(false);
  });

  it('should show Lock icon if custom currency is selected', async () => {
    await wrapper.setProps({ isDefault: false, isSelected: false });

    const lockIcon = wrapper.find('.lucide-lock-icon');
    const xIcon = wrapper.find('.lucide-xicon');

    expect(lockIcon.exists()).toBe(false);
    expect(xIcon.exists()).toBe(true);
  });
});
