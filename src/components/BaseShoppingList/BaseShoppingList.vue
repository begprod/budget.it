<template>
  <BaseShoppingListControls />

  <div v-if="shoppingItems.length > 0" class="shopping-list" ref="parentRef">
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

const [parentRef, listItems] = useDragAndDrop(shoppingItems.value);

dragAndDrop({
  parent: parentRef,
  values: listItems,
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
}
</style>
