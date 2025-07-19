import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseStatsPanel from '@/components/BaseStatsPanel/BaseStatsPanel.vue';

describe('BaseStatsPanel', () => {
  let wrapper: ComponentWrapperType<typeof BaseStatsPanel>;

  const createComponent = () => {
    wrapper = shallowMount(BaseStatsPanel, {
      props: {
        title: 'April',
        expenses: [
          {
            currency: '$',
            value: 500,
          },
          {
            currency: '฿',
            value: 100,
          },
        ],
        budget: 321,
        progress: 10,
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain month title', () => {
    const title = wrapper.find('[data-test-id="month-title"]');

    expect(title.text()).toContain('April');
  });

  it('should contain total month expenses', () => {
    const expenses = wrapper.findAll('[data-test-id*="monthly-expenses"]');

    expect(expenses[0].text()).toContain('$ 500');
    expect(expenses[1].text()).toContain('฿ 100');
  });

  it('should contain monthly budget', () => {
    const budget = wrapper.find('[data-test-id="monthly-budget"]');

    expect(budget.text()).toContain('321');
  });

  it('should contain progress percents', () => {
    const percents = wrapper.find('[data-test-id="monthly-percents"]');

    expect(percents.text()).toContain('10%');
  });
});
