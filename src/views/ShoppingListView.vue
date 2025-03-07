<template>
  <BaseLayout>
    <template #title>Shopping list</template>

    <template #wrapper>
      <BaseShoppingList />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/layouts/BaseLayout/BaseLayout.vue';
import BaseShoppingList from '@/components/BaseShoppingList/BaseShoppingList.vue';
</script>
