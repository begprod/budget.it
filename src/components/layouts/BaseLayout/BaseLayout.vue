<template>
  <BaseHeader />

  <main class="relative container mx-auto z-10">
    <BaseStats />
    {{ expense }}
    <BasePanel>
      <BaseExpenseList />

      <BaseInput
        v-model="expense"
        id="expense-input"
        type="number"
        placeholder="Enter expense"
        class="sticky left-0 bottom-2 w-full"
      />
    </BasePanel>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BasePanel from '@/components/ui/BasePanel/BasePanel.vue';
import BaseStats from '@/components/BaseStats/BaseStats.vue';
import BaseExpenseList from '@/components/BaseExpenseList/BaseExpenseList.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';

const expense = ref('');
</script>
