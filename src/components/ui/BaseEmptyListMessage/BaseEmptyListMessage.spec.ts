import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';

describe('BaseEmptyListMessage', () => {
  let wrapper: ComponentWrapperType<typeof BaseEmptyListMessage>;

  const createComponent = () => {
    wrapper = mount(BaseEmptyListMessage, {
      props: {
        message: 'test message',
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
    expect(wrapper.props().message).toBe('test message');
  });
});
