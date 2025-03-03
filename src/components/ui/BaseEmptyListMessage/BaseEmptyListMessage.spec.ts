import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';

describe('BaseEmptyListMessage', () => {
  let wrapper: ComponentWrapperType<typeof BaseEmptyListMessage>;

  const createComponent = () => {
    wrapper = mount(BaseEmptyListMessage, {
      slots: {
        icon: 'Icon slot',
        message: 'Message slot',
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain slot content', () => {
    expect(wrapper.text()).toContain('Icon slotMessage slot');
  });
});
