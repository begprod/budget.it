import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseRadioButton from '@/components/ui/controls/BaseRadioButton/BaseRadioButton.vue';

describe('BaseRadioButton', () => {
  const wrapper = mount(BaseRadioButton, {
    props: {
      id: 'test id',
      name: 'test name',
      value: 'test value',
      checked: false,
      label: 'test label',
      additionalClasses: 'test-class',
    } as any,
  });

  it('should contain the correct props', () => {
    expect(wrapper.props().id).toBe('test id');
    expect(wrapper.props().name).toBe('test name');
    expect(wrapper.props().value).toBe('test value');
    expect(wrapper.props().label).toBe('test label');
    expect(wrapper.props().checked).toBe(false);
    expect(wrapper.props().additionalClasses).toBe('test-class');
  });

  it('should emit change event', async () => {
    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted().change).toBeTruthy();
  });
});
