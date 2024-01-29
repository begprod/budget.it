<template>
  <BaseLayout>
    <div class="mb-7 text-2xl text-slate-700 font-bold select-none">Settings</div>

    <div class="mb-10">
      <div class="mb-3 text-slate-500 select-none">Daily budget</div>

      <BaseFormBar @submit="submitDailyBudget(dailyBudgetValue)">
        <template #input>
          <BaseInput
            id="daily-input"
            v-model="dailyBudgetValue"
            type="number"
            placeholder="Set daily budget"
            autocomplete="off"
            :has-error="isDailyBudgetFieldHasError"
          />
        </template>
        <template #button>
          <BaseButton @click="submitDailyBudget(dailyBudgetValue)">
            <template #text>
              <CheckIcon class="w-5 h-5" />
            </template>
          </BaseButton>
        </template>
      </BaseFormBar>
    </div>

    <div class="mb-2">
      <div class="mb-3 text-slate-500 select-none">Default currency</div>

      <div class="flex flex-wrap gap-1 mb-3">
        <BaseCurrencyGroupItem
          v-for="currency in currencies"
          :key="currency.name"
          :id="currency.name"
          :label="currency.name"
          :value="currency.name"
          :is-selected="currency.isActive"
          :is-default="currency.isDefault"
          name="currencies"
        />
      </div>
    </div>

    <BaseFormBar @submit="submitNewCurrency(newCurrency)">
      <template #input>
        <BaseInput
          id="currency-input"
          v-model="newCurrency"
          type="text"
          placeholder="Add new currency"
          autocomplete="off"
          :has-error="isCurrencyFieldHasError"
          error-message="Currency already exists"
        />
      </template>
      <template #button>
        <BaseButton @click="submitNewCurrency(newCurrency)">
          <template #text>
            <PlusIcon class="w-5 h-5" />
          </template>
        </BaseButton>
      </template>
    </BaseFormBar>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { number, string } from 'yup';
import { PlusIcon, CheckIcon } from '@heroicons/vue/24/outline';
import { useSettingsStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseCurrencyGroupItem from '@/components//BaseCurrencyGroupItem/BaseCurrencyGroupItem.vue';

const settingsStore = useSettingsStore();

const { setDailyBudget, addNewCurrency, dailyBudget } = settingsStore;
const { currencies } = storeToRefs(settingsStore);

const newCurrency = ref('');
const dailyBudgetValue = ref(dailyBudget);
const isDailyBudgetFieldHasError = ref(false);
const isCurrencyFieldHasError = ref(false);

const dailyBudgetSchema = number().integer().required().min(2);
const newCurrencySchema = string().required().min(1).max(10);

watch(newCurrency, () => {
  newCurrency.value.length === 0 && (isCurrencyFieldHasError.value = false);
});

const submitDailyBudget = (budget: number) => {
  try {
    dailyBudgetSchema.validateSync(budget);
    setDailyBudget(budget);

    dailyBudgetValue.value = budget;
    isDailyBudgetFieldHasError.value = false;
  } catch (error) {
    isDailyBudgetFieldHasError.value = true;
  }
};

const submitNewCurrency = (currency: string) => {
  if (currencies.value.some((item) => item.name === currency)) {
    isCurrencyFieldHasError.value = true;

    return;
  }

  try {
    newCurrencySchema.validateSync(currency);
    addNewCurrency(currency);

    newCurrency.value = '';
    isCurrencyFieldHasError.value = false;
  } catch (error) {
    isCurrencyFieldHasError.value = true;
  }
};
</script>
