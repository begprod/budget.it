import type { ComponentWrapperType } from '@/types';
// import { createRouter, createWebHistory } from 'vue-router';
// import { useRoute } from 'vue-router';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseMenuBar from '@/components/layouts/partials/BaseMenuBar/BaseMenuBar.vue';
import BaseAddExpenseButton from '@/components/BaseAddExpenseButton/BaseAddExpenseButton.vue';

vi.mock('vue-router', () => ({
  useRoute: vi
    .fn()
    .mockReturnValueOnce({
      name: 'home',
    })
    .mockReturnValueOnce({
      name: 'settings',
    })
    .mockReturnValueOnce({
      name: 'home',
    }),
  RouterLink: vi.fn(),
}));

describe('BaseMenuBar', () => {
  let wrapper: ComponentWrapperType<typeof BaseMenuBar>;

  const createComponent = () => {
    wrapper = shallowMount(BaseMenuBar);
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain BaseAddExpenseButton if route is "home"', () => {
    expect(wrapper.findComponent(BaseAddExpenseButton).exists()).toBe(true);
  });

  it('should not contain BaseAddExpenseButton if route is not "home"', () => {
    expect(wrapper.findComponent(BaseAddExpenseButton).exists()).toBe(false);
  });

  it('should contain route names', () => {
    expect(wrapper.html()).toContain('/');
    expect(wrapper.html()).toContain('/dashboard');
    expect(wrapper.html()).toContain('/settings');
  });
});
