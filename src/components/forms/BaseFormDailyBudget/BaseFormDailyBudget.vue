<template>
  <BaseFormBar @submit="submitDailyBudget(dailyBudgetInput.value)" data-test-id="daily-budget-form">
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
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { number } from 'yup';
import { Check } from 'lucide-vue-next';
import { useCommonStore, useSettingsStore } from '@/stores';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import BaseFormBar from '@/components//BaseFormBar/BaseFormBar.vue';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();

const { setToast } = commonStore;
const { setDailyBudget } = settingsStore;
const { dailyBudget } = storeToRefs(settingsStore);

const dailyBudgetInput = reactive({
  value: dailyBudget,
  isError: false,
});
const dailyBudgetSchema = number().integer().required().min(10);

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

defineExpose({
  dailyBudgetInput,
});
</script>
