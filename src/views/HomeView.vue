<template>
  <BaseLayout>
      <BaseExpenseList />

      <div class="container fixed left-0 right-0 bottom-2 w-full px-4 mx-auto">
        <div
          class="grid grid-cols-12 rounded-xl overflow-hidden bg-white border border-slate-300 shadow-lg"
        >
          <BaseInput
            id="expense-input"
            v-model="expense"
            type="number"
            :placeholder="`Enter expense (${getActiveCurrencies.name})`"
            class="col-span-10 border-none focus:outline-none focus:border-none"
          />

          <BaseButton title="Add expense" class="col-span-2 rounded-l-none">
            <template #leftIcon>
              <PlusIcon class="w-6 h-6" />
            </template>
          </BaseButton>
        </div>
      </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { useCalendarStore, useSettingsStore } from '@/stores';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseExpenseList from '@/components/BaseExpenseList/BaseExpenseList.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const calendarStore = useCalendarStore();
const settingsStore = useSettingsStore();
const { initCalendar } = calendarStore;
const { getActiveCurrencies } = storeToRefs(settingsStore);
const expense = ref('');

onBeforeMount(() => {
  initCalendar();
});
</script>
