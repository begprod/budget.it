<template>
  <div class="container fixed left-0 right-0 bottom-14 w-full px-3 mx-auto">
    <div
      class="grid grid-cols-12 rounded-xl overflow-hidden bg-white border border-slate-300 shadow-md"
    >
      <BaseInput
        id="expense-input"
        v-model="expense"
        type="number"
        :placeholder="`Enter expense (${getActiveCurrencies.name})`"
        class="col-span-10 border-none focus:outline-none focus:border-none"
      />

      <BaseButton
        title="Add expense"
        class="col-span-2 border-l border-y-0 border-r-0 rounded-l-none"
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
import { useSettingsStore } from '@/stores';
import { PlusIcon } from '@heroicons/vue/24/outline';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const settingsStore = useSettingsStore();

const { getActiveCurrencies } = storeToRefs(settingsStore);
const expense = ref('');
</script>
