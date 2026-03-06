import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';

const updateServiceWorkerMock = vi.fn();

vi.mock('virtual:pwa-register/vue', () => {
  return {
    useRegisterSW: () => ({
      needRefresh: true,
      updateServiceWorker: updateServiceWorkerMock,
    }),
  };
});

describe('BaseLayout', () => {
  let wrapper: ComponentWrapperType<typeof BaseLayout>;

  const createComponent = () => {
    wrapper = shallowMount(BaseLayout, {
      slots: {
        title: 'title',
        wrapper: 'wrapper',
        default: 'default',
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain the correct slots content', () => {
    expect(wrapper.html()).toContain('title');
    expect(wrapper.html()).toContain('wrapper');
    expect(wrapper.html()).toContain('default');
  });

  it('should show update app button if needRefresh is true', async () => {
    const updateButton = wrapper.findComponent({ name: 'BaseButton' });

    expect(updateButton.exists()).toBe(true);
    expect(updateButton.props('title')).toBe('update application');

    await updateButton.trigger('click');

    expect(updateServiceWorkerMock).toHaveBeenCalledWith(true);
  });
});
