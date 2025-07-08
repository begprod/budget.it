<template>
  <BaseShoppingListControls />

  <div v-if="shoppingItems.length > 0" class="shopping-list" ref="parentRef">
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
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDragAndDrop, dragAndDrop } from '@formkit/drag-and-drop/vue';
import { PackageSearch } from 'lucide-vue-next';
import BaseShoppingListControls from '@/components/BaseShoppingListControls/BaseShoppingListControls.vue';
import BaseShoppingListItem from '@/components/BaseShoppingListItem/BaseShoppingListItem.vue';
import BaseEmptyListMessage from '@/components/ui/BaseEmptyListMessage/BaseEmptyListMessage.vue';
import { useShoppingListStore } from '@/stores';

const shoppingListStore = useShoppingListStore();

const { shoppingItems } = storeToRefs(shoppingListStore);
const { markItemIsDone } = shoppingListStore;

const colors = [
  '#b8b8ff50',
  '#ffd8be50',
  '#f7aef850',
  '#8093f150',
  '#efa7a750',
  '#ff69eb50',
  '#79addc50',
  '#9ad7f550',
  '#5aa9e650',
  '#c2a5d150',
];

const [parentRef, listItems] = useDragAndDrop(shoppingItems.value);

dragAndDrop({
  parent: parentRef,
  values: listItems,
  dragHandle: '.shopping-item__grip',
});

watch(
  listItems,
  (newList) => {
    shoppingItems.value = newList;
  },
  { deep: true },
);

const check = (itemId: IShoppingItem['id'], isChecked: boolean) => {
  markItemIsDone(itemId, isChecked);
};

const remove = (itemId: IShoppingItem['id']) => {
  const index = listItems.value.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    listItems.value.splice(index, 1);
  }
};

defineExpose({
  listItems,
});
</script>

<style scoped>
.shopping-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}
</style>
