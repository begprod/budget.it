<template>
  <BaseHeader />

  <main class="container mx-auto">
    <div class="p-12">
      <p>3000 in {{ months[0].name }}</p>
      <small>43432 in last {{ months.length }} months</small>
    </div>

    <BasePanel>
      <div class="relative flex flex-col">
        <div v-for="month in months" :key="month.id">
          <div class="sticky top-0 bg-slate-400">{{ month.name }}</div>

          <BaseDayItem v-for="day in getDaysByMonthId(month.id)" :key="day.id" :day="day" />
        </div>
      </div>
    </BasePanel>
  </main>

  <BaseFooter />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseFooter from '@/components/layouts/partials/BaseFooter/BaseFooter.vue';
import BasePanel from '@/components/ui/BasePanel/BasePanel.vue';
import BaseDayItem from '@/components/BaseDayItem/BaseDayItem.vue';

const calendarStore = useCalendarStore();
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
</script>
