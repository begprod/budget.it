<template>
  <div class="fixed right-0 bottom-0 left-0 w-full px-6 py-3 bg-white border-t border-slate-200 z-[100]">
    <div class="flex justify-between">
      <RouterLink to="/">
        <HomeIcon class="w-6 h-6 text-slate-500" />
      </RouterLink>
      <RouterLink to="/dashboard">
        <ChartBarIcon class="w-6 h-6 text-slate-500" />
      </RouterLink>
      <RouterLink to="/settings">
        <Cog6ToothIcon class="w-6 h-6 text-slate-500" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { HomeIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
</script>
