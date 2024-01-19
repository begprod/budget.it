<template>
  <BaseHeader>
    <template #settings>
      <button type="button" @click="toggleSidebar">
        <Cog6ToothIcon class="w-6 h-6 text-slate-600" />
      </button>
    </template>
  </BaseHeader>

  <main class="relative container mx-auto z-10">
    <BaseStats />
    {{ expense }}
    <BasePanel>
      <BaseExpenseList />

      <div class="container fixed left-0 right-0 bottom-2 w-full px-4 mx-auto">
        <div
          class="flex items-center rounded-xl overflow-hidden bg-white border border-slate-300 shadow-lg"
        >
          <BaseInput
            id="expense-input"
            v-model="expense"
            type="number"
            placeholder="Enter expense"
            class="border-none focus:outline-none focus:border-none"
          />

          <BaseButton title="Add expense" class="w-1/3 rounded-l-none">
            <template #leftIcon>
              <PlusCircleIcon class="w-6 h-6" />
            </template>
          </BaseButton>
        </div>
      </div>
    </BasePanel>
  </main>

  <BaseSidebar :is-open="isSidebarOpen" @toggle="toggleSidebar">
    <template #currencies>
      > {{ getActiveCurrencies.name }}
      <BaseRadioButton
        v-for="currency in currencies"
        :id="currency.name"
        :key="currency.name"
        :label="currency.name"
        :checked="currency.isActive"
        :value="currency.name"
        name="currencies"
        @change="setActiveCurrency(currency.name)"
      />
    </template>

    <template #daily>
      {{ dailyBudget }}
      <BaseInput id="daily-input" v-model="dailyBudgetValue" type="number" placeholder="Enter daily budget" />
      <BaseButton @click="setDailyBudget(dailyBudgetValue)" class="mt-2">
        <template #text>Save daily budget</template>
      </BaseButton>
    </template>
  </BaseSidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { useSettingsStore } from '@/stores';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseSidebar from '@/components/layouts/partials/BaseSidebar/BaseSidebar.vue';
import BasePanel from '@/components/ui/BasePanel/BasePanel.vue';
import BaseStats from '@/components/BaseStats/BaseStats.vue';
import BaseExpenseList from '@/components/BaseExpenseList/BaseExpenseList.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseRadioButton from '@/components/ui/controls/BaseRadioButton/BaseRadioButton.vue';

const settingsStore = useSettingsStore();
const { setActiveCurrency, setDailyBudget, dailyBudget } = settingsStore;
const { getActiveCurrencies, currencies } = storeToRefs(settingsStore);

const isSidebarOpen = ref(false);
const expense = ref('');
const dailyBudgetValue = ref(dailyBudget);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
