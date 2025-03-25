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

  it('should show control and item have active class', async () => {
    wrapper.vm.showControls(true);

    await nextTick();

    expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
    expect(wrapper.html()).toContain('expense_active');
  });

  it('should hide control and remove active class', async () => {
    wrapper.vm.showControls(false);

    await nextTick();

    expect(wrapper.findComponent(BaseButton).exists()).toBe(false);
    expect(wrapper.html()).not.toContain('expense_active');
  });

  it('should emit click and delete-item event when control clicked', async () => {
    wrapper.vm.showControls(true);

    await nextTick();
    await wrapper.findComponent(BaseButton).trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted()).toHaveProperty('delete-item');
  });
});
