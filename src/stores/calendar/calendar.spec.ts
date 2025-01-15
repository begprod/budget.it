import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { describe, it, expect } from 'vitest';
import { useCalendarStore } from '@/stores/calendar/calendar';

describe('Calendar store', () => {
  const pinia = createPinia();

  setActivePinia(pinia);

  const calendarStore = useCalendarStore();
  const {
    currentMonthIndex,
    months,
    days,
    getCurrentDay,
    getMonthByIndex,
    getNextMonthsFromCurrent,
    getPreviousMonthsFromCurrent,
  } = storeToRefs(calendarStore);
  const {
    initCalendar,
    getAllDaysByMonthId,
    increaseCurrentMonthIndex,
    decreaseCurrentMonthIndex,
  } = calendarStore;

  it('should generate months and days', () => {
    initCalendar();

    expect(months.value.length).toEqual(7);
    expect(months.value[0].isFuture).toBe(true);
    expect(days.value.length).greaterThan(200);
  });

  it('should get all days by month id for current months', () => {
    const monthId = months.value[1].id;
    const daysByMonthId = getAllDaysByMonthId(monthId);

    expect(daysByMonthId.length).greaterThanOrEqual(30);
  });

  it('should get current day', () => {
    const currentDay = days.value.find((day) => day.isCurrent);

    expect(getCurrentDay.value).toEqual(currentDay);
  });

  it('should get months from month array by index', () => {
    const currentMonth = months.value[currentMonthIndex.value];

    expect(getMonthByIndex.value).toEqual(currentMonth);
  });

  it('should get next month from current', () => {
    const nextMonth = months.value[currentMonthIndex.value - 1];

    expect(getNextMonthsFromCurrent.value).toEqual(nextMonth);
  });

  it('should get previous month from current', () => {
    const previousMonth = months.value[currentMonthIndex.value + 1];

    expect(getPreviousMonthsFromCurrent.value).toEqual(previousMonth);
  });

  it('should increase current month index', () => {
    increaseCurrentMonthIndex();

    expect(currentMonthIndex.value).toEqual(2);
  });

  it('should decrease current month index', () => {
    decreaseCurrentMonthIndex();

    expect(currentMonthIndex.value).toEqual(1);
  });
});
