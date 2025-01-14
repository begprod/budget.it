<template>
  <BaseLayout>
    <BaseExpensesList v-if="getMonthByIndex" :month="getMonthByIndex" />
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';

const commonStore = useCommonStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { lastCalendarUpdateDate } = storeToRefs(commonStore);
const { getMonthByIndex } = storeToRefs(calendarStore);
const { setLastUpdateDate } = commonStore;
const { initCalendar } = calendarStore;
const { initExpensesObject } = expensesStore;

onBeforeMount(() => {
  const updateDate = new Date().toLocaleDateString();

  setLastUpdateDate(updateDate);

  initCalendar();
  initExpensesObject();

  window.addEventListener('focus', tabFocusHandler);
});

const tabFocusHandler = () => {
  if (!lastCalendarUpdateDate.value) {
    return;
  }

  const currentDate = new Date().toLocaleDateString();

  if (currentDate !== lastCalendarUpdateDate.value) {
    setLastUpdateDate(currentDate);
    initCalendar();
    initExpensesObject();
  }
};
</script>
