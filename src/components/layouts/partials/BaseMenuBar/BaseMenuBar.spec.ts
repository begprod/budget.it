import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import BaseMenuBar from '@/components/layouts/partials/BaseMenuBar/BaseMenuBar.vue';
import { useCalendarStore } from '@/stores';
import { nextTick } from 'vue';

const currentRoute = ref({ name: 'home' });

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => currentRoute), // Мок функции useRoute возвращает текущее значение
  RouterLink: vi.fn(),
}));

describe('BaseMenuBar', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const calendarStore = useCalendarStore();
  const { getNextMonthsFromCurrent, getPreviousMonthsFromCurrent } = storeToRefs(calendarStore);
  const { initCalendar } = calendarStore;

  initCalendar();

  const wrapper = mount(BaseMenuBar);

  it('should not show add expense button if route is not "home"', async () => {
    currentRoute.value = { name: 'settings' };

    await nextTick();

    const addExpenseButton = wrapper.find('[data-test-id="add-expense-button"]');

    expect(addExpenseButton.exists()).toBe(false);
  });

  it('should show only add expense button and next month button if month is current', async () => {
    currentRoute.value = { name: 'home' };

    await nextTick();

    const addExpenseButton = wrapper.find('[data-test-id="add-expense-button"]');
    const nextMonthButton = wrapper.find('[data-test-id="next-month-button"]');
    const previousMonthButton = wrapper.find('[data-test-id="previous-month-button"]');

    expect(addExpenseButton.exists()).toBe(true);
    expect(previousMonthButton.exists()).toBe(true);
    expect(nextMonthButton.exists()).toBe(false);
    expect(previousMonthButton.text()).toBe(getPreviousMonthsFromCurrent.value.name);
  });

  it('should show only previous month button and next month button if month is not current', async () => {
    const previousMonthButton = wrapper.find('[data-test-id="previous-month-button"]');

    await previousMonthButton.trigger('click');

    const nextMonthButton = wrapper.find('[data-test-id="next-month-button"]');
    const addExpenseButton = wrapper.find('[data-test-id="add-expense-button"]');

    expect(addExpenseButton.exists()).toBe(false);
    expect(previousMonthButton.exists()).toBe(true);
    expect(nextMonthButton.exists()).toBe(true);
    expect(previousMonthButton.text()).toBe(getPreviousMonthsFromCurrent.value.name);
    expect(nextMonthButton.text()).toBe(getNextMonthsFromCurrent.value.name);
  });

  it('should show only next month button if month is last in list', async () => {
    const nextMonthButton = wrapper.find('[data-test-id="next-month-button"]');
    let previousMonthButton = wrapper.find('[data-test-id="previous-month-button"]');

    await previousMonthButton.trigger('click');
    await previousMonthButton.trigger('click');
    await previousMonthButton.trigger('click');
    await previousMonthButton.trigger('click');

    previousMonthButton = wrapper.find('[data-test-id="previous-month-button"]');

    expect(previousMonthButton.exists()).toBe(false);
    expect(nextMonthButton.exists()).toBe(true);
    expect(nextMonthButton.text()).toBe(getNextMonthsFromCurrent.value.name);
  });
});
