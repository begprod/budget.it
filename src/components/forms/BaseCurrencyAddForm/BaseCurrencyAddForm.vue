<template>
  <BaseFormBar @submit="submitNewCurrency(newCurrencyInput.value)" data-test-id="currency-add-form">
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
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { string } from 'yup';
import { Plus } from 'lucide-vue-next';
import { useCommonStore, useSettingsStore } from '@/stores';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();

const { setToast } = commonStore;
const { addNewCurrency } = settingsStore;

const { currencies } = storeToRefs(settingsStore);

const newCurrencySchema = string().required().min(1).max(5);

const newCurrencyInput = reactive({
  value: '',
  isError: false,
});

watch(newCurrencyInput, () => {
  newCurrencyInput.value.length === 0 && (newCurrencyInput.isError = false);
});

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

    setToast({
      type: 'error',
      message: 'The name of the currency is too long or short',
      duration: 5,
    });
  }
};
</script>
