import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseRadioButton from '@/components/ui/controls/BaseRadioButton/BaseRadioButton.vue';

describe('BaseRadioButton', () => {
  let wrapper: ComponentWrapperType<typeof BaseRadioButton>;

  const createComponent = () => {
    wrapper = mount(BaseRadioButton, {
      props: {
        id: 'test id',
        name: 'test name',
        label: 'test label',
        value: 'test value',
        checked: false,
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
    expect(wrapper.props().id).toBe('test id');
    expect(wrapper.props().name).toBe('test name');
    expect(wrapper.props().value).toBe('test value');
    expect(wrapper.props().label).toBe('test label');
    expect(wrapper.props().checked).toBe(false);
  });

  it('should emit change event', async () => {
    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted().change).toBeTruthy();
  });
});
