<template>
  <BaseLayout>
    <BaseExpensesList />
    <BaseAddExpenseBar />
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useCalendarStore, useExpensesStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseAddExpenseBar from '@/components/BaseAddExpenseBar/BaseAddExpenseBar.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { initCalendar } = calendarStore;
const { initExpensesObject } = expensesStore;

onBeforeMount(() => {
  initCalendar();
  initExpensesObject();
});
</script>
