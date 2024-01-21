<template>
  <BaseHeader />

  <main class="container flex flex-col min-h-[100vh] mx-auto pt-5 px-5 pb-24 z-10">
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
