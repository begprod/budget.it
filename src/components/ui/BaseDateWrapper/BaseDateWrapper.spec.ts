import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';

describe('BaseDateWrapper', () => {
  let wrapper: ComponentWrapperType<typeof BaseDateWrapper>;

  const createComponent = () => {
    wrapper = mount(BaseDateWrapper, {
      slots: {
        title: 'test title',
        content: 'test content',
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
    expect(wrapper.html()).toContain('test title');
    expect(wrapper.html()).toContain('test content');
  });
});
