<template>
  <div class="fixed right-0 bottom-0 left-0 w-full z-[100]">
    <div v-if="route.name === 'home'" class="container mx-auto px-5">
      <BaseButton class="mb-2 shadow-md" @click="showExpenseInputHandler">
        <template #text> Add expense </template>
        <template #rightIcon>
          <BanknotesIcon class="w-5 h-5 ml-2" />
        </template>
      </BaseButton>

      <BaseProgressBar
        class="mb-2 shadow-md"
        :label="`${getCurrentMonth?.name} – ${countMonthlyExpenses(getCurrentMonth?.id)}`"
        :percentage="countProgressPercentage(getCurrentMonth?.id)"
      />
    </div>

    <div class="px-6 py-5 bg-white border-t border-slate-200">
      <div class="max-w-96 flex justify-around mx-auto">
        <RouterLink to="/">
          <HomeIcon class="w-6 h-6 text-slate-400" />
        </RouterLink>
        <!-- <RouterLink to="/dashboard">
        <ChartBarIcon class="w-6 h-6 text-slate-400" />
      </RouterLink> -->
        <RouterLink to="/settings">
          <Cog6ToothIcon class="w-6 h-6 text-slate-400" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMonth } from '@/types';
import { nextTick } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { HomeIcon, Cog6ToothIcon, BanknotesIcon } from '@heroicons/vue/24/outline';
import { useCommonStore, useSettingsStore, useCalendarStore, useExpensesStore } from '@/stores';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseProgressBar from '@/components/ui/BaseProgressBar/BaseProgressBar.vue';

const route = useRoute();
const commonStore = useCommonStore();
const settingsStore = useSettingsStore();
const calendarStore = useCalendarStore();
const expensesStore = useExpensesStore();

const { showAddExpenseInput } = commonStore;
const { getCurrentMonth, getDaysByMonthId } = calendarStore;
const { getMonthlyExpenses } = expensesStore;
const { dailyBudget } = storeToRefs(settingsStore);

const showExpenseInputHandler = () => {
  showAddExpenseInput();

  nextTick(() => {
    const input = document.getElementById('expense-input');
    input?.focus();
  });
};

const countProgressPercentage = (monthId: IMonth['id'] | undefined) => {
  if (monthId === undefined) {
    return 0;
  }

  const monthExpensesCounter = getMonthlyExpenses(monthId);

  if (monthExpensesCounter > getDaysByMonthId(monthId).length * dailyBudget.value) {
    return 100;
  }

  return (monthExpensesCounter / (getDaysByMonthId(monthId).length * dailyBudget.value)) * 100;
};

const countMonthlyExpenses = (monthId: IMonth['id'] | undefined) => {
  if (monthId === undefined) {
    return '';
  }

  return `${getMonthlyExpenses(monthId)} / ${getDaysByMonthId(monthId).length * dailyBudget.value}`;
};
</script>

<style scoped lang="scss">
.router-link-exact-active {
  svg {
    @apply text-slate-900;
  }
}
</style>
