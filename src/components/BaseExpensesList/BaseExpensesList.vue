<template>
  <BaseDateWrapper v-for="month in months" :key="month.id">
    <template #title>
      <div class="sticky top-[50px] py-4 text-2xl text-slate-700 font-bold bg-white z-50">
        {{ month.name }}
      </div>
    </template>

    <template #content>
      <div class="grid gap-3">
        <BaseDateWrapper v-for="day in getDaysByMonthId(month.id)" :key="day.id">
          <template #title>
            <div
              class="sticky top-[100px] flex items-center py-3 bg-white font-thin z-40"
              :class="{
                'current-day': day.isCurrent,
              }"
            >
              <div
                v-if="day.isCurrent"
                :class="day.isCurrent ? 'current-day' : ''"
                class="shrink-0 w-2 h-2 mr-2 rounded-full bg-green-500 select-none animate-pulse"
              />
              {{ day.number }}
              {{ day.name }}
            </div>
          </template>

          <template #content>
            <div v-for="(expenseItem, index) in expenses[day.id]" :key="index">
              <div v-for="expense in expenseItem" :key="expense.id">
                {{ expense.value }}
              </div>
            </div>

            <div
              v-if="!expenses[day.id].items.length"
              class="flex items-center justify-center w-full"
            >
              <BaseEmptyListMessage message="No expenses for this day" />
            </div>
          </template>
        </BaseDateWrapper>
      </div>
    </template>
  </BaseDateWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendarStore, useExpensesStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
</script>

<style scoped lang="scss">
.current-day {
  scroll-margin-top: 120px;
}
</style>
