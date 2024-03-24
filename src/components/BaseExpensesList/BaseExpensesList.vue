<template>
  <BaseDateWrapper v-for="month in months" :key="month.id">
    <template #title>
      <div class="mb-5 py-5 text-xl font-bold border-t border-b">
        {{ month.name }} / {{ getMonthlyExpenses(month.id) }}
      </div>
    </template>

    <template #content>
      <div class="grid gap-3">
        <BaseDateWrapper
          v-for="day in getDaysByMonthId(month.id)"
          :key="day.id"
          class="relative last:mb-12"
        >
          <template #title>
            <div
              class="sticky top-[52px] flex flex-col items-start py-1 bg-white font-bold select-none z-30"
              :class="{
                'current-day': day.isCurrent,
              }"
            >
              <div class="flex">
                <div class="flex flex-col">
                  <div class="flex items-center text-sm lg:text-base">
                    {{ day.number }} {{ day.name }}
                    <div
                      v-if="day.isCurrent"
                      class="shrink-0 w-2 h-2 ml-2 rounded-full bg-green-500 select-none animate-pulse"
                    />
                  </div>
                </div>
              </div>

              <div
                class="text-xs lg:text-sm"
                :class="{
                  'text-emerald-500': getDailyExpenses(day.id) <= dailyBudget,
                  'text-rose-500': getDailyExpenses(day.id) > dailyBudget,
                  hidden: getDailyExpenses(day.id) === 0,
                }"
              >
                {{ getDailyExpenses(day.id) }} / {{ dailyBudget }}
              </div>
            </div>
          </template>

          <template #content>
            <div
              v-for="(expenseItem, index) in expenses[day.id]"
              :key="index"
              class="flex flex-wrap gap-2"
            >
              <template v-for="expense in expenseItem" :key="expense.id">
                <BaseExpense
                  :createdAt="expense.createdAt"
                  :value="expense.value"
                  :currency="expense.currency"
                  :class="{ 'opacity-30': !day.isCurrent }"
                  @click="removeExpense(expense.id, day.id)"
                />
              </template>

              <div v-if="!expenses[day.id].items.length" class="flex items-center w-full">
                <BaseEmptyListMessage message="No expenses for this day" />
              </div>

              <Transition>
                <BaseFormBar
                  v-if="day.isCurrent && isAddExpenseInputVisible"
                  @submit="submitExpense(expense)"
                  class="!absolute top-[calc(100%+10px)] w-full rounded-xl shadow-md mb-6 z-50"
                >
                  <template #input>
                    <BaseInput
                      id="expense-input"
                      v-model="expense"
                      type="number"
                      inputmode="numeric"
                      :placeholder="`Enter expense (${getActiveCurrency.name})`"
                      :has-error="isExpenseFieldHasError"
                      @on-blur="hideAddExpenseInput"
                    />
                  </template>
                </BaseFormBar>
              </Transition>
            </div>
          </template>
        </BaseDateWrapper>
      </div>
    </template>
  </BaseDateWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { number } from 'yup';
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseDateWrapper from '@/components/ui/BaseDateWrapper/BaseDateWrapper.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import BaseExpense from '@/components/BaseExpense/BaseExpense.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();

const { isAddExpenseInputVisible } = storeToRefs(commonStore);
const { months } = storeToRefs(calendarStore);
const { expenses } = storeToRefs(expensesStore);
const { hideAddExpenseInput } = commonStore;
const { getDaysByMonthId } = calendarStore;
const { getMonthlyExpenses, getDailyExpenses, addExpense, removeExpense } = expensesStore;
const { getActiveCurrency, dailyBudget } = storeToRefs(settingsStore);

const expense = ref('');
const isExpenseFieldHasError = ref(false);
const expenseSchema = number().integer().required().min(1);

const submitExpense = (expenseValue: string) => {
  try {
    expenseSchema.validateSync(expenseValue);
    addExpense(expenseValue);

    expense.value = '';
    isExpenseFieldHasError.value = false;
  } catch (error) {
    isExpenseFieldHasError.value = true;
  }
};
</script>

<style scoped lang="scss">
.current-day {
  scroll-margin-top: 52px;
}

.v-enter-active,
.v-leave-active {
  transform: translateY(0);
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
