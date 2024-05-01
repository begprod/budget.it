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
    },
  ];

  days.value = [
    {
      id: '01042024',
      monthId: '042024',
      number: '01',
      name: 'Monday',
      isCurrent: true,
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
    expect(wrapper.html()).toContain(`April – ${VALUE} / ${dailyBudget.value * days.value.length}`);
    expect(wrapper.html()).toContain(`${VALUE} / ${dailyBudget.value}`);
    expect(wrapper.html()).toContain(`${CREATED_AT_TIME}`);
    expect(wrapper.html()).toContain(`${VALUE}`);
    expect(wrapper.html()).toContain(`${CURRENCY}`);
  });

  it('should contain CheckCircleIcon icon in title if monthly budget is not exceeded', async () => {
    const title = wrapper.find('[data-testid="month-title"]');

    expect(title.html()).toContain('w-7 h-7 mr-2 text-emerald-500');
    expect(title.html()).not.toContain('w-7 h-7 mr-2 text-rose-500');
  });

  it('should contain XCircleIcon icon in title if monthly budget is exceeded', async () => {
    expenses.value = {
      '01042024': {
        items: [
          {
            id: '1',
            value: '600',
            currency: CURRENCY,
            createdAt: CREATED_AT_TIME,
            monthId: '042024',
            dayId: '01042024',
          },
        ],
      },
    };

    await nextTick();

    const title = wrapper.find('[data-testid="month-title"]');

    expect(title.html()).toContain('w-7 h-7 mr-2 text-rose-500');
    expect(title.html()).not.toContain('w-7 h-7 mr-2 text-emerald-500');
  });

  it('should show current day icon if day is current', () => {
    expect(wrapper.html()).toContain('current-day');
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
      },
    ];

    await nextTick();

    expect(wrapper.html()).not.toContain('current-day');
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
