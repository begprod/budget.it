import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';

describe('BaseEmptyListMessage', () => {
  const wrapper = mount(BaseEmptyListMessage, {
    props: {
      message: 'test message',
    },
  });

  it('should contain the correct props', () => {
    expect(wrapper.props().message).toBe('test message');
  });
});
