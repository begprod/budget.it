<template>
  <div
    class="fixed right-0 bottom-0 left-0 w-full px-6 py-5 bg-white border-t border-slate-200 z-[100]"
  >
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
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { HomeIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
</script>

<style scoped lang="scss">
.router-link-exact-active {
  svg {
    @apply text-slate-900;
  }
}
</style>
