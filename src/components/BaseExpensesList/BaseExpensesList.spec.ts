import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useCommonStore, useCalendarStore, useExpensesStore, useSettingsStore } from '@/stores';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';

describe('BaseExpensesList', () => {
  const wrapper = mount(BaseExpensesList, {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn,
      }),
    ],
  });

  const commonStore = useCommonStore();
  const calendarStore = useCalendarStore();
  const expensesStore = useExpensesStore();
  const settingsStore = useSettingsStore();

  const { isAddExpenseInputVisible } = storeToRefs(commonStore);
  const { currentMonthIndex, months, days } = storeToRefs(calendarStore);
  const { expenses } = storeToRefs(expensesStore);
  const { monthlyDailyBudget, dailyBudget } = storeToRefs(settingsStore);

  const CURRENCY = 'USD';
  const VALUE = '100';
  const CREATED_AT_TIME = '10:00';

  currentMonthIndex.value = 0;

  months.value = [
    {
      id: '032024',
      name: 'March',
      monthString: new Date('2024-03-01'),
      isCurrent: false,
      isFuture: false,
    },
    {
      id: '042024',
      name: 'April',
      monthString: new Date('2024-04-01'),
      isCurrent: true,
      isFuture: false,
    },
  ];

  days.value = [
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
      isCurrent: true,
      isFuture: false,
      isPast: false,
    },
  ];

  expenses.value = {
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
          value: VALUE,
          currency: CURRENCY,
          createdAt: CREATED_AT_TIME,
          monthId: '042024',
          dayId: '01042024',
        },
      ],
    },
  };

  monthlyDailyBudget.value = {
    '032024': {
      dailyBudget: dailyBudget.value,
    },
    '042024': {
      dailyBudget: 900,
    },
  };

  it('should contain data from store', async () => {
    const monthTitle = wrapper.findAll('[data-testid="month-title"]');
    const monthlyExpenses = wrapper.findAll('[data-testid="monthly-expenses"]');
    const monthlyBudget = wrapper.findAll('[data-testid="monthly-budget"]');
    const monthlyPercents = wrapper.findAll('[data-testid="monthly-percents"]');

    expect(monthTitle[0].html()).toContain('March');
    expect(monthlyExpenses[0].html()).toContain(`${10}`);
    expect(monthlyBudget[0].html()).toContain(500);
    expect(monthlyPercents[0].html()).toContain('2%');
    expect(monthTitle[1]).toEqual(undefined);
    expect(monthlyExpenses[1]).toEqual(undefined);
    expect(monthlyBudget[1]).toEqual(undefined);
    expect(monthlyPercents[1]).toEqual(undefined);
  });

  it('should contain days data from store', () => {
    const dayTitle = wrapper.findAll('[data-testid="day-title"]');
    const dailyExpenses = wrapper.findAll('[data-testid="daily-expenses"]');

    expect(dayTitle[0].html()).toContain('01 Tuesday');
    expect(dailyExpenses[0].html()).toContain(`${10} / ${dailyBudget.value}`);
    expect(dayTitle[1]).toEqual(undefined);
    expect(dailyExpenses[1]).toEqual(undefined);
  });

  it('should show current day indicator if day is current', () => {
    const currentDayIndicator = wrapper.find('[data-testid="current-day-indicator"]');

    expect(currentDayIndicator.exists()).toBe(true);
  });

  it('should not contain current day icon if day is not current', async () => {
    days.value = [
      {
        id: '01032024',
        monthId: '032024',
        number: '01',
        name: 'Tuesday',
        isCurrent: false,
        isFuture: false,
        isPast: true,
      },
    ];

    await nextTick();

    const currentDayIndicator = wrapper.find('[data-testid="current-day-indicator"]');

    expect(currentDayIndicator.exists()).toBe(false);
  });

  it('should show form if isAddExpenseInputVisible is true and day is current', async () => {
    days.value = [
      {
        id: '01032024',
        monthId: '032024',
        number: '01',
        name: 'Tuesday',
        isCurrent: true,
        isFuture: false,
        isPast: true,
      },
    ];
    isAddExpenseInputVisible.value = true;

    await nextTick();

    expect(wrapper.findComponent(BaseFormBar).exists()).toBe(true);
    expect(wrapper.findComponent(BaseInput).exists()).toBe(true);
  });

  it('should show empty message if expense items array is empty', async () => {
    expenses.value = {
      '01032024': {
        items: [],
      },
    };

    await nextTick();

    expect(wrapper.findComponent(BaseEmptyListMessage).exists()).toBe(true);
    expect(wrapper.html()).toContain('No expenses for this day');
  });
});
