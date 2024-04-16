<template>
  <div class="fixed right-0 bottom-0 left-0 w-full z-[100]">
    <div v-if="route.name === 'home'" class="container mx-auto px-5">
      <BaseAddExpenseButton />
    </div>

    <div class="px-6 py-5 bg-white border-t border-slate-200">
      <div class="max-w-96 flex justify-around mx-auto">
        <RouterLink to="/">
          <HomeIcon class="w-6 h-6 text-slate-400" />
        </RouterLink>
        <!-- <RouterLink to="/dashboard">
        <ChartBarIcon class="w-6 h-6 text-slate-400" />
      </RouterLink> -->
        <RouterLink to="/settings">
          <Cog6ToothIcon class="w-6 h-6 text-slate-400" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router';
import { HomeIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import BaseAddExpenseButton from '@/components/BaseAddExpenseButton/BaseAddExpenseButton.vue';

const route = useRoute();
</script>

<style scoped lang="scss">
.router-link-exact-active {
  svg {
    @apply text-slate-900;
  }
}
</style>
