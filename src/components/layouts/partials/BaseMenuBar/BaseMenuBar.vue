<template>
  <div class="fixed right-0 bottom-0 left-0 w-full z-[100]">
    <div v-if="route.name === 'home'" class="container flex flex-col gap-2 mx-auto mb-2 px-5">
      <BaseButton
        v-if="getMonthByIndex.isCurrent"
        @click="showExpenseInputHandler()"
        data-test-id="add-expense-button"
      >
        <template #text> Add expense </template>
        <template #rightIcon>
          <Banknote class="w-5 h-5 ml-2" />
        </template>
      </BaseButton>

      <div class="flex gap-2">
        <BaseButton
          v-if="getNextMonthsFromCurrent && !getNextMonthsFromCurrent.isFuture"
          @click="decreaseCurrentMonthIndex"
        >
          <template #leftIcon>
            <ChevronLeft class="w-5 h-5 mr-1" />
          </template>
          <template #text>
            {{ getNextMonthsFromCurrent.name }}
          </template>
        </BaseButton>
        <BaseButton v-if="getPreviousMonthsFromCurrent" @click="increaseCurrentMonthIndex">
          <template #rightIcon>
            <ChevronRight class="w-5 h-5 ml-2" />
          </template>
          <template #text>
            {{ getPreviousMonthsFromCurrent.name }}
          </template>
        </BaseButton>
      </div>
    </div>

    <div class="px-6 py-5 bg-white border-t border-slate-200">
      <div class="max-w-96 flex justify-around mx-auto">
        <RouterLink to="/">
          <Wallet class="w-6 h-6 text-slate-400" />
        </RouterLink>
        <!-- <RouterLink to="/dashboard">
        <ChartLine class="w-6 h-6 text-slate-400" />
      </RouterLink> -->
        <RouterLink to="/settings">
          <Settings class="w-6 h-6 text-slate-400" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';
import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { Wallet, Settings, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import BaseButton from '@/components/ui/controls/BaseButton/BaseButton.vue';
import { Banknote } from 'lucide-vue-next';
import { useCommonStore, useCalendarStore } from '@/stores';

const route = useRoute();

const commonStore = useCommonStore();
const calendarStore = useCalendarStore();
const { showAddExpenseInput } = commonStore;
const { getMonthByIndex, getPreviousMonthsFromCurrent, getNextMonthsFromCurrent } =
  storeToRefs(calendarStore);
const { increaseCurrentMonthIndex, decreaseCurrentMonthIndex } = calendarStore;

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

<style scoped lang="scss">
.router-link-exact-active {
  svg {
    @apply text-slate-900;
  }
}
</style>
