import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';

describe('BaseLayout', () => {
  let wrapper: ComponentWrapperType<typeof BaseLayout>;

  const createComponent = () => {
    wrapper = shallowMount(BaseLayout, {
      slots: {
        default: 'test content',
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
    expect(wrapper.html()).toContain('test content');
  });
});
