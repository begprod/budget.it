<template>
  <BaseTitle v-for="month in months" :key="month.id">
    <div class="sticky top-[72px] mb-2 text-2xl text-slate-700 font-bold">{{ month.name }}</div>

    <BaseTitle
      v-for="day in getDaysByMonthId(month.id)"
      :key="day.id"
      class="sticky top-[110px] flex items-center bg-white"
    >
      <div class="py-3 font-thin">
        {{ day.number }}
        {{ day.name }}
      </div>

      <div
        v-if="day.isCurrent"
        :class="day.isCurrent ? 'current-day' : ''"
        class="shrink-0 w-4 h-4 ml-2 rounded-full bg-green-500 select-none"
      />
    </BaseTitle>
  </BaseTitle>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores';
import BaseTitle from '@/components/ui/BaseTitle/BaseTitle.vue';

const calendarStore = useCalendarStore();
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
</script>
