<template>
  <div class="fixed right-0 bottom-0 left-0 w-full z-[100]">
    <div v-if="route.name === 'home'" class="container mx-auto px-5">
      <BaseAddExpenseButton />
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
import { Wallet, Settings } from 'lucide-vue-next';
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
