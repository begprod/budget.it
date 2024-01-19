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
            class="border-r border-slate-300"
          />

          <BaseButton title="Add expense">
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
      > {{ currentCurrency }}
      <BaseRadioButton
        v-for="currency in currencies"
        :id="currency"
        :key="currency"
        :label="currency"
        :checked="isCurrencyActive(currency)"
        :value="currency"
        name="currencies"
        @change="handleCurrencyChange"
      />
    </template>
  </BaseSidebar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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
const { currencies } = storeToRefs(settingsStore);

const isSidebarOpen = ref(true);
const expense = ref('');
const currentCurrency = ref('thb');

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isCurrencyActive = computed(() => (currency: string) => {
  return currency.toLowerCase() === currentCurrency.value.toLowerCase();
});

const handleCurrencyChange = (currency: string) => {
  currentCurrency.value = currency;
};
</script>
