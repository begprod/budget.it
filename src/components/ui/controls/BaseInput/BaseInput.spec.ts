import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';

describe('BaseInput', () => {
  const wrapper = mount(BaseInput, {
    props: {
      modelValue: '',
      id: 'test id',
      type: 'text',
      placeholder: 'test placeholder',
      autocomplete: 'true',
      isError: false,
      errorMessage: 'test error message',
      isSuccess: false,
      successMessage: 'test success message',
    },
  });

  it('should contain the correct props', () => {
    expect(wrapper.props().modelValue).toBe('');
    expect(wrapper.props().id).toBe('test id');
    expect(wrapper.props().type).toBe('text');
    expect(wrapper.props().placeholder).toBe('test placeholder');
    expect(wrapper.props().autocomplete).toBe('true');
    expect(wrapper.props().isError).toBe(false);
    expect(wrapper.html()).not.toContain('test error message');
    expect(wrapper.props().isSuccess).toBe(false);
    expect(wrapper.html()).not.toContain('test success message');
  });

  it('should show error message', async () => {
    await wrapper.setProps({ isError: true });

    expect(wrapper.html()).toContain('test error message');
  });

  it('should show success message', async () => {
    await wrapper.setProps({ isSuccess: true });

    expect(wrapper.html()).toContain('test success message');
  });

  it('should update model value', async () => {
    const input = wrapper.find('input');

    input.setValue('test value');

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(input.element.value).toBe('test value');
  });
});
