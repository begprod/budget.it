<template>
  <BaseLayout>
    <div class="mb-7 pt-4 text-2xl text-slate-700 font-bold select-none">Settings</div>

    <div class="mb-10">
      <div class="mb-3 text-slate-500 select-none">Daily budget</div>

      <BaseFormBar @submit="submitDailyBudget(dailyBudgetInput.value)">
        <template #input>
          <BaseInput
            id="daily-input"
            v-model="dailyBudgetInput.value"
            type="number"
            placeholder="Set daily budget"
            autocomplete="off"
            :is-error="dailyBudgetInput.isError"
            :error-message="dailyBudgetInput.errorMessage"
            :is-success="dailyBudgetInput.isSuccess"
            :success-message="dailyBudgetInput.successMessage"
          />
        </template>
        <template #button>
          <BaseButton type="submit">
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

    <BaseFormBar @submit="submitNewCurrency(newCurrencyInput.value)">
      <template #input>
        <BaseInput
          id="currency-input"
          v-model="newCurrencyInput.value"
          type="text"
          placeholder="Add new currency"
          autocomplete="off"
          :is-error="newCurrencyInput.isError"
          :error-message="newCurrencyInput.errorMessage"
        />
      </template>
      <template #button>
        <BaseButton type="submit">
          <template #text>
            <PlusIcon class="w-5 h-5" />
          </template>
        </BaseButton>
      </template>
    </BaseFormBar>
  </BaseLayout>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
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

const dailyBudgetInput = reactive({
  value: dailyBudget,
  isError: false,
  errorMessage: 'Enter an integer greater than 9',
  isSuccess: false,
  successMessage: 'Daily budget updated',
});

const newCurrencyInput = reactive({
  value: '',
  isError: false,
  errorMessage: 'Currency already exists',
});

const dailyBudgetSchema = number().integer().required().min(10);
const newCurrencySchema = string().required().min(1).max(10);

watch(newCurrencyInput, () => {
  newCurrencyInput.value.length === 0 && (newCurrencyInput.isError = false);
});

const submitDailyBudget = (budget: number) => {
  try {
    dailyBudgetSchema.validateSync(budget);
    setDailyBudget(budget);

    dailyBudgetInput.isSuccess = true;

    dailyBudgetInput.value = budget;
    dailyBudgetInput.isError = false;

    setTimeout(() => {
      dailyBudgetInput.isSuccess = false;
    }, 3000);
  } catch (error) {
    dailyBudgetInput.isError = true;
    dailyBudgetInput.isSuccess = false;
  }
};

const submitNewCurrency = (currency: string) => {
  if (currencies.value.some((item) => item.name === currency)) {
    newCurrencyInput.isError = true;

    return;
  }

  try {
    newCurrencySchema.validateSync(currency);
    addNewCurrency(currency);

    newCurrencyInput.value = '';
    newCurrencyInput.isError = false;
  } catch (error) {
    newCurrencyInput.isError = true;
  }
};
</script>
