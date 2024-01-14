<template>
  <BaseHeader />

  <main class="container mx-auto px-3 pb-10">
    <div class="p-12">
      <p>3000</p>
      <small>last 6 months</small>
    </div>

    <div class="flex flex-col">
      <div v-for="month in months" :key="month.id">
        {{ month.name }}

        <BaseDayItem v-for="day in getDaysByMonthId(month.id)" :key="day.id" :day="day" />
      </div>
    </div>
  </main>

  <BaseFooter />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseFooter from '@/components/layouts/partials/BaseFooter/BaseFooter.vue';
import BaseDayItem from '@/components/BaseDayItem/BaseDayItem.vue';

const calendarStore = useCalendarStore();
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
</script>
