import type { IShoppingListStore, IShoppingItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useShoppingListStore = defineStore('shooping-list', {
  state: (): IShoppingListStore => ({
    shoppingItems: useLocalStorage('budget.it:shopping-tems', []),
  }),

  actions: {
    addItem(title: IShoppingItem['title']) {
      const item = {
        id: uuidv4(),
        title: title,
        isDone: false,
      };

      this.shoppingItems.unshift(item);
    },
    markItemIsDone(id: IShoppingItem['id'], status: boolean) {
      const item = this.shoppingItems.find((i) => i.id === id);

      if (!item) {
        throw new Error('Shopping item not found');
      }

      item.isDone = status;
    },
  },
});
