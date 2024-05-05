import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCalendarStore } from '@/stores/calendar/calendar';

describe('Calendar store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const calendarStore = useCalendarStore();
  const { months, days, getCurrentMonths, getCurrentDay, getCurrentMonth } =
    storeToRefs(calendarStore);
  const { initCalendar, getDaysByMonthIdWidthOutFutureDays, getAllDaysByMonthId } = calendarStore;

  it('should generate months and days', () => {
    initCalendar();

    expect(months.value.length).toEqual(7);
    expect(months.value[0].isFuture).toBe(true);
    expect(days.value.length).greaterThan(200);
  });

  it('should get current months without future month', () => {
    expect(getCurrentMonths.value.length).greaterThanOrEqual(5);
  });

  it('should get all days by month id for current months', () => {
    const monthId = months.value[1].id;
    const daysByMonthId = getAllDaysByMonthId(monthId);

    expect(daysByMonthId.length).greaterThanOrEqual(30);
  });

  it('should not get days by month id for future months', () => {
    const monthId = months.value[1].id;
    const daysByMonthId = getDaysByMonthIdWidthOutFutureDays(monthId);

    expect(daysByMonthId.length).greaterThanOrEqual(1);
  });

  it('should get current month', () => {
    const currentMonth = months.value.find((month) => month.isCurrent);

    expect(getCurrentMonth.value).toEqual(currentMonth);
  });

  it('should get current day', () => {
    const currentDay = days.value.find((day) => day.isCurrent);

    expect(getCurrentDay.value).toEqual(currentDay);
  });
});
