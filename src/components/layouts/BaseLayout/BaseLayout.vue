<template>
  <BaseHeader />

  <main class="relative container flex flex-col mx-auto pb-16 z-10">
    <div class="grow">
      <slot />
    </div>

    <BaseFooter />
  </main>

  <BaseMenuBar />
</template>

<script setup lang="ts">
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BaseFooter from '@/components/layouts/partials/BaseFooter/BaseFooter.vue';
import BaseMenuBar from '@/components/layouts/partials/BaseMenuBar/BaseMenuBar.vue';
</script>
