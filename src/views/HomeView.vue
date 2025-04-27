<template>
  <BaseLayout>
    <template #wrapper>
      <BaseExpenses />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseExpenses from '@/components/BaseExpenses/BaseExpenses.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { lastCalendarUpdateDate } = storeToRefs(commonStore);
const { setLastUpdateDate } = commonStore;
const { initMonthlyDailyBudgetObject } = settingsStore;
const { initCalendar } = calendarStore;
const { initExpensesObject } = expensesStore;

onBeforeMount(() => {
  const updateDate = new Date().toLocaleDateString();

  setLastUpdateDate(updateDate);
  initCalendar();
  initMonthlyDailyBudgetObject();
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

<style scoped>
.form-bar-add-expense {
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  border-radius: var(--rounded-md);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  z-index: 50;
}
</style>
