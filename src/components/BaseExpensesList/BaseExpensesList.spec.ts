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
  const { months, days } = storeToRefs(calendarStore);
  const { expenses } = storeToRefs(expensesStore);
  const { dailyBudget } = storeToRefs(settingsStore);

  const CURRENCY = 'USD';
  const VALUE = '100';
  const CREATED_AT_TIME = '10:00';

  months.value = [
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

  it('should contain data from store', () => {
    const monthTitle = wrapper.find('[data-testid="month-title"]');
    const monthlyExpenses = wrapper.find('[data-testid="monthly-expenses"]');
    const monthlyBudget = wrapper.find('[data-testid="monthly-budget"]');
    const monthlyPercents = wrapper.find('[data-testid="monthly-percents"]');

    expect(monthTitle.html()).toContain('April');
    expect(monthlyExpenses.html()).toContain(`${VALUE}`);
    expect(monthlyBudget.html()).toContain(`${dailyBudget.value * days.value.length}`);
    expect(monthlyPercents.html()).toContain('20%');
  });

  it('should contain days data from store', () => {
    const dayTitle = wrapper.find('[data-testid="day-title"]');
    const dailyExpenses = wrapper.find('[data-testid="daily-expenses"]');

    expect(dayTitle.html()).toContain('01 Monday');
    expect(dailyExpenses.html()).toContain(`${VALUE} / ${dailyBudget.value}`);
  });

  it('should show current day indicator if day is current', () => {
    const currentDayIndicator = wrapper.find('[data-testid="current-day-indicator"]');

    expect(currentDayIndicator.exists()).toBe(true);
  });

  it('should not contain current day icon if day is not current', async () => {
    days.value = [
      {
        id: '01042024',
        monthId: '042024',
        number: '01',
        name: 'Monday',
        isCurrent: false,
        isPast: false,
        isFuture: false,
      },
    ];

    await nextTick();

    const currentDayIndicator = wrapper.find('[data-testid="current-day-indicator"]');

    expect(currentDayIndicator.exists()).toBe(false);
  });

  it('should show form if isAddExpenseInputVisible is true and day is current', async () => {
    days.value = [
      {
        id: '01042024',
        monthId: '042024',
        number: '01',
        name: 'Monday',
        isCurrent: true,
        isPast: false,
        isFuture: false,
      },
    ];
    isAddExpenseInputVisible.value = true;

    await nextTick();

    expect(wrapper.findComponent(BaseFormBar).exists()).toBe(true);
    expect(wrapper.findComponent(BaseInput).exists()).toBe(true);
  });

  it('should show empty message if expense items array is empty', async () => {
    expenses.value = {
      '01042024': {
        items: [],
      },
    };

    await nextTick();

    expect(wrapper.findComponent(BaseEmptyListMessage).exists()).toBe(true);
    expect(wrapper.html()).toContain('No expenses for this day');
  });
});
