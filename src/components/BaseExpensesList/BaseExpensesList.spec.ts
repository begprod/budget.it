import type { ComponentWrapperType } from '@/types';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import { nextTick } from 'vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';

describe('BaseExpensesList', () => {
  let wrapper: ComponentWrapperType<typeof BaseExpensesList>;

  const CURRENCY = 'USD';
  const CREATED_AT_TIME = '10:00';
  const MONTHS_EXPENSES = 10000;
  const DAILY_BUDGET = 300;
  const MONTH = {
    id: '032024',
    name: 'March',
    monthString: new Date('2024-03-01'),
    isCurrent: false,
    isFuture: false,
  };
  const DAYS = [
    {
      id: '01032024',
      monthId: '032024',
      number: '01',
      name: 'Tuesday',
      isCurrent: true,
      isFuture: false,
      isPast: true,
    },
    {
      id: '01042024',
      monthId: '042024',
      number: '01',
      name: 'Monday',
      isCurrent: false,
      isFuture: false,
      isPast: false,
    },
  ];
  const EXPENSES = {
    '01032024': {
      items: [
        {
          id: '1',
          value: 10,
          currency: CURRENCY,
          createdAt: CREATED_AT_TIME,
          monthId: '032024',
          dayId: '01032024',
        },
      ],
    },
    '01042024': {
      items: [
        {
          id: '1',
          value: 300,
          currency: CURRENCY,
          createdAt: CREATED_AT_TIME,
          monthId: '042024',
          dayId: '01042024',
        },
      ],
    },
  };

  const createComponent = () => {
    wrapper = shallowMount(BaseExpensesList, {
      props: {
        month: MONTH,
        monthDays: DAYS,
        monthExpenses: MONTHS_EXPENSES,
        dailyBudget: DAILY_BUDGET,
        expenses: EXPENSES,
      },
      slots: {
        input: '#input slot content',
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should contain only current month title', () => {
    const monthTitle = wrapper.findAll('[data-test-id="month-title"]');

    expect(monthTitle[0].html()).toContain('March');
    expect(monthTitle[1]).equal(undefined);
  });

  it('should contain current month expenses sum', () => {
    const monthlyExpenses = wrapper.findAll('[data-test-id="monthly-expenses"]');

    expect(monthlyExpenses[0].html()).toContain('10000');
    expect(monthlyExpenses[1]).equal(undefined);
  });

  it('should contain current month budget', () => {
    const monthlyBudget = DAYS.length * DAILY_BUDGET;
    const monthlyExpenses = wrapper.findAll('[data-test-id="monthly-budget"]');

    expect(monthlyExpenses[0].html()).toContain(monthlyBudget);
    expect(monthlyExpenses[1]).equal(undefined);
  });

  it('should count current month percents', () => {
    const percents = Math.round((MONTHS_EXPENSES / (DAYS.length * DAILY_BUDGET)) * 100);
    const monthlyPercents = wrapper.findAll('[data-test-id="monthly-percents"]');

    expect(monthlyPercents[0].html()).toContain(percents);
    expect(monthlyPercents[1]).equal(undefined);
  });

  it('should contain day name and day number', () => {
    const dayTitle = wrapper.findAll('[data-test-id="day-title"]');

    expect(dayTitle[0].html()).toContain('01 Tuesday');
    expect(dayTitle[1].html()).toContain('01 Monday');
  });

  it('should show current day indicator if day is current', () => {
    const dayTitle = wrapper.findAll('[data-test-id="day-title"]');

    expect(dayTitle[0].find('[data-test-id="current-day-indicator"]').exists()).toBe(true);
    expect(dayTitle[1].find('[data-test-id="current-day-indicator"]').exists()).toBe(false);
  });

  it('should count daily expenses', () => {
    const dailyExpenses = wrapper.findAll('[data-test-id="daily-expenses"]');

    expect(dailyExpenses[0].html()).toContain(`10 / ${DAILY_BUDGET}`);
    expect(dailyExpenses[1].html()).toContain(`300 / ${DAILY_BUDGET}`);
    expect(wrapper.findComponent(BaseEmptyListMessage).exists()).toBe(false);
  });

  it('should show empty message if day have no expenses', async () => {
    await wrapper.setProps({
      expenses: {
        '01032024': {
          items: [],
        },
        '01042024': {
          items: [],
        },
      },
    });

    await nextTick();

    const dailyExpenses = wrapper.findAll('[data-test-id="daily-expenses"]');

    expect(dailyExpenses.length).toBe(0);
    expect(wrapper.findComponent(BaseEmptyListMessage).exists()).toBe(true);
  });

  it('should render #input slot content', () => {
    const dailyExpenses = wrapper.findAll('[data-test-id="input-slot"]');

    expect(dailyExpenses[0].html()).toContain('#input slot content');
  });

  it('should emit remove-item', async () => {
    const expenseItem = wrapper.findAll('base-expense-stub');

    await expenseItem[0].trigger('delete-item');

    expect(wrapper.emitted()['remove-item']).toStrictEqual([['1', '01032024']]);
  });
});
