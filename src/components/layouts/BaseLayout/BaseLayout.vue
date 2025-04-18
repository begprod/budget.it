<template>
  <BaseHeader />

  <main class="layout wrapper">
    <div class="layout__inner">
      <h1 v-if="$slots.title" class="layout__title">
        <slot name="title" />
      </h1>

      <div v-if="$slots.wrapper" class="layout__wrapper">
        <slot name="wrapper" />
      </div>
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
import { useCommonStore } from '@/stores';

const commonStore = useCommonStore();

const { getToast } = storeToRefs(commonStore);
const { setToast } = commonStore;

const clearToast = () => {
  setToast({ type: 'default', message: '', duration: 0 });
};

onBeforeMount(() => {
  clearToast();
});
</script>

<style scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 8rem;
  min-height: calc(100dvh + 200px);
  z-index: 10;
}

.layout__inner {
  flex-grow: 1;
}

.layout__wrapper {
  padding: 0 1.25rem;
}

.layout__title {
  margin-top: 1rem;
  margin-bottom: 1.75rem;
  padding: 0 1.25rem;
  font-size: clamp(var(--typo-size-2xl), 3.52vw, var(--typo-size-4xl));
  font-weight: bold;
  line-height: 1;
  user-select: none;
}
</style>
