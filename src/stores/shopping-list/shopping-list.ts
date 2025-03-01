import type { IShoppingListStore, IShoppingItem } from '@/types';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useShoppingListStore = defineStore('shooping-list', {
  state: (): IShoppingListStore => ({
    shoppingItems: useLocalStorage('budget.it:shopping-tems', []),
  }),

  actions: {
    addItem(item: IShoppingItem) {
      this.shoppingItems.push(item);
    },
    markItemIsDone(id: IShoppingItem['id'], status: boolean) {
      const item = this.shoppingItems.find((i) => i.id === id);

      if (!item) {
        throw new Error('Shopping item not found');
      }

      item.isDone = status;
    },
    removeItem(id: IShoppingItem['id']) {
      this.shoppingItems = this.shoppingItems.filter((item) => item.id !== id);
    },
  },
});
