import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCalendarStore } from '@/stores/calendar/calendar';

describe('Calendar store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const calendarStore = useCalendarStore();
  const { months, days, getCurrentDay, getCurrentMonth } = storeToRefs(calendarStore);
  const { initCalendar, getDaysByMonthId } = calendarStore;

  it('should generate months and days', () => {
    initCalendar();

    expect(months.value.length).toEqual(6);
    expect(days.value.length).greaterThan(180);
  });

  it('should get days by month id', () => {
    const monthId = months.value[0].id;
    const daysByMonthId = getDaysByMonthId(monthId);

    expect(daysByMonthId.length).greaterThanOrEqual(30);
  });

  it('should get current month', () => {
    expect(typeof getCurrentMonth.value).toEqual('object');
  });

  it('should get current day', () => {
    expect(typeof getCurrentDay.value).toEqual('object');
  });
});
