import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

describe('BaseButton', () => {
  const wrapper = mount(BaseButton, {
    props: {
      title: 'test title',
      isDisabled: false,
    },
    slots: {
      text: 'test text',
      leftIcon: '<div>left icon</div>',
      rightIcon: '<div>right icon</div>',
    },
  });

  it('should contain the correct props', () => {
    expect(wrapper.props().title).toBe('test title');
    expect(wrapper.props().type).toBe('button');
    expect(wrapper.props().isDisabled).toBe(false);
  });

  it('should contain the correct slots', () => {
    expect(wrapper.html()).toContain('test text');
    expect(wrapper.html()).toContain('left icon');
    expect(wrapper.html()).toContain('right icon');
  });

  it('should emit click event', async () => {
    await wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
