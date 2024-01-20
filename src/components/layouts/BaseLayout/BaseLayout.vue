<template>
  <BaseHeader>
    <template #settings>
      <button type="button" @click="toggleSidebar">
        <Cog6ToothIcon class="w-6 h-6 text-slate-600" />
      </button>
    </template>
  </BaseHeader>

  <main class="container mx-auto relative z-10">
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
            :placeholder="`Enter expense (${getActiveCurrencies.name})`"
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

  <BaseSettingsPanel :is-open="isSidebarOpen" @toggle="toggleSidebar">
    <div class="mb-5 text-2xl text-slate-700 font-bold">Settings</div>

    <template #currencies>
      <div class="mb-7">
        <div class="mb-2">
          <div class="mb-2 text-slate-500">Default currency</div>
          <div class="flex flex-wrap gap-3">
            <div v-for="currency in currencies" :key="currency.name">
              <BaseRadioButton
                :id="currency.name"
                :label="currency.name"
                :checked="currency.isActive"
                :value="currency.name"
                name="currencies"
                @change="setActiveCurrency(currency.name)"
              />
              <div v-if="currency.isDeletable && !currency.isActive" @click="deleteCurrency(currency.name)">x</div>
            </div>
          </div>
        </div>
        <div>
          <BaseInput
            id="currency-input"
            v-model="newCurrency"
            type="text"
            placeholder="Enter currency"
          />
          <BaseButton class="mt-2" @click="saveNewCurrency(newCurrency)">
            <template #text>Add new currency</template>
          </BaseButton>
        </div>
      </div>
    </template>

    <template #daily>
      <div class="mb-2 text-slate-500">Daily budget</div>
      <BaseInput
        id="daily-input"
        v-model="dailyBudgetValue"
        type="number"
        placeholder="Enter daily budget"
      />
      <BaseButton @click="setDailyBudget(dailyBudgetValue)" class="mt-2">
        <template #text>Save daily budget</template>
      </BaseButton>
    </template>
  </BaseSettingsPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { useSettingsStore } from '@/stores';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseSettingsPanel from '@/components/layouts/partials/BaseSettingsPanel/BaseSettingsPanel.vue';
import BasePanel from '@/components/ui/BasePanel/BasePanel.vue';
import BaseStats from '@/components/BaseStats/BaseStats.vue';
import BaseExpenseList from '@/components/BaseExpenseList/BaseExpenseList.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseRadioButton from '@/components/ui/controls/BaseRadioButton/BaseRadioButton.vue';

const settingsStore = useSettingsStore();
const { setActiveCurrency, setDailyBudget, addNewCurrency, deleteCurrency, dailyBudget } = settingsStore;
const { getActiveCurrencies, currencies } = storeToRefs(settingsStore);

const isSidebarOpen = ref(true);
const expense = ref('');
const newCurrency = ref('');
const dailyBudgetValue = ref(dailyBudget);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const saveNewCurrency = (currency: string) => {
  addNewCurrency(currency);

  newCurrency.value = '';
};
</script>
