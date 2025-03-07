import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

describe('BaseProgressBar', () => {
  let wrapper: ComponentWrapperType<typeof BaseProgressBar>;

  const createComponent = () => {
    wrapper = mount(BaseProgressBar, {
      props: {
        percentage: 50,
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
    expect(wrapper.props().percentage).toBe(50);
  });

  it('should contain the correct percentage from prop', () => {
    expect(wrapper.html()).toContain('background-size: 50%;');
  });

  it('should contain class "progress-bar_overfilled" if percentage is over 100', async () => {
    await wrapper.setProps({ percentage: 150 });

    expect(wrapper.classes()).toContain('progress-bar_overfilled');
  });

  it('should not contain class "progress-bar_overfilled" if percentage is under 100', async () => {
    await wrapper.setProps({ percentage: 50 });

    expect(wrapper.classes()).not.toContain('progress-bar_overfilled');
  });
});
