<template>
  <BaseLayout>
    <div class="px-5">
      <div class="mb-7 pt-4 text-2xl text-slate-700 font-bold select-none">Settings</div>

      <div class="mb-10">
        <div class="mb-3 text-slate-500 select-none">Current month daily budget</div>

        <BaseFormBar @submit="submitDailyBudget(dailyBudgetInput.value)">
          <template #input>
            <BaseInput
              id="daily-input"
              v-model="dailyBudgetInput.value"
              type="number"
              inputmode="numeric"
              placeholder="Set daily budget"
              autocomplete="off"
              :is-error="dailyBudgetInput.isError"
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

      <div class="mb-10">
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

        <BaseFormBar @submit="submitNewCurrency(newCurrencyInput.value)">
          <template #input>
            <BaseInput
              id="currency-input"
              v-model="newCurrencyInput.value"
              type="text"
              placeholder="Add new currency"
              autocomplete="off"
              :is-error="newCurrencyInput.isError"
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
      </div>

      <div class="mb-10">
        <div class="mb-3 text-slate-500 select-none">Import/Export expenses data</div>

        <BaseButton class="w-full" @click="exportDataFromLocalStorage('budget.it:expenses')">
          <template #text> Export to file </template>
        </BaseButton>
        <BaseButton class="w-full mt-2" @click="importDataHandler">
          <template #text> Import from file </template>
        </BaseButton>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { number, string } from 'yup';
import { PlusIcon, CheckIcon } from '@heroicons/vue/24/outline';
import { useCommonStore, useSettingsStore } from '@/stores';
import { exportDataFromLocalStorage, importDataToLocalStorage } from '@/helpers';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseCurrencyGroupItem from '@/components//BaseCurrencyGroupItem/BaseCurrencyGroupItem.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();

const { setToast } = commonStore;
const { setDailyBudget, addNewCurrency, dailyBudget } = settingsStore;
const { currencies } = storeToRefs(settingsStore);

const dailyBudgetInput = reactive({
  value: dailyBudget,
  isError: false,
});

const newCurrencyInput = reactive({
  value: '',
  isError: false,
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

    dailyBudgetInput.value = budget;
    dailyBudgetInput.isError = false;

    setToast({ type: 'success', message: 'Daily budget updated', duration: 5 });
  } catch (error: any) {
    dailyBudgetInput.isError = true;

    setToast({
      type: 'error',
      message: error.message || 'Enter an integer greater than 9',
      duration: 5,
    });
  }
};

const submitNewCurrency = (currency: string) => {
  if (currencies.value.some((item) => item.name === currency)) {
    newCurrencyInput.isError = true;

    setToast({ type: 'error', message: 'Currency already exists', duration: 5 });

    return;
  }

  try {
    newCurrencySchema.validateSync(currency);
    addNewCurrency(currency);

    newCurrencyInput.value = '';
    newCurrencyInput.isError = false;

    setToast({ type: 'success', message: 'Currency added successfully', duration: 5 });
  } catch (error) {
    newCurrencyInput.isError = true;

    setToast({ type: 'error', message: 'Enter a valid currency', duration: 5 });
  }
};

const importDataHandler = async () => {
  await importDataToLocalStorage('budget.it:expenses')
    .then(() => {
      setToast({
        type: 'success',
        message: 'Data imported successfully',
        duration: 5,
        callback: () => location.reload(),
      });
    })
    .catch(() => {
      setToast({
        type: 'error',
        message: 'Something went wrong while importing data',
        duration: 5,
      });
    });
};
</script>
