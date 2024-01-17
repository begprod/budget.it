<template>
  <BaseHeader>
    <template #settings>
      <button type="button" @click="toggleSidebar">
        <Cog6ToothIcon class="w-6 h-6 text-slate-600" />
      </button>
    </template>
  </BaseHeader>

  <main class="relative container mx-auto z-10">
    <BaseStats />
    {{ expense }}
    <BasePanel>
      <BaseExpenseList />

      <div class="container fixed left-0 right-0 bottom-2 w-full px-4 mx-auto">
        <div
          class="flex items-center rounded-xl overflow-hidden bg-white border border-slate-300 shadow-lg"
        >
          <BaseInput
            v-model="expense"
            id="expense-input"
            type="number"
            placeholder="Enter expense"
            class="border-r border-slate-300"
          />

          <BaseButton title="Add expense">
            <template #leftIcon>
              <PlusCircleIcon class="w-6 h-6" />
            </template>
          </BaseButton>
        </div>
      </div>
    </BasePanel>
  </main>

  <BaseSidebar :is-open="isSidebarOpen" @toggle="toggleSidebar" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusCircleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseSidebar from '@/components/layouts/partials/BaseSidebar/BaseSidebar.vue';
import BasePanel from '@/components/ui/BasePanel/BasePanel.vue';
import BaseStats from '@/components/BaseStats/BaseStats.vue';
import BaseExpenseList from '@/components/BaseExpenseList/BaseExpenseList.vue';
import BaseInput from '@/components/ui/controls/BaseInput/BaseInput.vue';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';

const isSidebarOpen = ref(false);
const expense = ref('');

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
