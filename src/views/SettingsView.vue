<template>
  <BaseLayout>
    <template #title>
      <Transition name="slide-right">
        <template v-if="route.path.startsWith('/settings') && route.path !== '/settings'">
          <RouterLink :to="{ name: 'settings' }">
            <ChevronLeft class="icon icon_lg" />
          </RouterLink>
        </template>
      </Transition>
      Settings
    </template>

    <template #wrapper>
      <RouterView />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { ChevronLeft } from 'lucide-vue-next';
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';

const route = useRoute();
</script>

<style scoped>
.router-link-active {
  display: flex;
  align-items: center;
}
</style>
