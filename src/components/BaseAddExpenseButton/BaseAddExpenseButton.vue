<template>
  <BaseButton
    class="mb-2 shadow-md"
    @click="showExpenseInputHandler()"
    data-test-id="add-expense-button"
  >
    <template #text> Add expense </template>
    <template #rightIcon>
      <BanknotesIcon class="w-5 h-5 ml-2" />
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import { BanknotesIcon } from '@heroicons/vue/24/outline';
import { useCommonStore } from '@/stores';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const commonStore = useCommonStore();
const { showAddExpenseInput } = commonStore;

const showExpenseInputHandler = () => {
  showAddExpenseInput();

  nextTick(() => {
    const input = document.getElementById('expense-input');
    input?.focus();
  });
};

defineExpose({
  showExpenseInputHandler,
});
</script>
