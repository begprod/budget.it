<template>
  <BaseHeader />

  <main class="relative container mx-auto z-10">
    <BaseStats />

    <BasePanel>
      <BaseExpenseList />
    </BasePanel>
  </main>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/layouts/partials/BaseHeader/BaseHeader.vue';
import BasePanel from '@/components/ui/BasePanel/BasePanel.vue';
import BaseStats from '@/components/BaseStats/BaseStats.vue';
import BaseExpenseList from '@/components/BaseExpenseList/BaseExpenseList.vue';
</script>
