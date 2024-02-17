<template>
  <BaseLayout additional-classes="!pb-24">
    <BaseExpensesList />
    <div class="container fixed left-0 right-0 bottom-14 w-full px-5 mx-auto z-[100]">
      <BaseFormBar @submit="submitExpense(expense)" class="rounded-xl shadow-md">
        <template #input>
          <BaseInput
            id="expense-input"
            v-model="expense"
            type="number"
            inputmode="numeric"
            :placeholder="`Enter expense (${getActiveCurrency.name})`"
            :has-error="isExpenseFieldHasError"
          />
        </template>
        <template #button>
          <BaseButton title="Add expense" @click="submitExpense(expense)">
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
import { ref, onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { number } from 'yup';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
import { useCommonStore, useCalendarStore, useExpensesStore, useSettingsStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseExpensesList from '@/components/BaseExpensesList/BaseExpensesList.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';

const commonStore = useCommonStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();
const settingsStore = useSettingsStore();
const { lastCalendarUpdateDate } = storeToRefs(commonStore);
const { setLastUpdateDate } = commonStore;
const { initCalendar } = calendarStore;
const { initExpensesObject, addExpense } = expensesStore;
const { getActiveCurrency } = storeToRefs(settingsStore);
const expense = ref('');
const isExpenseFieldHasError = ref(false);

onBeforeMount(() => {
  const updateDate = new Date().toLocaleDateString();

  setLastUpdateDate(updateDate);

  initCalendar();
  initExpensesObject();

  window.addEventListener('focus', tabFocusHandler);
});

onMounted(() => {
  scrollToCurrentDay();
});

const scrollToCurrentDay = () => {
  const currentDayElement = document.getElementsByClassName('current-day')[0];

  if (currentDayElement) {
    currentDayElement.scrollIntoView({
      block: 'start',
    });
  }
};

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

const tabFocusHandler = () => {
  if (!lastCalendarUpdateDate.value) {
    return;
  }

  const currentDate = new Date().toLocaleDateString();

  if (currentDate !== lastCalendarUpdateDate.value) {
    setLastUpdateDate(currentDate);
    initCalendar();
    initExpensesObject();
  }
};
</script>
