import type { ComponentWrapperType } from '@/types';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ThumbsUp, TriangleAlert } from 'lucide-vue-next';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';

describe('BaseToast', () => {
  let wrapper: ComponentWrapperType<typeof BaseToast>;

  const createComponent = () => {
    wrapper = mount(BaseToast, {
      props: {
        type: 'default',
        message: 'message',
        duration: 0,
        callback: () => {},
      },
      global: {
        components: {
          ThumbsUp,
          TriangleAlert,
        },
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain success toast type css classes', async () => {
    await wrapper.setProps({
      type: 'success',
      message: 'Success message',
      duration: 10,
    });

    const toast = wrapper.find('[data-test-id="toast"]');
    const toastSuccessIcon = wrapper.find('[data-test-id="toast-success-icon"]');
    const toastErrorIcon = wrapper.find('[data-test-id="toast-error-icon"]');
    const toastMessage = wrapper.find('[data-test-id="toast-message"]');

    expect(toast.exists()).toBe(true);
    expect(toast.attributes('class')).toContain('toast__inner_type_success');
    expect(toastSuccessIcon.exists()).toBe(true);
    expect(toastErrorIcon.exists()).toBe(false);
    expect(toastMessage.exists()).toBe(true);
  });

  it('should contain error toast type css classes', async () => {
    await wrapper.setProps({
      type: 'error',
      message: 'Error message',
      duration: 10,
    });

    const toast = wrapper.find('[data-test-id="toast"]');
    const toastSuccessIcon = wrapper.find('[data-test-id="toast-success-icon"]');
    const toastErrorIcon = wrapper.find('[data-test-id="toast-error-icon"]');
    const toastMessage = wrapper.find('[data-test-id="toast-message"]');

    expect(toast.exists()).toBe(true);
    expect(toast.attributes('class')).toContain('toast__inner_type_error');
    expect(toastSuccessIcon.exists()).toBe(false);
    expect(toastErrorIcon.exists()).toBe(true);
    expect(toastMessage.exists()).toBe(true);
  });

  it('should contain default toast type css classes', async () => {
    await wrapper.setProps({
      type: 'default',
      message: 'Default message',
      duration: 10,
    });

    const toast = wrapper.find('[data-test-id="toast"]');
    const toastSuccessIcon = wrapper.find('[data-test-id="toast-success-icon"]');
    const toastErrorIcon = wrapper.find('[data-test-id="toast-error-icon"]');
    const toastMessage = wrapper.find('[data-test-id="toast-message"]');

    expect(toast.exists()).toBe(true);
    expect(toast.attributes('class')).toContain('toast__inner_type_default');
    expect(toastSuccessIcon.exists()).toBe(false);
    expect(toastErrorIcon.exists()).toBe(false);
    expect(toastMessage.exists()).toBe(true);
  });

  it('should emit click event', async () => {
    await wrapper.setProps({
      type: 'default',
      message: 'Default message',
      duration: 10,
    });

    const toast = wrapper.find('[data-test-id="toast"]');

    await toast.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should emit timesup event', async () => {
    await wrapper.setProps({
      type: 'default',
      message: 'Default message',
      duration: 10,
    });

    const toast = wrapper.find('[data-test-id="toast"]');

    await toast.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('timesup');
  });

  it('should call callback function', async () => {
    const cb = vi.fn();

    await wrapper.setProps({
      type: 'default',
      message: 'Default message',
      duration: 10,
      callback: cb,
    });

    const toast = wrapper.find('[data-test-id="toast"]');

    await toast.trigger('click');

    expect(cb).toHaveBeenCalled();
  });
});
