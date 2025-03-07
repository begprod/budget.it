<template>
  <BaseShoppingListControls />

  <div v-if="shoppingItems.length > 0" class="shopping-list">
    <TransitionGroup name="list">
      <BaseShoppingListItem
        v-for="item in shoppingItems"
        :key="item.id"
        :item="item"
        :style="{
          boxShadow: `0 2px 2px 0px ${colors[Math.floor(Math.random() * colors.length)]}`,
        }"
        @check="check"
        @remove="remove"
      />
    </TransitionGroup>
  </div>

  <BaseEmptyListMessage v-if="!shoppingItems.length">
    <template #icon>
      <PackageSearch class="icon icon_sm" />
    </template>
    <template #message> No items in the list </template>
  </BaseEmptyListMessage>
</template>

<script setup lang="ts">
import type { IShoppingItem } from '@/types';
import { storeToRefs } from 'pinia';
import { PackageSearch } from 'lucide-vue-next';
import BaseShoppingListControls from '@/components/BaseShoppingListControls/BaseShoppingListControls.vue';
import BaseShoppingListItem from '@/components/BaseShoppingListItem/BaseShoppingListItem.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import { useShoppingListStore } from '@/stores';

const shoppingListStore = useShoppingListStore();

const { shoppingItems } = storeToRefs(shoppingListStore);
const { markItemIsDone, removeItem } = shoppingListStore;

const colors = [
  '#b8b8ff40',
  '#ffd8be40',
  '#f7aef840',
  '#8093f140',
  '#efa7a740',
  '#ff69eb40',
  '#79addc40',
  '#9ad7f540',
  '#5aa9e640',
  '#c2a5d140',
];

const check = (itemId: IShoppingItem['id'], isChecked: boolean) => {
  markItemIsDone(itemId, isChecked);
};

const remove = (itemId: IShoppingItem['id']) => {
  removeItem(itemId);
};
</script>

<style scoped>
.shopping-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 1.56vw, 1rem);
}
</style>
