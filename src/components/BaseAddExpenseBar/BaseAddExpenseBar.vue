<template>
  <div class="container fixed left-0 right-0 bottom-14 w-full px-3 mx-auto z-[100]">
    <div
      class="grid grid-cols-12 rounded-xl overflow-hidden bg-white border border-slate-300 shadow-md"
    >
      <BaseInput
        id="expense-input"
        v-model="expense"
        type="number"
        :placeholder="`Enter expense (${getActiveCurrency.name})`"
        class="col-span-10 border-none focus:outline-none focus:border-none"
      />

      <BaseButton
        title="Add expense"
        class="col-span-2 border-l border-y-0 border-r-0 rounded-l-none"
        @click="addExpense(expense)"
      >
        <template #leftIcon>
          <PlusIcon class="w-6 h-6" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useExpensesStore, useSettingsStore } from '@/stores';
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const expensesStore = useExpensesStore();
const settingsStore = useSettingsStore();

const { addExpense } = expensesStore;
const { getActiveCurrency } = storeToRefs(settingsStore);
const expense = ref('');
</script>
