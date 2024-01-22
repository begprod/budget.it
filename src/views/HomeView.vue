<template>
  <BaseLayout>
    <BaseExpensesList />
    <BaseAddExpenseBar />
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useCalendarStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseAddExpenseBar from '@/components/BaseAddExpenseBar/BaseAddExpenseBar.vue';

const calendarStore = useCalendarStore();
const { initCalendar } = calendarStore;

onBeforeMount(() => {
  initCalendar();
});
</script>
