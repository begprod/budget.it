<template>
  <BaseHeader />

  <main
    class="container flex flex-col min-h-[calc(100vh-55px)] mx-auto px-5 pb-14 z-10"
    :class="additionalClasses"
  >
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

interface IProps {
  additionalClasses?: string | Object;
}

defineProps<IProps>();
</script>
