<template>
  <BaseHeader />

  <main class="relative container flex flex-col mx-auto pb-16 z-10">
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
import { storeToRefs } from 'pinia';
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseFooter from '@/components/layouts/partials/BaseFooter/BaseFooter.vue';
import BaseMenuBar from '@/components/layouts/partials/BaseMenuBar/BaseMenuBar.vue';
import BaseToast from '@/components/ui/BaseToast/BaseToast.vue';
import { useCommonStore } from '@/stores';

const commonStore = useCommonStore();

const { getToast } = storeToRefs(commonStore);
const { setToast } = commonStore;

const clearToast = () => {
  setToast({ type: null, message: '', duration: 0 });
};
</script>
