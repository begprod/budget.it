import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseFormBar from '@/components/BaseFormBar/BaseFormBar.vue';

describe('BaseFormBar', () => {
  let wrapper: ComponentWrapperType<typeof BaseFormBar>;

  const createComponent = () => {
    wrapper = shallowMount(BaseFormBar, {
      slots: {
        input: 'test input',
        button: 'test button',
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain the correct slots', () => {
    expect(wrapper.html()).toContain('test input');
    expect(wrapper.html()).toContain('test button');
  });

  it('should emit submit event when form submit', async () => {
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted()).toHaveProperty('submit');
  });
});
