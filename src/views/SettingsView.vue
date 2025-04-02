<template>
  <BaseLayout>
    <template #title> Settings </template>

    <template #wrapper>
      <div class="island">
        <h3 class="island__title">Current month daily budget</h3>

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
                <Check class="icon icon_md" />
              </template>
            </BaseButton>
          </template>
        </BaseFormBar>
      </div>

      <div class="island">
        <h3 class="island__title">Default currency</h3>

        <div class="currencies">
          <BaseCurrencyItem
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
                <Plus class="icon icon_md" />
              </template>
            </BaseButton>
          </template>
        </BaseFormBar>
      </div>

      <div class="island">
        <h3 class="island__title">Import/Export expenses data</h3>
        <h4 v-if="lastBackupDate" class="island__description">Last backup: {{ lastBackupDate }}</h4>

        <div class="exports">
          <BaseButton @click="exportDataHandler()">
            <template #text> Export to file </template>
            <template #rightIcon>
              <FileUp class="icon icon_lg" />
            </template>
          </BaseButton>
          <BaseButton @click="importDataHandler">
            <template #text> Import from file </template>
            <template #rightIcon>
              <FileDown class="icon icon_lg" />
            </template>
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { number, string } from 'yup';
import { Check, Plus, FileDown, FileUp } from 'lucide-vue-next';
import { useCommonStore, useSettingsStore } from '@/stores';
import { exportDataFromLocalStorage, importDataToLocalStorage, getDateWithTime } from '@/helpers';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';
import BaseCurrencyItem from '@/components/BaseCurrencyItem/BaseCurrencyItem.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();

const { setToast, setLastBackupDate } = commonStore;
const { setDailyBudget, addNewCurrency, dailyBudget } = settingsStore;
const { lastBackupDate } = storeToRefs(commonStore);
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
const newCurrencySchema = string().required().min(1).max(15);

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
      message: 'Enter an integer greater than 9',
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

    setToast({ type: 'error', message: 'The name of the currency is too long', duration: 5 });
  }
};

const exportDataHandler = () => {
  exportDataFromLocalStorage('budget.it:expenses');
  setLastBackupDate(getDateWithTime());
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

      setLastBackupDate(getDateWithTime());
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

<style scoped>
.island {
  margin-bottom: 2rem;
  padding: clamp(1rem, 2.34vw, 1.5rem);
  border: 1px solid var(--slate-200);
  border-radius: 0.75rem;
}

.island__title {
  margin: 0 0 1rem 0;
  line-height: 1;
  font-size: var(--typo-size-md);
  color: var(--slate-600);
  user-select: none;
}

.island__description {
  margin-bottom: 1rem;
  font-size: var(--typo-size-xs);
  color: var(--slate-500);
  user-select: none;
}

.currencies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.exports {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
