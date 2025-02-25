<template>
  <BaseHeader />

  <main class="wrapper relative flex flex-col mx-auto pb-32 z-10">
    <div class="grow">
      <slot />
    </div>

    <BaseFooter />
  </main>

  <BaseMenuBar />
  <BaseToast
    :type="getToast.type"
    :message="getToast.message"
    :duration="getToast.duration"
    :callback="getToast?.callback"
    @timesup="clearToast"
  />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseFooter from '@/components/layouts/partials/BaseFooter/BaseFooter.vue';
import BaseMenuBar from '@/components/layouts/partials/BaseMenuBar/BaseMenuBar.vue';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';
import { useCommonStore, useSettingsStore } from '@/stores';

const commonStore = useCommonStore();
const settingsStore = useSettingsStore();

const { initMonthlyDailyBudgetObject } = settingsStore;

const { getToast } = storeToRefs(commonStore);
const { setToast } = commonStore;

const clearToast = () => {
  setToast({ type: 'default', message: '', duration: 0 });
};

onBeforeMount(() => {
  initMonthlyDailyBudgetObject();
  clearToast();
});
</script>
