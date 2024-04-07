import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

describe('BaseProgressBar', () => {
  const wrapper = mount(BaseProgressBar, {
    props: {
      label: 'test label',
      percentage: 50,
      showTotal: true,
    },
  });

  it('should contain the correct props', () => {
    expect(wrapper.props().label).toBe('test label');
    expect(wrapper.props().percentage).toBe(50);
    expect(wrapper.props().showTotal).toBe(true);
  });

  it('should contain the correct percentage from prop', () => {
    expect(wrapper.html()).toContain('background-size: 50%;');
  });

  it('should contain the correct label from prop', () => {
    expect(wrapper.html()).toContain('test label');
  });

  it('should contain class "progress-bar_overfilled" if percentage is over 100', async () => {
    await wrapper.setProps({ percentage: 150 });

    expect(wrapper.classes()).toContain('progress-bar_overfilled');
  });

  it('should not contain class "progress-bar_overfilled" if percentage is under 100', async () => {
    await wrapper.setProps({ percentage: 50 });

    expect(wrapper.classes()).not.toContain('progress-bar_overfilled');
  });

  it('should contain class "progress-bar_total" if showTotal is true', () => {
    expect(wrapper.classes()).toContain('progress-bar_total');
  });

  it('should not contain class "progress-bar_total" if showTotal is false', async () => {
    await wrapper.setProps({ showTotal: false });

    expect(wrapper.classes()).not.toContain('progress-bar_total');
  });
});
