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
              class="sticky top-[100px] flex items-center py-3 bg-white font-bold z-40"
              :class="{
                'current-day': day.isCurrent,
              }"
            >
              {{ day.number }}
              {{ day.name }}
              <div
                v-if="day.isCurrent"
                :class="day.isCurrent ? 'current-day' : ''"
                class="shrink-0 w-2 h-2 ml-2 rounded-full bg-green-500 select-none animate-pulse"
              />
            </div>
          </template>

          <template #content>
            <div
              v-for="(expenseItem, index) in expenses[day.id]"
              :key="index"
              class="flex flex-wrap gap-1"
            >
              <div v-for="expense in expenseItem" :key="expense.id">
                <BaseExpense
                  :createdAt="expense.createdAt"
                  :value="expense.value"
                  :currency="expense.currency"
                />
              </div>
            </div>

            <div v-if="!expenses[day.id].items.length" class="flex items-center w-full">
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
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';

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
