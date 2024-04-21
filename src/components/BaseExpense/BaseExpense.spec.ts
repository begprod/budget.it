import type { ComponentWrapperType } from '@/types';
import { nextTick } from 'vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';

describe('BaseExpense', () => {
  let wrapper: ComponentWrapperType<typeof BaseExpense>;

  const createComponent = () => {
    wrapper = shallowMount(BaseExpense, {
      props: {
        value: '100',
        currency: 'USD',
        createdAt: '10:00',
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
    expect(wrapper.props('value')).toBe('100');
    expect(wrapper.props('currency')).toBe('USD');
    expect(wrapper.props('createdAt')).toBe('10:00');
  });

  it('should show control', async () => {
    wrapper.vm.showControls();

    await nextTick();

    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
  });

  it('should emit click event when control clicked', async () => {
    wrapper.vm.showControls();

    await nextTick();
    await wrapper.findComponent(BaseButton).trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
