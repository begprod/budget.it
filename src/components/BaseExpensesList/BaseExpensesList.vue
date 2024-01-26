<template>
  <BaseDateWrapper v-for="month in months" :key="month.id">
    <template #title>
      <div class="sticky top-[53px] py-4 text-2xl text-slate-700 font-bold bg-white">
        {{ month.name }}
      </div>
    </template>

    <template #content>
      <BaseDateWrapper
        v-for="day in getDaysByMonthId(month.id)"
        :key="day.id"
        class="sticky top-[100px] bg-white"
      >
        <template #title>
          <div class="flex items-center py-3 font-thin">
            {{ day.number }}
            {{ day.name }}
          </div>
        </template>

        <template #content>
          <div
            v-if="day.isCurrent"
            :class="day.isCurrent ? 'current-day' : ''"
            class="shrink-0 w-4 h-4 ml-2 rounded-full bg-green-500 select-none"
          />

          <!-- <div v-for="(expenseItem, index) in expenses[`${day.id}`]" :key="index">
            <div v-for="expense in expenseItem" :key="expense.id">
              {{ expense.value }}
            </div>
          </div> -->
        </template>
      </BaseDateWrapper>
    </template>
  </BaseDateWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalendarStore, useExpensesStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const { months } = storeToRefs(calendarStore);
const { getDaysByMonthId } = calendarStore;
const { expenses } = storeToRefs(expensesStore);
</script>
