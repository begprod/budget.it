<template>
  <div class="relative flex flex-col pb-10">
    <BaseTitle v-for="month in months" :key="month.id">
      <div class="sticky top-0 p-3 text-sm font-bold">{{ month.name }}</div>

      <BaseTitle
        v-for="day in getDaysByMonthId(month.id)"
        :key="day.id"
        class="sticky top-[49px] flex items-center bg-white"
      >
        <div class="p-3 text-sm font-thin">
          {{ day.number }}
          {{ day.name }}
        </div>

        <div
          v-if="day.isCurrent"
          :class="day.isCurrent ? 'current-day' : ''"
          class="shrink-0 w-3 h-3 mr-3 rounded-full bg-green-500 select-none"
        />
      </BaseTitle>
    </BaseTitle>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCalendarStore } from '@/stores';
import BaseTitle from '@/components/ui/BaseTitle/BaseTitle.vue';

const calendarStore = useCalendarStore();
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;

onMounted(() => {
  const currentDayElement = document.getElementsByClassName('current-day')[0];

  if (currentDayElement) {
    currentDayElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
});
</script>
