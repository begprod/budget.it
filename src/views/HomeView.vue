<template>
  <BaseLayout />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useCalendarStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';

const calendarStore = useCalendarStore();
const { initCalendar } = calendarStore;

onBeforeMount(() => {
  initCalendar();
});
</script>
