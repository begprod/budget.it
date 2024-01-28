<template>
  <BaseLayout>
    <BaseExpensesList />
    <div class="container fixed left-0 right-0 bottom-14 w-full px-3 mx-auto z-[100]">
      <BaseFormBar @submit="submitExpense(expense)" class="rounded-xl shadow-md">
        <template #input>
          <BaseInput
            id="expense-input"
            v-model="expense"
            type="number"
            :placeholder="`Enter expense (${getActiveCurrency.name})`"
            class="pr-14"
          />
        </template>
        <template #button>
          <BaseButton
            title="Add expense"
            @click="submitExpense(expense)"
          >
            <template #leftIcon>
              <BanknotesIcon class="w-5 h-5" />
            </template>
          </BaseButton>
        </template>
      </BaseFormBar>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
import { useCalendarStore, useExpensesStore, useSettingsStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';

const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const settingsStore = useSettingsStore();
const { initCalendar } = calendarStore;
const { initExpensesObject, addExpense } = expensesStore;
const { getActiveCurrency } = storeToRefs(settingsStore);
const expense = ref('');

onBeforeMount(() => {
  initCalendar();
  initExpensesObject();
});

const submitExpense = (expenseValue: string) => {
  addExpense(expenseValue);

  expense.value = '';
};
</script>
